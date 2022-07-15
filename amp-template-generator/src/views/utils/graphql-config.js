const dotenv = require('dotenv').config();
const GraphQLClient = require('graphql-request').GraphQLClient;

const endpoint = process.env.GQL_ENDPOINT;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.X_API_KEY,
  //'Authorization': 'Bearer ' + token
};

module.exports = {
  client: new GraphQLClient(endpoint, {
    headers: headers
  })
};