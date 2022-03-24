# demo-component-library

A remote app to test with module federation spike. This spike demonstrates how components can be shared with demo-lesson-builder through module-federation. With module-federation we were able to remove craftjs depencies from the widgets.  The widgets can now be viewed within demo-component-library and are not reliant on demo-lesson-builder. 


Yarn is our chosen package manager for this project if you do not have yarn installed run the following commands otherwise skip to step 3. 

Step 1 - install yarn
```
npm install --global yarn
```

Step 2 - confirm yarn is installed
```
yarn --version
```

Step 3 - install node modules and open local server
```
yarn && yarn start
```

# How to configure webpack for production

Step 1
Open webpack.config.js. Replace "https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/el-demo-component-library/" with the url with the s3 bucket you are using. 

```
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: 
      argv.mode === "development"
        ? "http://localhost:3001/"
        : "https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/el-demo-component-library/"
  }
```

