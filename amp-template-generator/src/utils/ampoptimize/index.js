const AmpOptimizer = require('@ampproject/toolbox-optimizer');


/**
 * Runs AmpOptimizer and passes the results along
 *
 * @param {String} file file in string format 
 * @param {Object} config AmpOptimizer paramters
 * @returns {Transform}
 */
module.exports = async function (file, config, cb) {
    // console.log('welcome to amp optimizer', config, typeof file);
    const ampOptimizer = AmpOptimizer.create(config); 
    var data = file;
    var ampResult = ampOptimizer.transformHtml(data);
    // return the file string back to callback
    return ampResult;
};