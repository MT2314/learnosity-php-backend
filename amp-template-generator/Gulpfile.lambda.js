require('dotenv').config();
const cp = require('child_process');
const log = require('fancy-log');
const gulp = require('gulp');
const csAmpOptimizer = require('@content-solutions/gulp-amp-optimizer');
const csPurgeCss = require('@content-solutions/gulp-purge-css');

const dirs = {
    root: process.env.STAGING,
    cssStaging: 'styles/',
    eleventy: process.env.ELEVENTY_STAGING
};

/**
 * Internal gulp task.
 * Runs cleanup after 11ty generates the inital output
 * * Purges unused css and inserts minified css into html files.
 * * Runs "AMP Optimizer" to generate script tags and boilerplate CSS.
 * 
 * Uses in-house gulp plugins 'gulp-cs-purge-css', 'gulp-cs-amp-optimizer'
 * 
 * @private
 * @returns {Stream}
 */
function _post11tyServer() {
    log('starting _post11tyServer()');
    const inputGlob = dirs.eleventy + process.env.USER_ID + '/*.html';
    
    return gulp.src(inputGlob, { buffer: false })
        .pipe(csPurgeCss([dirs.cssStaging + 'styles.css']))
        .pipe(csAmpOptimizer({
            verbose: false,
            extensionVersions: {
                'amp-carousel': '0.1',
            },
            transformations: [
                'AddMandatoryTags',
                'AutoExtensionImporter',
                'OptimizeImages',
                //'PreloadHeroImage',
                'ReorderHeadTransformer',
                'RewriteAmpUrls',
                'GoogleFontsPreconnect',
                'PruneDuplicateResourceHints',
                'SeparateKeyframes',
                'RemoveCspNonce',
                'MinifyHtml'
            ],
            minify: true
        }))
        .pipe(gulp.dest(dirs.eleventy + process.env.USER_ID));
}

/**
 * Internal gulp task.
 * Generates 11ty template output, based on the gulp paramter passed in.
 * 
 * @private
 * @returns {Promise}
 */
function _11ty() {
    log('starting _11ty()');

    var output = process.env.ELEVENTY_STAGING + process.env.USER_ID + '/';
    var input ='views/node.liquid';

    return new Promise(function(resolve, reject) {
        var p = cp.spawn('npx', ['eleventy', `--input=${input}`, `--output=${output}`]);
        p.stdout.on('data', (data) => { 
            log(`${data}`); 
        });
        p.stderr.on('data', (data) => { 
            log.error(`stderr: ${data}`); 
           // reject(`stderr: ${data}`); 
        });
        p.on('close', (code) => { 
            log(`11ty process exited with code ${code}`); 
            resolve(); 
        });
    });
}

/**
 * Public gulp task.
 * End-to-end server (API) transcompiler.
 * 
 * @public
 * @returns {TaskFunction}
 */
var compile = gulp.series(_11ty, _post11tyServer);
compile.description = 'Runs the Transcompiler for lambda API';
exports.compile = compile;
