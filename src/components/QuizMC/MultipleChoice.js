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
        readyListener() {
          itemsApp.navigate(
            "items/new/widgets/new/" +
              encodeURIComponent(
                JSON.stringify({
                  widgetTemplate: {
                    template_reference: "9e8149bd-e4d8-4dd6-a751-1a113a4b9163",
                  },
                })
              )
          );
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
          <h1>Standalone Assessment Example</h1>

          <div id="learnosity-author"></div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
