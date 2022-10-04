const Eleventy = require("@11ty/eleventy");
const path = require("path");
require("dotenv").config();
const csAmpOptimizer = require("./utils/ampoptimize");
const csPurgeCss = require("./utils/purgecss");

const compile = async function (promise) {
  console.log("luke.compile() called");
  const _configpath = path.join(__dirname, ".eleventy.js");
  // const _input = path.join(__dirname, "/views/showcase-amp.html");
  const _input = path.join(__dirname, 'views/node.liquid');
  const _output = process.env.ELEVENTY_STAGING + process.env.USER_ID + "/";
  const _css = path.join(__dirname, "/styles/styles.css");

  let elev = new Eleventy(_input, _output, {
    // --quiet
    // quietMode: true,
    // --config
    configPath: _configpath,
  });

  // start 11ty process programatically
  let datastream;
  let stream = await elev.toNDJSON();
  // console.log('stream',stream);
  stream.on("data", (entry) => {
    let json = JSON.parse(entry.toString());
    datastream = json.content;
  });

  stream.on("end", () => {
    console.log("11ty stream on('end')", datastream);
    csPurgeCss(datastream, [_css]).then((result) => {
      console.log("csPurgeCss result", typeof result);
      ampOptimize(result);
    });
  });

  function ampOptimize(result) {
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
      console.log("csAmpOptimizer result", typeof result);

      // promise.reject if there is an error
      // promise.reject({
      //   statusCode: 400,
      //   message: "error in csAmpOptimizer",
      //   data: result,
      // });

      // this promise.resolve returns to the handler
      promise.resolve({
          statusCode: 200,
          message: "Success from luke.compile",
          data: result,
      });
    });
  }

  stream.on("close", (code) => {
    console.log(`11ty stream process exited with code ${code}`);
  });
};

module.exports = { compile };
