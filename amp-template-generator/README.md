# Amp-template-generator

This is a minirepo within the mf-component-library which generates AMP-valid HTML files using [Eleventy Static Site Generator (11ty)](https://www.11ty.dev/docs/).

This provides the ability to see the output of the work in progress, file compilation and build/packaging of the ready-for-use amp templates

ilc-amp

Initially called 'ilc-amp', this template _(luke)_ layer includes templates for building 20+ components (many of them interactive) custom-tailored for ILC courseware.

The code in this repo works as a layer on top of a NodeJS-based transcompiler in AWS Lambda that exports courseware data from headless CMS (via GraphQL) to the HTML files.

It can also be used interchangeably to generate static HTML files with any other transcompiler requiring AMP and this ILC styling.

This project can be found in use as a layer on AWS [here](https://ca-central-1.console.aws.amazon.com/lambda/home?region=ca-central-1#/functions/tatooine-prod-compile?tab=configuration).

See original codebase [project wiki](https://gitlab.tvo.org/content-solutions/courseware-graphql-output/wikis/) for other documentation.

## Working with this repo

<!-- test -->

When you first start working with the subrepo:

```
cd amp-template-generator
npm install

```

Configure .env

```
cd ilc-amp
# Add a .env file to the root directory by copying and renaming .env.local
cp .env.local .env
# Update environment variables as needed
```

Make changes to the template files OUTSIDE amp-template-generator, within the src
folder of mf-component-library. These can be found in the templates folder. Once you are ready to see your changes, pointing at mf-component-library:

```
npm run test-templates

```

Npm package installs and updates

```
# After npm installations or updates run the following command
npm run install-templates

```

This copies the scss, test and views folders and contents from the mf-component-library into the node_modules of amp-template-generator, installs the templates on the mini-repo, and runs demo builds for you to view from /dist/demo and /dist/showcase.

When you are ready to do a proper build of the amp templates, pointing at amp-template-generator:

```
npm run build
```

This compiles the templates, generatates the files needed by the transcompiler Lambda and outputs them to the /build folder. Currently this is a manual process but we're working toward automation. This build folder contains both the required output as both loose files and a zipped folder.

## Brightcove Stylesheet

The stylings of an &lt;amp-brightcove/&gt; component work a little differently than other components. Brightcove videos are loaded inside an iframe, so the CSS to style the video player must be uploaded directly to Brightcove via the Digital Media Services team (Keith Lennox).

The Brightcove CSS uses the same mixins and color variables as our other SASS, but it is compiled as a standalone CSS output.

The process for changing the Brightcove player styles is:

1. Copy `src/test/brightcove.html` to `dist/`.

   This is a non-amp test file which will load a Brightcove video and refer to our CSS, so we can see our changes in the browser locally.

2. Change the styles in `src/scss/brightcove.scss` as required.

3. `npm run sass:bc` will compile the sass to `dist/brightcove.css`.

4. When the changes are ready, contact Digital Media Services so they can upload/replace the CSS in our player.

## Command options for local development

Manual testing is made possible by editing values in the `.env` file. Please note that by uncommenting `ENTITY_ID`, the value set here may override the entity id (eid) in the url query value when run via the api call. Both examples output to `./dist/liquid/`

Example 1 - Test a lesson output; set ENTITY_ID=4d0e9579-5ac8-4390-a986-85af56e11009

```
# local terminal or docker shell
npm run buildn

# or, if you have gulp installed locally
gulp build:local -n
```

Other commands (for more information, [see the wiki](https://gitlab.tvo.org/content-solutions/courseware-graphql-output/wikis/Transcompiler-Commands)):

`npm run buildd` - Builds all "demo" pages (Compile SASS to CSS, and generate all "demo" HTML pages in `./dist/demo`).

`npm run builds` - Builds the "showcase" page (Compile SASS to CSS, and generate showcase HTML page in `./dist/showcase`).

`npm run sass:bc` - (local only) Compiles the Brightcove player CSS file. See [Brightcove Stylesheet](#brightcove-stylesheet), below.

`npm run reset` - erases all files in `./.tmp` and `./dist`

`npm run livereload` - kicks off the local development live reload server (`localhost:8000`), serving any files in `./dist`. This is executed upon the docker container initialization, so a developer should not need to run this command manually.

### Dev Mode (Sass debugging in Chrome Dev Tools)

```
# Run any "build" task in "dev mode":
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
