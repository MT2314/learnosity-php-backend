import React, { useEffect, useState } from "react";
import axios from "axios";
const Learnosity = require("./Utils/Learnosity.js");
import useScript from "../../Utility/useScript";

export const defaultProps = {
  quizId: "quizId",
  quizName: "quizName",
};

const QuizFetch = () => {
  const [response, setResponse] = useState(null);

  const authorScript = useScript(
    "https://authorapi.learnosity.com/?v2022.2.LTS"
  );
  //   const authorScript = useScript(authorAPI);

  const requestAPI = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1/learnosity-demos/www/authoring/item-create.php`,
        {
          headers: { "Content-Type": "application/json" },
          params: {},
        }
      );

      console.log(response.data);

      let parsedRequest = JSON.parse(response.data.request);

      console.log(
        "request",
        response.data.request,
        parsedRequest,
        typeof response.data.request
      );
      console.log(
        "urlAuthorAPI",
        response.data.url_authorapi,
        typeof response.data.url_authorapi
      );
      setResponse(parsedRequest);
      setAuthorAPI(response.data.url_authorapi);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [itemsApp, setItemsApp] = useState({});
  useEffect(() => {
    requestAPI();
  }, []);

  useEffect(() => {
    if (authorScript === "ready" && response !== null) {
      setItemsApp(() =>
        LearnosityAuthor.init(response, {
          readyListener() {
            console.log(itemsApp);

            console.log("ready");
          },
          errorListener(err) {
            console.log("error", err);
          },
        })
      );
    }
  }, [response, authorScript]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Standalone Assessment Example</h1>

          <div id="learnosity-author"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizFetch;
