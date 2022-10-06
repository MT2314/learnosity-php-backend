const Eleventy = require("@11ty/eleventy");
const path = require("path");
require("dotenv").config();
const csAmpOptimizer = require("./utils/ampoptimize");
const csPurgeCss = require("./utils/purgecss");

let _files = new Array();

const compile = async function (promise) {
  console.log("luke.compile() called");
  const _configpath = path.join(__dirname, ".eleventy.js");
  const _input = path.join(__dirname, 'views/node.liquid');
  const _output = process.env.USER_ID + "/";
  // const _output = process.env.ELEVENTY_STAGING + process.env.USER_ID + "/";
  const _css = path.join(__dirname, "/styles/styles.css");

  let elev = new Eleventy(_input, _output, {
    // --quiet
    // quietMode: true,
    // --config
    configPath: _configpath,
  });

  // start 11ty process programatically
  let _eleventy = await elev.toJSON();
  let stream = await elev.toNDJSON();

  console.log('_eleventy total:',_eleventy.length);

  stream.on("data", (entry) => {
    let json = JSON.parse(entry.toString());
    // console.log( json );
    csPurgeCss(json.content, [_css]).then((result) => {
      // console.log("csPurgeCss result", typeof result);
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

      csAmpOptimizer(result, config).then((result) => {
        json.content = result;
        _files.push(json);
        console.log('=> ', json.url, json.inputPath, json.outputPath);
        if (_files.length === _eleventy.length) {
          console.log('call resolve', promise, _files.length);
          // promise.resolve returns to the handler
          promise.resolve({
              statusCode: 200,
              message: "Success from luke.compile",
              data: _files,
          });
          // TODO: promise.reject if there is an error
          // promise.reject({
          //   statusCode: 400,
          //   message: "error in csAmpOptimizer",
          //   data: result,
          // });
        }
      });
    });
  });

  stream.on("end", () => {
    console.log("11ty stream process end");
  });

  stream.on("close", () => {
    console.log("11ty stream process closed");
  });
};

module.exports = { compile };
