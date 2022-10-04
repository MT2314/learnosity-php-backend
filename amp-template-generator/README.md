# amp-generator lambda layer

## Initial setup
```
cd src
npm install
```

## Running local builds
```
// must be in src folder to run the following scripts. If not:
cd src

// outputs demo templates /dist/demo/demo-*.html
npm run buildd

// outputs showcase template to /dist/showcase/showcase-amp.html
npm run builds

// outputs lesson from apollo query /dist/queryResult/theresult.html
npm run buildn
```
## Running lambda layer build
```
// outputs lambda layer to /build/nodejs.zip
npm run buildzip
```