const Eleventy = require("@11ty/eleventy");
const path = require("path");
require("dotenv").config();
const csAmpOptimizer = require("./utils/ampoptimize");
const csPurgeCss = require("./utils/purgecss");
const pjson = require('./package.json');

const compile = async function (promise) {
  const ts = Date.now();
  console.log("luke.compile() called", "v" + pjson.version, ts);
  const _configpath = path.join(__dirname, ".eleventy.js");
  const _input = path.join(__dirname, 'views/node.liquid');
  const _output = process.env.USER_ID + "/";// + ts + "/";
  // const _output = process.env.ELEVENTY_STAGING + process.env.USER_ID + "/";
  const _css = path.join(__dirname, "/styles/styles.css");
  var _files = new Array();

  let elev = new Eleventy(_input, _output, {
    // --quiet
    // quietMode: true,
    // --config
    configPath: _configpath,
  });

  // start 11ty process programatically
  let stream = await elev.toNDJSON();

  stream.on("data", (entry) => {
    let json = JSON.parse(entry.toString());
    _files.push(json);
  });

  stream.on("end", () => {
    // console.log("11ty stream process end", _files.length);
  });

  stream.on("close", async () => {
    console.log("11ty stream process closed - post 11ty process");
    var _promises = new Array();
    if (_files.length > 0) {
      _files.forEach((file, index, array) => {
        _promises.push(queueFile(file, _css));
      }); 
    } else {
      // no files
      promise.reject({
        statusCode: 400,
        message: "An error occured and the files could not be processed",
      });
    }
 
    return await promiseAll(_promises).then((result) => {
      console.log("respond to handler", result.statusCode);
      if (result.statusCode === 200) {
        promise.resolve(result);
      } else {
        promise.reject(result);
      }
    });
  });
};

async function queueFile(file, _css) {
  return new Promise(async function (resolve, reject) {
    await csPurgeCss(file.content, [_css]).then(async (result) => {
      const config = {
        verbose: false,
        extensionVersions: {
          "amp-carousel": "0.1",
        },
        transformations: [
          "AddMandatoryTags",
          "AutoExtensionImporter",
          "OptimizeImages",
          //'PreloadHeroImage',
          "ReorderHeadTransformer",
          "RewriteAmpUrls",
          "GoogleFontsPreconnect",
          "PruneDuplicateResourceHints",
          "SeparateKeyframes",
          "RemoveCspNonce",
          "MinifyHtml",
        ],
        minify: true,
      };

      await csAmpOptimizer(result, config).then((result) => {
        file.content = result;
        console.log("csPurgeCss => csAmpOptimizer =>", file.outputPath);
        // console.log("file.content", file.content);
      });
    });
    resolve(file);
  });
}

async function promiseAll(promises) {
  // console.log("promiseAll", promises);
  let _postfiles = new Array();
  return Promise.allSettled(promises).then(
    async (files) => {
      files.forEach(file => {
        _postfiles.push(file.value);
      });
      console.log('promiseAll files: ' +  _postfiles.length);
      return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        message: "Success from luke.compile - all files processed",
        data: _postfiles,
      };
    },
    (reason) => {
      console.log(reason);
      return {
        statusCode: 400,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({
          message: reason,
        }),
      };
    }
  );
}

module.exports = { compile };
