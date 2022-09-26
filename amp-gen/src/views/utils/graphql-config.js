const GraphQLClient = require("graphql-request").GraphQLClient;
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

if (process.env.NODE_ENV === "local") {
  console.log("Running in local mode, getting token from env file");
  dotenv.config({ path: path.join(__dirname, "token.env") });
  console.log("Token", process.env.AUTH_TOKEN);
}

module.exports = {
  client: new GraphQLClient(process.env.GQL_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
      // "x-api-key": process.env.X_API_KEY,
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  }),
};
