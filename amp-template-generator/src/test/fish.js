const client = require('../graphql-config').client;
const AmpQuoteBox = require('../amp-quote-box');
const AmpAudio = require('../amp-audio');
const AmpTable = require('../amp-table');
const queries = require('../structure-queries');

// This is a developer script for experimenting with one-off components.
// Run with "npm run fish"
//
// The actual application is found in index.js, and can be run via "npm run start"


const queryVars = {
  'id': '217'
};
//console.log(queries.table);
var table = new AmpTable();
client.request(queries.table, queryVars)
  .then(data => {
    //console.log(JSON.stringify(data.nodeById, null, 4));
    table.generate(data.nodeById);
    console.log('<!-- AMP table -->');
    console.log(table.html);
    console.log('<!-- /AMP table -->');
  });


/*
const queryVars = {
  'id': '215'
};

//console.log(queries.audio);

var audio = new AmpAudio();
client.request(queries.audio, queryVars)
  .then(data => {
    //console.log(JSON.stringify(data.nodeById, null, 4));
    audio.generate(data.nodeById);
    console.log('<!-- AMP audio -->');
    console.log(audio.html);
    console.log('<!-- /AMP audio -->');
  });
*/

/*
const queryVars = {
  'id': '168'
};

console.log(queries.quotebox);

var quotebox = new AmpQuoteBox();
client.request(queries.quotebox, queryVars)
  .then(data => {
    //console.log(JSON.stringify(data.nodeById, null, 4));
    quotebox.generate(data.nodeById);
    console.log('quotebox');
    console.log(quotebox.html);
    console.log('/quotebox');
  });
*/