const { PurgeCSS } = require('purgecss');

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
        content: [
            {
                raw: htmlFilePath,
                extension: 'html'
            },
        ],
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
module.exports = async function (file, sourceCssArray) {
        var cssResult = await __purgeCssSingleFile(file, sourceCssArray);

        let newfile = file.replace("<style amp-custom></style>", "<style amp-custom>" + cssResult[0].css + "</style>");

        return newfile;
        // return cb(null, newfile); 
};