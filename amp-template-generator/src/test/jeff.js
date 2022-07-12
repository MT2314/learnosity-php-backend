const client = require('../views/utils/graphql-config').client;
const constants = require('../views/utils/constants');
const run = require('../views/utils/index').run;
const queries = require('../views/scripts/queries');

// This is a developer script for experimenting with one-off components.
// Run with "npm run jeff"
//
// The actual application is found in index.js, and can be run via "npm run start"

console.log(queries.lesson);

run(queries.lesson, { 'uuid': '714fe242-082b-4205-86ef-cb6ccd0aa944' })
  .then(result => {
    console.log(JSON.stringify(result, null, 4));
  });


// test queries
// const queryVars = {
//   'id': '1'
//   'id': '46ddba8b-7114-4224-8274-25f11be3933a'
//   'id': '128'
// };

// var query = `
// query ($id: String!) {
//   nodeById(id: $id) {
//     ...Lesson
//   }
// }

// ${queries.fragments.nodeMachineName}
// ${queries.fragments.paragraphMachineName}
// ${queries.fragments.lesson}
// ${queries.fragments.section}
// ${queries.fragments.topic}
// ${queries.fragments.accordion}
// ${queries.fragments.audio}
// ${queries.fragments.brightcoveVideo}
// ${queries.fragments.callout}
// ${queries.fragments.carousel}
// ${queries.fragments.formattedText}
// ${queries.fragments.iframe}
// ${queries.fragments.image}
// ${queries.fragments.quotebox}
// ${queries.fragments.table}
// ${queries.fragments.youtubeVideo}
// `;
