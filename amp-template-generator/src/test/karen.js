const client = require('../graphql-config').client;
const queries = require('../structure-queries');

// This is a developer script for experimenting with one-off components.
// Run with "npm run karen"
//
// The actual application is found in index.js, and can be run via "npm run start"

const queryVars = {
  'id': '177'
};

var query = `query ($id: String!) {
  nodeById(id: $id) {
    ...ClickToReveal
  }
}

fragment MachineName on Node {
  type {
    targetId
  }
}

fragment ClickToReveal on NodeCsClickToReveal {
  ...MachineName
    nid
    ... on NodeCsClickToReveal {
      body {
        value
      }
      hintType
    }
}`;

client.request(query, queryVars)
  .then(data => {
    node = data.nodeById;
    console.log(data);
  })

