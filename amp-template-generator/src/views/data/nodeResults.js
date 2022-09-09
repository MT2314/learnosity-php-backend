const index = require('../utils/index');
const headings = require('../utils/headings');
const queries = require('../scripts/queries');
const { convertDeltaToHtml } = require('node-quill-converter-improved');

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
        // 'uuid': process.env.ENTITY_ID,
        'id': process.env.ID
    };
    const query = _getQuery(process.env.QUERY);
    
console.log('process.env.QUERY', process.env.QUERY, 'queryVars', queryVars);

    await index.run(query, queryVars)
        .then(data => {
            const isEmpty = Object.keys(data).length === 0;
            console.log('index.run result: ', data, isEmpty);
            if (isEmpty) {
                return false;
            }

            if (data?.getCourse) {
                return data.getCourse;
            } 

            if (data?.getLesson) {
                return data.getLesson;
            }

            return false;
        })
        .then(data => {
            if (!data) {
                // TODO: there was a problem retrieving the data
            }

            if (data?.__typename === 'Course') {                            
                
                const transformComponentPropsRecusive = (container) => {
                    if (container.children) {
                      for (let index = 0; index < container.children.length; index++) {
                        const child = container.children[index];
                        transformComponentPropsRecusive(child);
                      }
                    }                                
                
                   if (container.componentContainers) {
                      for (let ccIndex = 0; ccIndex < container.componentContainers.length; ccIndex++) {
                        const componentContainer = container.componentContainers[ccIndex];
                        componentContainer.sections = componentContainer.sections.sort((a, b) => (a.position < b.position ? -1 : 1));
                        for (let sectionIndex = 0; sectionIndex < componentContainer.sections.length; sectionIndex++) {
                          const section = componentContainer.sections[sectionIndex];
                          section.components = section.components.sort((a, b) => (a.position < b.position ? -1 : 1));
                          for (let componentIndex = 0; componentIndex < section.components.length; componentIndex++) {
                            const component = section.components[componentIndex];
                            try {
                              component.props = JSON.parse(component.props);
                            } catch (err) {
                              console.error(err);
                            }
                          }
                        }
                      }
                    }
                  };

                transformComponentPropsRecusive(data);

                const components = data.children[0].children[0].componentContainers[0].sections[1].components;

                for (let i = 0; i < components.length; i++) {
                    let convertedQuillText = convertDeltaToHtml(components[i].props.body)
                    // console.log("these are the text values:", components[i].props.body);
                    console.log("this is the converted html:", convertedQuillText);
                }

                var lesson = data.children[0].children[0];

                // console.log('this is a course', data.__typename, data.courseCode);
                // console.log('number of children ', data.children.length);
                // console.log('first child is a ', data.children[0].type, ' named: ', data.children[0].name);
                // console.log('first child has this many children ', data.children[0].children.length);
                // console.log('first childs first child is a ', data.children[0].children[0].type, ' named: ', data.children[0].children[0].name);
                // console.log('first childs first child has this many componentContainers ', data.children[0].children[0].componentContainers.length);
                // console.log('first component ', data.children[0].children[0].componentContainers[0].sections[0].components[0].componentName);
                // console.log('first component value: ', JSON.parse(data.children[0].children[0].componentContainers[0].sections[0].components[0].props).text);
                // console.log('second component value: ', JSON.parse(data.children[0].children[0].componentContainers[0].sections[1].components[0].props).body);
                lessons.push(lesson);
            } else {
                // TODO: may need to check for type if __typename does not exist eg. getLesson
            }

            // TODO: handle promise rejection if something goes wrong

        });

    //console.log(JSON.stringify(lessons, null, 4));
    return lessons;
};
