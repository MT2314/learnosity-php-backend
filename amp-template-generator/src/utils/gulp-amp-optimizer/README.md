# Gulp AMP Optimizer

Thin wrapper for the [AMP Optimizer library](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer) to add support for gulp vinyl streams 

Available for use from the [GitLab NPM Registry](https://gitlab.tvo.org/content-solutions/gulp-plugins/gulp-amp-optimizer/-/packages).

## Install
```
npm install --save @content-solutions/gulp-amp-optimizer
```

For more information, see the GitLab NPM Registry pages and documentation.

## Usage
```javascript
const gulp = require('gulp');
const ampOptimizer = require('@content-solutions/gulp-amp-optimizer');

exports.default = () => {
    gulp.src('index.html')
        .pipe(ampOptimizer({
            verbose: true,
            extensionVersions: {
                'amp-carousel': '0.1',
            },
            transformations: [
                'AddMandatoryTags',
                'AutoExtensionImporter',
                'OptimizeImages',
                'ReorderHeadTransformer',
                'RewriteAmpUrls',
                'GoogleFontsPreconnect',
                'PruneDuplicateResourceHints',
                'SeparateKeyframes',
                'RemoveCspNonce',
                'MinifyHtml'
            ],
            minify: false
        }))
        .pipe(gulp.dest('dist'));
};
```

The options object passed into ampOptimzer() can be [any options supported](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer#options) by the AMP Project.

## Maintenance

### Installation
```
# Clone the project locally, then install:
npm install
```

### Registry Publishing
* Merge final changes to master
* Bump version number in package.json & package-lock.json
* Tag with new version number
* Publish new version to GitLab NPM Registry via [GitLab CI/CD Jobs](https://gitlab.tvo.org/content-solutions/gulp-plugins/gulp-amp-optimizer/-/jobs)

