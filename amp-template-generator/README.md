# ilc-amp

Template *(luke)* layer which generates AMP-valid HTML files using [Eleventy Static Site Generator (11ty)](https://www.11ty.dev/docs/)

It includes templates for building 20+ components (many of them interactive) custom-tailored for ILC courseware.

The code in this repo works as a layer on top of a NodeJS-based transcompiler in AWS Lambda that exports courseware data from headless CMS (via GraphQL) to the HTML files. 

It can also be used interchangeably to generate static HTML files with any other transcompiler requiring AMP and this ILC styling. 

This project can be found in use as a layer on AWS [here](https://ca-central-1.console.aws.amazon.com/lambda/home?region=ca-central-1#/functions/tatooine-prod-compile?tab=configuration). 

See original codebase [project wiki](https://gitlab.tvo.org/content-solutions/courseware-graphql-output/wikis/) for other documentation.


## Installation

Create a local project directory and clone the repository
```
cd projects/courseware
git clone git@gitlab.tvo.org:content-solutions/transcompiler/layers/luke/ilc-amp.git

```
Checkout the feature branch
```
cd ilc-amp
git checkout <branch name>
git pull

```
Npm package installs and updates
```
# After npm installations or updates run the following command
npm run install-templates

```
Configure .env
```
cd ilc-amp
# Add a .env file to the root directory by copying and renaming .env.local 
cp .env.local .env
# Update environment variables as needed
```
Create the docker images
```
# Run the following command once for the first time; or when there is a significant change to the project configuration
docker-compose up --build
# Run the following command thereafter
docker-compose up
```

In a browser navigate to the live reload server to view the results
```
http://localhost:8000/
```


## Layer Deployment
```
# to add a layer on top of tatooine-prod-compile (AWS Lambda Layer)
# run the following command to trigger a build to package this up in zip folder for layer upload
# once zipped, it can be uploaded directly to your Lambda using the AWS layer wizard

npm run build
```

## Use within Lambda Function
The Lambda that this layer is attached to will kick off the template process via NPM task:
```
npm run compile
```

## Running manual commands in the container
Either open a bash shell to the running container using a terminal
```
cd ilc-amp
docker exec -it ilc-amp /bin/bash
```
Or, open a bash shell to the running container using Visual Studio Code

- Click the Docker tab from the left menu
- Right click on a container and select ```Attach Shell```


## Docker commands
`docker ps -a` - lists running containers

`docker network list` - lists available networks

`docker network inspect <network name>` - provides details of the network; including attached containers/services


## Command options for local development

`npm run install-templates` - Copies component-library templates from `node_modules` and `src/views` to `./views` for use with 11ty. This should be run the first time this project is installed, as well as every time the component-library is updated to a new version.

Manual testing is made possible by editing values in the ```.env``` file. Please note that by uncommenting ```ENTITY_ID```, the value set here may override the entity id (eid) in the url query value when run via the api call. Both examples output to ```./dist/liquid/```

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

`npm run {jeff/tom/fish/karen}` - dev scripts for local experimentation, without breaking the "main demo".

`npm run reset` - erases all files in `./.tmp` and `./dist`

`npm run livereload` - kicks off the local development live reload server (`localhost:8000`), serving any files in `./dist`. This is executed upon the docker container initialization, so a developer should not need to run this command manually.


### Dev Mode (Sass debugging in Chrome Dev Tools)

```
# Run any "build" task in "dev mode":
npm run buildd -- --dev
npm run builds -- --dev
npm run buildn -- --dev
```

The `-- --dev` flag will compile the spcified outputs in a *non-production ready*, **not amp-valid** version to aid with debugging CSS in particular:
* CSS is compiled, ***unminified* and *unpurged***, to `./dist/style.css`, alongside `./dist/style.css.map`.
* Instead of including a minified, purged version of the CSS inside a `<style>` tag in the HTML file, **the CSS is `<link>`ed to**, in order to enable source mapping and live-reloading.

Once some HTML files have been generated in this fashion, if you only wish to rebuild the SASS instead of every HTML file, you can run:
```
# just re-compile the "dev mode" CSS
npm run sass
```

## Brightcove Stylesheet
The stylings of an &lt;amp-brightcove/&gt; component work a little differently than other components. Brightcove videos are loaded inside an iframe, so the CSS to style the video player must be uploaded directly to Brightcove via the Digital Media Services team (Keith Lennox).

The Brightcove CSS uses the same mixins and color variables as our other SASS, but it is compiled as a standalone CSS output.

The process for changing the Brightcove player styles is:
1. Copy `src/test/brightcove.html` to `dist/`.

   This is a non-amp test file which will load a Brightcove video and refer to our CSS, so we can see our changes in the browser locally.

2. Change the styles in `src/scss/brightcove.scss` as required.

3. `npm run sass:bc` will compile the sass to `dist/brightcove.css`. 

4. When the changes are ready, contact Digital Media Services so they can upload/replace the CSS in our player.


