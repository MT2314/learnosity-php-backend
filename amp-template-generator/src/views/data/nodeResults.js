const index = require('../utils/index');
const headings = require('../utils/headings');
const queries = require('../scripts/queries');

/**
 * Returns a graphql query string based on the name of the query requested.
 * 
 * @param {String} q query name
 * @returns {String} graphql query 
 */
function _getQuery(q) {
    switch (q) {
        case 'course':
            return queries.course;
        case 'lesson':
        default:
            return queries.lesson;
    }
}

/**
 * Compares the course uuid to each lessonPath and determines the "right one".
 * 
 * @param {String} uuid course uuid
 * @param {Array} lessonPaths array of lessonsPaths
 * @returns {Array} array containing 1 lessonPath object
 */
function _determineLessonPath(uuid, lessonPaths) {
    for (let i = 0; i < lessonPaths.length; i++) {
        if (lessonPaths[i].courseUUID === uuid) {
            return [lessonPaths[i]];
        }
    }

    // if no match, return a "no course specified" version of a course path
    return [{
        "courseUUID": null,
        "courseName": "NO COURSE SPECIFIED",
        "courseCode": "XXXNX",
        "unitNumber": 0,
        "lessonNumber": 0
    }];
}

/**
 * Returns an array of lessons, based on the Node ID. Even if you are 
 * requesting a singular lesson, it will be returned as an array of one
 * lesson. If an error is encountered, an empty Array will be returned.
 * 
 * @returns {Array}
 */
module.exports = async function() {
    var lessons = [];
    const queryVars = {
        'uuid': process.env.ENTITY_ID
    };
    const query = _getQuery(process.env.QUERY);
    
    await index.run(query, queryVars)
        .then(data => {
            if (data.getCourse) {
                return data.getCourse;
            } else {
                if (!data.getLesson.lessonPaths.length) {
                    data.getLesson.lessonPaths = _determineLessonPath(data.uuid, data.getLesson.lessonPaths);
                }
            
                return data.getLesson;
            }
        })
        .then(data => {
            try {
                switch (data.type) {
                    case 'course':
                        data.units.forEach(function(unit) {
                            unit.lessons.forEach(function(lesson) {
                                //lesson.title = 'COURSE TEST';
                                lesson = headings.parse(lesson);
                                lesson.lessonPaths = _determineLessonPath(data.uuid, data.getLesson.lessonPaths);
                                lessons.push(lesson);
                            });
                        });
                        break;

                    case 'lesson':
                        //data.title = 'LESSON TEST';
                        data = headings.parse(data);
                        lessons.push(data);
                        break;

                    default:
                        throw new Error('Invalid type ' + data.type);
                }
            } catch (e) {
                e.uuid = queryVars.uuid;
                console.error(e);
                lessons = [];
            }
        });

    //console.log(JSON.stringify(lessons, null, 4));
    return lessons;
};
