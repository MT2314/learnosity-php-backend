const pjson = require('../../package.json');

// From https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables
//
// This is a way to use environment vars from terminal within 11ty
module.exports = {
    date: new Date().toLocaleDateString(),
    version: pjson.version,
    showcaseWrapper: process.env.SHOWCASE_WRAPPER || false,
    devMode: process.env.DEV_MODE
};