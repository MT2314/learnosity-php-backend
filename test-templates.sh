#!/bin/bash
# copy component-library templates to ilc-amp-2 node modules... This emulates a "build" of the component library
cp -R -a ./src/templates ./amp-template-generator/node_modules/@publishing-platform/component-library/dist

# cp -R -a ./src/templates/test ./amp-template-generator/node_modules/@publishing-platform/component-library/dist

# cp -R -a ./src/templates/views ./amp-template-generator/views
# "install" the copied files into the right place in ilc-amp-2
npm run install-templates --prefix ./amp-template-generator

# run the ilc-amp build of demo files
npm run buildd --prefix ./amp-template-generator

# run the ilc-amp build of showcase page
npm run builds --prefix ./amp-template-generator
