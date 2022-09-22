const index = require("../utils/index");
const headings = require("../utils/headings");
const queries = require("../scripts/queries");
const parseprops = require("../utils/parse-props");

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
 * Returns an array of lessons, based on the Node ID. Even if you are
 * requesting a singular lesson, it will be returned as an array of one
 * lesson. If an error is encountered, an empty Array will be returned.
 *
 * @returns {Array}
 */
module.exports = async function () {
  var lessons = [];
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
        parseprops.transformComponentPropsRecusive(data.getCourse);
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
        console.log("lessons: ", lessons);
      } else {
        // TODO: may need to check for type if __typename does not exist eg. getLesson
      }

      // TODO: handle promise rejection if something goes wrong
    });

  //console.log(JSON.stringify(lessons, null, 4));
  return lessons;
};
