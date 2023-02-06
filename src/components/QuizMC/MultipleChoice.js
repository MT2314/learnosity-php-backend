import React, { useEffect, useState } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";

export const defaultProps = {
  quizId: "quizId",
  quizName: "quizName",
};

const MultipleChoice = () => {
  // Learnosity Author API configuration
  const [response, setResponse] = useState(null);
  // Author script is loaded from the Learnosity CDN
  const [authorAPI, setAuthorAPI] = useState(null);
  const authorScript = useScript(authorAPI);

  // Fetch the Learnosity Author API configuration
  const requestAPI = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1/learnosity-demos/www/authoring/item-create_customMC.php`,
        {
          headers: { "Content-Type": "application/json" },
          params: {},
        }
      );

      let parsedRequest = JSON.parse(response.data.request);
      setResponse(parsedRequest);
      setAuthorAPI(response.data.url_authorapi);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestAPI();
  }, []);

  useEffect(() => {
    if (authorScript === "ready" && response !== null) {
      const itemsApp = LearnosityAuthor.init(response, {
        readyListener() {},
        errorListener(err) {
          console.log("error", err);
        },
      });
    }
  }, [response, authorScript]);

  return <div id="learnosity-author"></div>;
};

export default MultipleChoice;
