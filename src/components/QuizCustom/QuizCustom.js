import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";

export const defaultProps = {
  quizId: "quizId",
  quizName: "quizName",
};

const QuizCustom = () => {
  const [response, setResponse] = useState(null);
  const [authorAPI, setAuthorAPI] = useState(null);
  // Author script is loaded from the Learnosity CDN
  const authorScript = useScript(authorAPI);

  // Request the Learnosity Author API configuration
  const postCustomRequest = async (mode) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1/learnosity-demos/www/authoring/item-create_customPost.php",
        {
          headers: { "Content-Type": "application/json" },
          params: {
            mode: mode,
          },
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

  // // Load the Author API configuration when the component mounts
  // useEffect(() => {
  //   requestAPI();
  // }, []);

  // Initialize the Author API when the script is loaded
  useEffect(() => {
    if (authorScript === "ready" && response !== null) {
      const itemsApp = LearnosityAuthor.init(response, {
        readyListener() {
          // itemsApp.destroy();
        },
        errorListener(err) {
          console.log("error", err);
        },
      });
    }
  }, [response, authorScript]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <button
              type="button"
              onClick={() => postCustomRequest("item_list")}
            >
              Select existing quiz item
            </button>
            <button
              type="button"
              onClick={() => postCustomRequest("item_edit")}
            >
              Create new quiz item
            </button>
          </div>

          <h1>Standalone Assessment Example</h1>

          <div id="learnosity-author"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizCustom;
