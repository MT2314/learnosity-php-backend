const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");

const deps = require("./package.json").dependencies;
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

module.exports = (_, argv) => {
  const envFolderPath = path.join(__dirname, "environments");
  process.env.NODE_ENV = argv.mode; 
  
  let envPath = path.join(envFolderPath, `.env.${argv.env.ENVIRONMENT || 'prod'}`);

  if (!fs.existsSync(envPath)) throw new Error(`.env file for not found`);

  const fileEnv = dotenv.config({ path: envPath }).parsed;

  console.log(fileEnv);

  fileEnv.APP_STAGE = _.ENVIRONMENT

  console.log(fileEnv.APP_STAGE)

  const envKeys = Object.keys(fileEnv).reduce((envObject, next) => {
    envObject[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return envObject;
  }, {});

  console.log(envKeys)
  return {
    output: {
      publicPath:
        argv.mode === "development"
          ? `http://localhost:3001/`
          : `${fileEnv.WEBPACK_PUBLIC_PATH}`,
    clean:true,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    // Do not deploy with this. Comment out before deploying
    // optimization: {
    //   runtimeChunk: "single",
    // },
    devtool: argv.mode !== "development" ? false : "eval-source-map",

    devServer: {
      historyApiFallback: true,
      // compress: true,
      port: 3001,
      client: {
        overlay: true,
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin(envKeys),
      new ModuleFederationPlugin({
        name: "mf_component_library",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./componentIndex": "./src/components/componentIndex.js",
          "./exposedStage": "./exposedStage.js"
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        hash: true, 
        template: "./src/index.html",
        inject:'body'
      }),
    ],
  };
};
