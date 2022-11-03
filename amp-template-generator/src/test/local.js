// locally test programatic 11ty api - simulates lambda trigger
// cd src
// run cli: node -e 'require("./test/local.js").localCompile()'
// TODO: get token
const compiler = require('../index.js');

const localCompile = async function () {
  const evt = {};
  const promise = new Promise(async function (resolve, reject) {
    evt.resolve = resolve;
    evt.reject = reject;
  });
  compiler.compile(evt);
}

module.exports = { localCompile };
