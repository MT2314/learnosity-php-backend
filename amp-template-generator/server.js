'use strict';

require('dotenv').config();
const {exec} = require('child_process');

async function sass() {
  const cmd = 'npm run sass:local';
  const cp1 = exec(cmd, (error, stdout, stderr) => {
    if (error)
      return console.error(`exec error: ${error}`);
  });
  //cp1.unref(); 
  cp1.stdout.on('data', data => console.log(data));
  cp1.stderr.on('data', data => console.error(data));
  return cp1;
}

async function livereload() {
  const cp3 = exec('npm run livereload', (error, stdout, stderr) => {
    if (error)
      return console.error(`exec error: ${error}`);
  });
  //cp3.unref();
  cp3.stdout.on('data', data => console.log(data));
  cp3.stderr.on('data', data => console.error(data));
  return cp3;
}

async function start() {
  sass();
  if (process.env.NODE_ENV == 'local') {
    return setTimeout(livereload, 2000);
  }
}

start();