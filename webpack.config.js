const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: 
      argv.mode === "development"
        ? "http://localhost:3001/"
        : "https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/el-demo-component-library/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
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
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "demo_component_library",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./TextEditable": "./src/TextEditable/TextEditable.js",
        "./QuoteBox":"./src/QuoteBox/QuoteBox.js",
        "./Callout":"./src/Callout/Callout.js",
        "./Header":"./src/Header.jsx",
        "./Form":"./src/Form/Form.js",
        "./FormOutput": "./src/Form/FormOutput.js",
        "./Provider": "./src/Provider.js"

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
      template: "./src/index.html",
    }),
  ],
});
