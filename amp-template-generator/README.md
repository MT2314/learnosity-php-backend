# amp-template-generator lambda layer

## Windows users

In order to run the "npm run buildz" command, you need to do the following:

Go to http://stahlworks.com/dev/index.php?tool=zipunzip and download "zip.exe"

Move "zip.exe" into the following directory:

```
"C:\Users\YOUR_USERNAME\AppData\Roaming\npm"
```

From here you need to search for "edit the system environment variables" on your Windows machine. From here, click on "Environment Variables.." under the "Advanced" tab. Under the "User variables for YOUR_USERNAME" you should see "Path". Click on it and then click on "edit".

A new modal will pop up and from here you need to click on "New". For the path name, you need to set it as the following:

```
C:\Users\YOUR_USERNAME\AppData\Roaming\npm\zip.exe
```

## Initial setup

```
cd src
npm install
```

## Configure .env

The .env file should be created within amp-template-generator/src/. Update environment variables as needed. Current the following variables are being used:

```
GQL_ENDPOINT=
QUERY=
COGNITO_USERNAME=
COGNITO_PASSWORD=
COGNITO_CLIENTID=
NODE_ENV=
ID=
USER_ID=
STAGING=
ELEVENTY_STAGING=
```

## Running local builds

// must be in src folder to run the following scripts. If not:

```
cd src
```

// outputs demo templates /dist/demo/demo-\*.html

```
npm run buildd
```

// outputs showcase template to /dist/showcase/showcase-amp.html

```
npm run builds
```

// outputs lesson from apollo query /dist/queryResult/theresult.html

```
npm run buildn
```

// erases all files in ./.tmp and ./dist

```
npm run reset
```

// kicks off the local development live reload server (localhost:8000), serving any files in ./dist. This is executed upon the docker container initialization, so a developer should not need to run this command manually.

```
npm run livereload
```

## Running lambda layer build

// outputs lambda layer to /build/nodejs.zip

```
npm run buildz
```

## Brightcove Stylesheet

The stylings of an <amp-brightcove/> component work a little differently than other components. Brightcove videos are loaded inside an iframe, so the CSS to style the video player must be uploaded directly to Brightcove via the Digital Media Services team (Keith Lennox).
The Brightcove CSS uses the same mixins and color variables as our other SASS, but it is compiled as a standalone CSS output.
The process for changing the Brightcove player styles is:

Copy amp-template-generator/src/styles/test/brightcove.html to dist/.
This is a non-amp test file which will load a Brightcove video and refer to our CSS, so we can see our changes in the browser locally.

Change the styles in src/scss/brightcove.scss as required.

```
npm run sass:bc //will compile the sass to dist/brightcove.css.
```

When the changes are ready, contact Digital Media Services so they can upload/replace the CSS in our player.

## Dev Mode (Sass debugging in Chrome Dev Tools)

// Run any "build" task in "dev mode":

```
npm run buildd -- --dev
npm run builds -- --dev
npm run buildn -- --dev
```

The `-- --dev` flag will compile the spcified outputs in a _non-production ready_, **not amp-valid** version to aid with debugging CSS in particular:

- CSS is compiled, **_unminified_ and _unpurged_**, to `./dist/style.css`, alongside `./dist/style.css.map`.
- Instead of including a minified, purged version of the CSS inside a `<style>` tag in the HTML file, **the CSS is `<link>`ed to**, in order to enable source mapping and live-reloading.

Once some HTML files have been generated in this fashion, if you only wish to rebuild the SASS instead of every HTML file, you can run:

```
# just re-compile the "dev mode" CSS
npm run sass
```
