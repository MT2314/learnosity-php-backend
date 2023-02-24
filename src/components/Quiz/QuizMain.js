import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";
import { v4 as uuidv4 } from "uuid";

import "./assets/css/main.css";
import "./assets/css/quad.css";
import "./assets/styles.scss";

export const defaultProps = {
  quizId: "quizId",
  quizName: "quizName",
};

const QuizMain = () => {
  // Learnosity Author API configuration
  const [response, setResponse] = useState(null);
  const [refrenceId, setRefrenceId] = useState(null);
  // Author script is loaded from the Learnosity CDN
  const [authorAPI, setAuthorAPI] = useState(null);
  const authorScript = useScript(authorAPI);

  // Multiple Choice state

  // Current item state
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch the Learnosity Author API configuration
  const requestAPI = async (itemId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1/learnosity-demos/www/authoring/Quiz-DisableSections.php`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: { mode: "item_list", itemref: `${itemId}` },
        }
      );
      console.log(response);

      let parsedRequest = JSON.parse(response.data.request);
      console.log(parsedRequest);

      setResponse(parsedRequest);

      setAuthorAPI(response.data.url_authorapi);
      console.log(response.data.url_authorapi);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    let itemId = `publishing-${uuidv4()}`;
    console.log(itemId);
    setRefrenceId(itemId);
    requestAPI(itemId);
  }, []);

  var itemsApp = null;

  // Initialize the Author API when the script is loaded
  const customApp = (response) => {
    if (authorScript === "ready" && response !== null) {
      itemsApp = LearnosityAuthor.init(response, {
        readyListener: function (e) {
          // Capture navigation events
          itemsApp.on("navigate", function (event) {
            console.log("navigate", event);
            setCurrentItem("item_list");

            // Capture the event when the user clicks the "Add Item" button
            if (event.data.route === "items/new") {
              event.preventDefault();
              console.log("items/new");
              createItem(refrenceId);
              setCurrentItem("item_list");
            }
            // Once the item is created, navigate to the item select screen
            if (event.data.route === "items/:reference") {
              event.preventDefault();
              console.log("items/:reference");
              itemsApp.navigate("items/" + refrenceId + "/widgets/new");
              setCurrentItem("question_select");
            }
            // Once the item is created, navigate to the item select screen
            if (event.data.route === "items/:reference/widgets/new") {
              console.log("items/:reference/widgets/new");
              setCurrentItem("question_editor");
            }
          });
        },
        errorListener(err) {
          console.log("error", err);
        },
      });
    }
  };

  // Add a new item to the Author API
  const createItem = () => {
    console.log("createItem", refrenceId);
    if (itemsApp) {
      itemsApp.createItem(refrenceId);
    }
  };

  const goToItem = () => {
    console.log("goToItem", refrenceId);
    return itemsApp.navigate("item/" + refrenceId + "/widgets/new");
  };
  console.log(currentItem);
  return (
    <div className="multiple-choice-container">
      {currentItem === null && (
        <div className="mc-custom-container">
          <button
            className="mc-create-button"
            onClick={() => customApp(response)}
          >
            Create Multiple Choice Question
          </button>
        </div>
      )}
      {/* <div className="my-widget-selection-wrapper">
          <span data-lrn-qe-layout-tile-list></span>
        </div> */}

      {/* <MultipleChoice /> */}
      {currentItem === "question_select" && (
        <div className="my-widget-selection-wrapper">
          <span data-lrn-qe-layout-tile-list></span>
        </div>
      )}
      <div className="my-widget">
        <div id="learnosity-author"></div>
        {/* <div id="my-custom-container"></div> */}
      </div>
    </div>
  );
};

// const QuestionSelect = () => {
//   return (

//   );
// };

const QuestionEditor = () => {
  return (
    <div className="row col-6">
      <span data-lrn-qe-layout-edit-panel></span>
    </div>
  );
};

// const MultipleChoice = () => {
//   return (
{
  /* <QuestionEditor /> */
}
//    <span
//    data-lrn-qe-label="stimulus"
//    className="lrn-qe-lg-ckeditor lrn-text-normal"
//  ></span>
//  <div className="container col-12">
//    <span data-lrn-qe-layout-widget-title></span>
//    <div className="row col-6">
//      <span data-lrn-qe-layout-edit-panel></span>
//    </div>
//    <div className="row col-6">
//      <div className="button-controls">
//        <span data-lrn-qe-layout-validate-question>3</span>
//        <span data-lrn-qe-layout-live-score></span>
//      </div>
//      <div className="row col-6">
//        <div className="button-controls">
//          <span data-lrn-qe-layout-source-button></span>
//          <div className="row col-6">
//            <div className="button-controls">
//              <span data-lrn-qe-layout-global-help></span>
//              <span data-lrn-qe-layout-preview-panel></span>
//              <span data-lrn-qe-layout-change-question></span>
//              <span data-lrn-qe-layout-delete-question></span>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//   );
// };
export default QuizMain;
