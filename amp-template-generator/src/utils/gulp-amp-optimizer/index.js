const through = require('through2');
const PluginError = require('plugin-error');
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const stream = require('stream');

const PLUGIN_NAME = '@content-solutions/gulp-amp-optimizer';

/**
 * Captures a file Stream to a String.
 * 
 * @param {Stream} stream 
 * @returns {Promise}
 */
function _streamToString(stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    });
}

/**
 * Runs AmpOptimizer and passes the results along the Stream.
 * 
 * @param {Object} config AmpOptimizer paramters
 * @returns {Transform}
 */
module.exports = function (config) {
    return through.obj(async function (file, encoding, cb) {
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
            const ampOptimizer = AmpOptimizer.create(config);
            console.log(file.path);
            try {
                var data = await _streamToString(file.contents);

                ampOptimizer.transformHtml(data)
                    .then(results => {
                        file.contents = stream.Duplex.from([results]);

                        // return the file stream back to the through() callback
                        return cb(null, file);
                    });
            } catch (err) {
                // Emit an error and then return the original file back
                this.emit('error', new PluginError(PLUGIN_NAME, err));
                return cb(null, file);
            }
        }
    });
};