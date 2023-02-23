const axios = require("axios");
const index = require("../utils/index");
const queries = require("../scripts/queries");
const convertData = require("../utils/convert-data");

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

  console.log("queryResults:", process.env.QUERY, "queryVars", queryVars);
  await index
    .run(queries[process.env.QUERY || "lesson"], queryVars)
    .then((data) => {
      const isEmpty = Object.keys(data).length === 0;
      // console.log("index.run result: ", data, isEmpty);
      if (isEmpty) {
        return false;
      }

      if (data?.getCourse) {
        return data.getCourse;
      }

      if (data?.getLesson) {
        return data.getLesson;
      }

      if (data?.getLessons) return data.getLessons;

      return false;
    })
    .then(async (data) => {
      const tenantApi = process.env.TENANT_API;
      const brightcoveFetch = await axios({
        method: "get",
        url: tenantApi,
      }).then(function (response) {
       
        const tempBrightcoveFetch = {};
        tempBrightcoveFetch["brightcoveAccountId"] =
          response.data.brightcoveAccountId;
        tempBrightcoveFetch["brightcovePolicyKey"] =
          response.data.brightcovePolicyKey;
        tempBrightcoveFetch["brightcovePlayer"] =
          response.data.brightcovePlayer;
        return tempBrightcoveFetch;
      });
      if (!data) {
        // TODO: there was a problem retrieving the data
      }
      if (
        // If the returns is an array of LessonStructureContainers (getLessons)
        Array.isArray(data) &&
        data[0]?.__typename === "LessonStructureContainer"
      ) {
        // Before conversion log
        // console.log("before conversion data", JSON.stringify(data, null, 4));
        convertData.dataConversionFunction(data, brightcoveFetch);
        // Afer conversion log
        // console.log("after conversion data", JSON.stringify(data, null, 4));
      } else {
        // TODO: may need to check for type if __typename does not exist eg. getLesson
      }

      // TODO: handle promise rejection if something goes wrong
    });
  // Returning the array that we set in convertData.js
  return convertData.lessons;
};
