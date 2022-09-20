const index = require("../utils/index");
const queries = require("../scripts/queries");
const convertData = require("../utils/convertData");

/**
 * Returns a graphql query string based on the name of the query requested.
 *
 * @param {String} q query name
 * @returns {String} graphql query
 */
function _getQuery(q) {
  switch (q) {
    case "course":
      return queries.course;
    case "lesson":
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
  return [
    {
      courseUUID: null,
      courseName: "NO COURSE SPECIFIED",
      courseCode: "XXXNX",
      unitNumber: 0,
      lessonNumber: 0,
    },
  ];
}

/**
 * Returns an array of lessons, based on the Node ID. Even if you are
 * requesting a singular lesson, it will be returned as an array of one
 * lesson. If an error is encountered, an empty Array will be returned.
 *
 * @returns {Array}
 */
module.exports = async function () {
  const queryVars = {
    // 'uuid': process.env.ENTITY_ID,
    id: process.env.ID,
  };
  const query = _getQuery(process.env.QUERY);

  console.log("process.env.QUERY", process.env.QUERY, "queryVars", queryVars);

  await index
    .run(query, queryVars)
    .then((data) => {
      const isEmpty = Object.keys(data).length === 0;
      console.log("index.run result: ", data, isEmpty);
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
    .then((data) => {
      if (!data) {
        // TODO: there was a problem retrieving the data
      }
      if (data?.__typename === "Course") {
        convertData.dataConversionFunction(data);
      } else {
        // TODO: may need to check for type if __typename does not exist eg. getLesson
      }

      // TODO: handle promise rejection if something goes wrong
    });
  // Returning the array that we set in convertData.js
  return convertData.lessons;
};
