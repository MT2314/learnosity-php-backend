// Gets Cognito ID token for adding to authenticated requests
const fs = require("fs");
const path = require("path");
const axios = require("axios");

require("dotenv").config();

const getCredentials = async () => {
  console.log('in generateLocalToken: ', process.env.COGNITO_USERNAME);
  const AccessToken = await axios
    .post(
      "https://cognito-idp.ca-central-1.amazonaws.com/",
      JSON.stringify({
        AuthParameters: {
          USERNAME: process.env.COGNITO_USERNAME,
          PASSWORD: process.env.COGNITO_PASSWORD,
        },
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env.COGNITO_CLIENTID,
      }),
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          "Content-Type": "application/x-amz-json-1.1",
        },
      }
    )
    .then(function (response) {
      return response.data.AuthenticationResult.AccessToken;
    })
    .catch(function (error) {
      console.error("-- ", error);
    });

  if (!AccessToken) throw new Error("Token aquisition failed");
  console.log("Acquired idToken \n", AccessToken);
  // fs.writeFileSync(path.join(__dirname, "../.tmp/token.env"), `AUTH_TOKEN=${AccessToken}`);
  return AccessToken;
};


module.exports = { getCredentials };
