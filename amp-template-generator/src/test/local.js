// locally test programatic 11ty api - simulates lambda trigger
// cd src
// run cli: node -e 'require("./test/local.js")'
const compiler = require('../index.js');
const tokenGenerator = require("./generate-local-token");

(async () => {
  const token = await tokenGenerator.getCredentials();

  let awsCredentialsConfig = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    },
  }

  const _permissionPublisher = 'course:edit-pubversion,course:publish-course,course:view-courses,course:create-course,course:create-lesson,course:edit-lesson,course:edit-section,course:delete-lesson,course:update-structure,course:delete-unit,course:create-unit,course:duplicate-unpubversion,course:validate-version,course:edit-meta,course:delete-course,course:delete-version,course:create-edition,course:edit-state,course:move-inreview';
  const _permissionEditior = 'course:edit-meta,course:delete-course,course:delete-version,course:create-edition,course:create-course,course:create-lesson,course:edit-lesson,course:edit-section,course:delete-lesson,course:update-structure,course:delete-unit,course:create-unit,course:duplicate-unpubversion,course:validate-version,course:view-courses,course:edit-state,course:move-inreview';
  
  const evt = {
    queryStringParameters: {
      id: process.env.ID,
    },
    headers: {
      authorizationToken: token,
    },
    requestContext: {
      resourceId: '5o83qlb5ak',
      authorizer: {
        tenantName: 'tvo',
        permissions: _permissionPublisher,
        tenantId: '76876a56',
        name: 'platypusPublisher',
        principalId: 'platypusPublisher@tvo.org',
        integrationLatency: 276,
        userId: 'b4875517-bb4c-488a-b9e5-e38706f68c44'
      },
      domainName: "api-sbx.tvopublishing.com",
    },
    awsCredentialsConfig: awsCredentialsConfig,
  };
  console.time("luke.compile()");
  new Promise(async function (resolve, reject) {
    evt.resolve = resolve;
    evt.reject = reject;
  }).then((result) => {
    console.log("==========\n'lambda handler:'", result.statusCode, result.message);
  }).catch((err) => {
    console.log("catch err:", err);
    return err;
  }).finally(() => {
    // console.log("finally");
    console.timeEnd("luke.compile()");
  });
  await compiler.compile(evt);
})();
