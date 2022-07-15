const client = require('./graphql-config').client;
const constants = require('./constants');

/**
 * Returns an Object representing the entity id provided. If an error is 
 * encountered, an empty Object will be returned.
 * 
 * @param {String} query graphQL query to run
 * @param {Object} params query vars
 * @returns {Object}
 */
async function run(query, params) {
  return client.request(query, params)
    .catch(err => {
      //console.log(err);
      if (err.hasOwnProperty('response')) {
        if (err.response.hasOwnProperty('errors')) {
          // error but probably not graphql specifically
          console.error(err.response.errors);
        } else {
          // graphql error
          console.error(err.response.error); // GraphQL response errors
          console.error(err.request.query); // GraphQL response errors
          console.error(err.response.data); // Response data if available
        }
      } else {
        // general error
        console.error(err);
      }

      return {};
    });
}

module.exports = {
  run: run
};