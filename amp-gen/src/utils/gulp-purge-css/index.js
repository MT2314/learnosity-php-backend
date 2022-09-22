const through = require('through2');
const PluginError = require('plugin-error');
const rs = require('replacestream');
const { PurgeCSS } = require('purgecss');

const PLUGIN_NAME = '@content-solutions/gulp-purge-css';

/**
 * Returns the reduced (purgeCSS) version for the htmlFilePath.
 * 
 * @private
 * @async
 * @param {String} htmlFilePath
 * @param {Array} cssFiles
 * @returns {Promise}
 */
async function __purgeCssSingleFile(htmlFilePath, cssFiles) {
    var result = await new PurgeCSS().purge({
        content: [htmlFilePath],
        css: cssFiles
    });

    return result;
}

/**
 * Gulp plugin that runs purgeCss against sourceCssArray.
 * 
 * @param {Array} sourceCssArray list of css files
 * @returns {Transform}
 */
module.exports = function (sourceCssArray) {
    return through.obj(async function (file, encoding, cb) {
        // console.log(file.path, sourceCssArray);

        /* Gulp plugins are passed a Vinyl file, which can be any of
         * Buffers, 
         * Streams, or 
         * null
         * 
         * Ideally they should be written to take any of the above into account
         * in order to be future-proofed, but right now simply checking if it was
         * sent something other than a Stream is good-enough.
         */
        if (file.isBuffer()) {
            // console.log('this is a buffer!');
            this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
            return cb();
        }

        if (file.isStream()) {
            // console.log('this is a stream!');
            var cssResult = await __purgeCssSingleFile(file.path, sourceCssArray);

            file.contents = file.contents.pipe(rs("<style amp-custom></style>", "<style amp-custom>" + cssResult[0].css + "</style>"));

            // return the file stream back to the through() callback
            return cb(null, file);
        }
    });
};