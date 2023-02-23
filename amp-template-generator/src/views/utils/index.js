const client = require('./graphql-config').client;

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
          console.error('gql client errors', err.response.errors);
        } else {
          // graphql error
          console.error('gql err.error', err.error); // GraphQL response errors
          console.error('gql err.request.query', err.request.query); // GraphQL query errors
          console.error('gql err.response.data', err.response.data); // Response data if available
        }
      } else {
        // general error
        console.error('gql general err', err);
      }

      return {};
    });
}

module.exports = {
  run: run
};