import React, { useEffect, useState } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";

import "./assets/styles.module.scss";
import "./assets/styles.scss";

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
      console.log(parsedRequest);

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

  var itemsApp = null;
  function createItemsApp(initializationObject) {
    itemsApp = LearnosityQuestionEditor.init(initializationObject, {
      readyListener: function () {
        console.log("Items API initialization completed successfully");
      },
    });
  }

  // function destroyItemsApp() {
  //   if (itemsApp) {
  //     itemsApp.reset();
  //     itemsApp = null;
  //   }
  // }
  // useEffect(() => {
  //   if (authorScript === "ready" && response !== null) {
  //     const itemsApp = LearnosityAuthor.init(response, {
  //       readyListener() {
  //         console.log(response);
  //       },
  //       errorListener(err) {
  //         console.log("error", err);
  //       },
  //     });
  //   }
  // }, [response, authorScript]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <h1>Standalone Assessment Example</h1>
          <div id="learnosity-author"></div>

          {/* <div className="container col-12"> */}
          {/* <span data-lrn-qe-layout-widget-title></span> */}
          {/* <span data-lrn-qe-layout-tile-list></span> */}
          {/* <span data-lrn-qe-layout-validate-question></span> */}
          {/* <span data-lrn-qe-layout-live-score></span> */}
        </div>
      </div>
      {/* <div className="iau-demo"> */}
      {/* <span className="learnosity-response question-60001"></span> */}
      {/* </div> */}

      {/* <div id="learnosity-author"></div> */}
    </div>
    // </div>
  );
};

export default MultipleChoice;
