#!/bin/bash
# copy component-library templates to ilc-amp-2 node modules... This emulates a "build" of the component library
cp -R -a ./src/templates ../ilc-amp-2/node_modules/@publishing-platform/component-library/dist

# "install" the copied files into the right place in ilc-amp-2
npm run install-templates --prefix ../ilc-amp-2

# run the ilc-amp build of demo files
npm run buildd --prefix ../ilc-amp-2

# run the ilc-amp build of showcase page
npm run builds --prefix ../ilc-amp-2
