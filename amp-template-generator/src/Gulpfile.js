require("dotenv").config();
const browserSync = require("browser-sync").create();
const del = require("del");
const log = require("fancy-log");
const gulp = require("gulp");
const gulpReplaceImportant = require("gulp-replace-important");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cp = require("child_process");
const argv = require("yargs").argv;
const csPurgeCss = require("./utils/gulp-purge-css");
const csAmpOptimizer = require("./utils/gulp-amp-optimizer");
const gulpif = require("gulp-if");
const gulpAmpValidator = require("gulp-amphtml-validator");
const rename = require("gulp-rename");
const path = require("path");

const dirs = {
  root: process.env.STAGING,
  cssStaging: process.env.STAGING + "styles/",
  eleventy: process.env.ELEVENTY_STAGING,
  webserverRoot: "dist/",
};
log(JSON.stringify(dirs, null, 2));

/**
 * Internal gulp task.
 * Erases contents of the css staging directory.
 *
 * @private
 * @returns {Promise}
 */
function _deleteDistLiquid() {
  return del([".tmp/11ty/*", "dist/*"]);
}

function _cleanStyles() {
  return del([dirs.cssStaging + "*", dirs.webserverRoot + "*.css*"]);
}

function _deleteBuildFolder() {
  return del(["build"]);
}

// function _deleteViewsFolder() {
//   return del(["views"]);
// }

/**
 * Public gulp task.
 * Removes all .tmp/ or dist/ contents.
 *
 * @public
 * @returns {Promise}
 */
var reset = function () {
  return del([
    dirs.root + "*",
    "!" + dirs.root,
    dirs.webserverRoot + "*",
    "!" + dirs.webserverRoot,
    "views/includes/.tmp", // Erases old 11ty copy of sass output
  ]);
};
reset.description = "Erases all contents of .tmp/ and dist/";
exports.reset = reset;

/**
 * Internal gulp task.
 * Compiles SASS into CSS file (styles.css)
 *
 * @private
 * @returns {Stream}
 */
function _sass() {
  return (
    gulp
      .src("styles/scss/styles.scss")
      .pipe(
        sass({
          includePaths: ["node_modules"],
        }).on("error", sass.logError)
      )
      // Validate the input and attach the validation result to the "amp" property
      // of the file object.
      .pipe(gulpReplaceImportant())
      .pipe(gulp.dest("styles/"))
  );
}

/**
 * Public gulp task.
 * Compiles SASS to AMP valid CSS.
 *
 * @public
 * @returns {TaskFunction}
 */
var buildCss = gulp.series(_cleanStyles, _sass);
buildCss.displayName = "build-css";
buildCss.description = "Compiles SASS to AMP valid CSS.";
exports.buildCss = buildCss;

/**
 * Public gulp task.
 * Compiles SASS with sourcemaps, for local development (styles.css, styles.css.map)
 *
 * @public
 * @returns {Stream}
 */
var buildCssDebug = function () {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(dirs.webserverRoot));
};
buildCssDebug.displayName = "build-css:debug";
buildCssDebug.description =
  "Compiles SASS with sourcemaps, for local development";
exports.buildCssDebug = buildCssDebug;

/**
 * Public gulp task.
 * Compiles Brightcove SASS with sourcemaps, for local development (brightcove.css, brightcove.css.map)
 *
 * @public
 * @returns {Stream}
 */
var buildCssBrightcove = function () {
  return gulp
    .src("src/scss/brightcove.scss")
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(dirs.webserverRoot));
};
buildCssBrightcove.displayName = "build-css:brightcove";
buildCssBrightcove.description =
  "Compiles Brightcove SASS with sourcemaps, for local development";
exports.buildCssBrightcove = buildCssBrightcove;

/**
 * Public gulp task.
 * Launches livereload server, for local development of HTML or CSS.
 *
 * @public
 * @param {Function} cb Callback function.
 */
var livereload = function (cb) {
  // https://browsersync.io/docs/options#option-files
  browserSync.init({
    server: {
      baseDir: dirs.webserverRoot,
      directory: true,
    },
    port: process.env.PORT || 8000,
    open: false,
    ui: false,
    files: [
      {
        match: [dirs.webserverRoot],
        fn: function (event, file) {
          console.log("[BrowserSync] " + event + ": " + file);
          this.reload();
        },
        options: {
          ignored: ".DS_Store",
        },
      },
    ],
    callbacks: {
      ready: function (err, bs) {
        cb();
      },
    },
  });
};
livereload.description = "Launches the local livereload webserver";
exports.livereload = livereload;

/**
 * Internal gulp task.
 * Runs cleanup after 11ty generates the inital output
 * * Purges unused css and inserts minified css into html files (skips if running in "dev mode")
 * * Runs "AMP Optimizer" to generate script tags and boilerplate CSS.
 *
 * Uses in-house gulp plugins 'gulp-cs-purge-css' and 'gulp-cs-amp-optimizer'.
 *
 * @private
 * @returns {Stream}
 */
function _post11tyLocal() {
  const inputGlob = dirs.eleventy + process.env.USER_ID + "/*.html";
  const outputPath = dirs.webserverRoot + process.env.USER_ID + "/";
  console.log("outputPath", outputPath);
  // const dirPath = path.join(__dirname, outputPath);
  return gulp
    .src(inputGlob, { buffer: false })
    .pipe(gulpif(!__isDevMode(), csPurgeCss([dirs.cssStaging + "styles.css"])))
    .pipe(
      csAmpOptimizer({
        verbose: true,
        extensionVersions: {
          "amp-carousel": "0.1",
        },
        // transformations: [
        //   "AddMandatoryTags",
        //   "AutoExtensionImporter",
        //   "OptimizeImages",
        //   'PreloadHeroImage',
        //   "ReorderHeadTransformer",
        //   "RewriteAmpUrls",
        //   "GoogleFontsPreconnect",
        //   "PruneDuplicateResourceHints",
        //   "SeparateKeyframes",
        //   "RemoveCspNonce",
        //   "MinifyHtml",
        // ],
        minify: false,
      })
    )
    .pipe(gulp.dest(outputPath));
}

/**
 * Are we in "development mode"?
 *
 * @private
 * @returns {Boolean}
 */
function __isDevMode() {
  return !!argv.dev;
}

/**
 * Returns the "build mode" passed in as a gulp argument.
 *
 * @private
 * @returns {String}
 */
function __getBuildMode() {
  if (argv.d) {
    return "demo";
  }

  if (argv.s) {
    return "showcase";
  }

  if (argv.n) {
    return "node";
  }
}

/**
 * Internal gulp task.
 * Sets the USER_ID local environment variable.
 *
 * @private
 * @param {Function} cb callback function
 */
function _setUserId(cb) {
  const mode = __getBuildMode();

  switch (mode) {
    case "demo":
      process.env.USER_ID = mode;
      break;
    case "showcase":
      process.env.USER_ID = mode;
      break;
    case "node":
      process.env.USER_ID = "queryResult";
      break;
    default:
      throw new Error("Invalid mode");
  }

  cb();
}

/**
 * Internal gulp task.
 * Generates 11ty template output, based on the gulp paramter passed in.
 *
 * @private
 * @returns {Promise}
 */
function _11ty() {
  var output = process.env.ELEVENTY_STAGING + process.env.USER_ID + "/";
  var input;

  const mode = __getBuildMode();
  switch (mode) {
    case "demo":
      input = "views/demo*.html";
      break;
    case "showcase":
      input = "views/showcase-amp.html";
      //process.env.SHOWCASE_WRAPPER = true;
      break;
    case "node":
      input = "views/node.liquid";
      break;
    default:
      throw new Error("Invalid mode");
  }

  process.env.DEV_MODE = __isDevMode();

  return new Promise(function (resolve, reject) {
    var p = cp.spawn(
      "npx",
      ["eleventy", `--input=${input}`, `--output=${output}`],
      { shell: true }
    );
    p.stdout.on("data", (data) => {
      log(`${data}`);
    });
    p.stderr.on("data", (data) => {
      log.error(`stderr: ${data}`);
      // reject(`stderr: ${data}`);
    });
    p.on("close", (code) => {
      log(`11ty process exited with code ${code}`);
      resolve();
    });
  });
}

// Check to see if "buildd" is being run
if (__getBuildMode() === "demo") {
  // If the build mode = demo, then we want to copy the js mock data to be used with our demo html pages
  _copyMockData();
}

// Copying the contents of the mockData directory into views/data to be used with the demo html pages
function _copyMockData() {
  return gulp.src("mockData/component*.js").pipe(gulp.dest("views/data/"));
}

// Function to delete any files that begin with the name "component"
function _deleteMockData() {
  return del("views/data/component*.js");
}

/**
 * Public gulp task.
 * End-to-end local terminal transcompiler.
 *
 * @public
 * @returns {TaskFunction}
 */
var buildLocal = gulp.series(
  _deleteDistLiquid,
  _setUserId,
  __isDevMode() ? buildCssDebug : buildCss,
  _11ty,
  _post11tyLocal,
  _deleteMockData
);
buildLocal.displayName = "build:local";
buildLocal.description = "Runs the Transcompiler for local development";
buildLocal.flags = {
  "-d": "demo pages",
  "-s": "showcase page",
  "-n": "node.liquid",
};

exports.buildLocal = buildLocal;

var lint = function () {
  return gulp
    .src([
      dirs.webserverRoot + "demo/demo*.html",
      dirs.webserverRoot + "showcase/*.html",
      dirs.webserverRoot + "liquid/*.html",
    ])
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format());
  //.pipe(gulpAmpValidator.failAfterWarningOrError());
};
lint.description = "Validates AMPHTML";
exports.lint = lint;

function _copyFiles() {
  return gulp
    .src(
      [
        "views/**/*",
        "utils/**/*",
        "package*.json",
        ".eleventy.js",
        "index.js",
        "styles/fonts/*",
        "styles/styles.css",
      ],
      {
        base: "./",
      }
    )
    .pipe(gulp.dest("build/nodejs/luke"));
}

function _copyStyles() {
  return gulp
    .src(".tmp/styles/*.css")
    .pipe(gulp.dest("build/nodejs/luke/styles"));
}

/**
 * Internal gulp task.
 * Runs npm install --production
 *
 * @private
 * @returns {Promise}
 */
// TODO: this task will be deprecated once the pipeline is updated to run npm install in the lambda layerx
function _installBuild() {
  return new Promise(function (resolve, reject) {
    var p = cp.spawn("npm", ["install", "--production"], {
      cwd: "build/nodejs/luke",
      shell: true,
    });
    p.stdout.on("data", (data) => {
      log(`${data}`);
    });
    p.stderr.on("data", (data) => {
      log.error(`stderr: ${data}`);
      // reject(`stderr: ${data}`);
    });
    p.on("close", (code) => {
      log(`npm install process exited with code ${code}`);
      resolve();
    });
  });
}

function _zipBuild() {
  return new Promise(function (resolve, reject) {
    // var p = cp.spawn("zip", ["nodejs.zip", "-r", "./nodejs", "--symlinks"], {
    var p = cp.spawn("zip", ["nodejs.zip", "-r", "./nodejs"], {
      cwd: "build",
      shell: true,
    });
    p.stdout.on("data", (data) => {
      log(`${data}`);
    });
    p.stderr.on("data", (data) => {
      log.error(`stderr: ${data}`);
      // reject(`stderr: ${data}`);
    });
    p.on("close", (code) => {
      log(`zip process exited with code ${code}`);
      resolve();
    });
  });
}

/**
 * Runs gulp tasks and generates nodejs.zip (remotely on AWS codepipeline)
 *
 */
var build = gulp.series(
  _deleteBuildFolder,
  gulp.parallel(_copyFiles),
  _installBuild,
  _zipBuild
);
build.description = "Creates build folder output, for use as lambda layer";
exports.build = build;

/**
 * Runs gulp tasks and generates nodejs.zip (locally for testing)
 *
 */
var buildlocal = gulp.series(
  _deleteBuildFolder,
  buildCss,
  gulp.parallel(_copyFiles, _copyStyles),
  _installBuild,
  _zipBuild
);
buildlocal.description = "Creates build folder output, for use as lambda layer (local)";
exports.buildlocal = buildlocal;