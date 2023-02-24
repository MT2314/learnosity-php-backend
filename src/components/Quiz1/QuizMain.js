import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";
import { v4 as uuidv4 } from "uuid";

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
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Fetch the Learnosity Author API configuration
  const requestAPI = async (itemId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1/learnosity-demos/www/authoring/Quiz-DisableSections.php`,
        {
          headers: { "Content-Type": "application/json" },
          params: { mode: "item_edit", itemref: `${itemId}` },
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
  useEffect(() => {
    if (authorScript === "ready" && response !== null) {
      itemsApp = LearnosityAuthor.init(response, "my-custom-container", {
        readyListener: function (e) {
          console.log("Items API initialization completed successfully");
        },
        errorListener(err) {
          console.log("error", err);
        },
      });

      // itemsApp.on("ready", function (e) {
      //   itemsApp.createItem(refrenceId);
      // });

      // itemsApp.on("navigate", function (event) {
      //   console.log("navigate", event);
      //   var itemRef;
      //   if (event.data.route === "items/:reference/widgets/new") {
      //     event.preventDefault();
      //     console.log("new item");
      //     addItem();
      //   }
      // });
      // itemsApp.on("item:created", function (event) {
      //   console.log("item:created", event);
      // });
      // itemsApp.on("item:edited", function (event) {
      //   console.log("item:edited", event);
      // });
    }
  }, [response, authorScript]);

  const addItem = () => {
    if (itemsApp) {
      itemsApp.addItem(refrenceId);
    }
  };

  return (
    <div className="mc-container">
      <div className="row">
        <h1>Multiple Choice</h1>
        {/* <button onClick={() => customApp(response)}>Create</button>
        <button onClick={() => addItem()}>Add Item</button>
        <button onClick={() => setWidget()}>Set Widget</button>

        <button onClick={() => setItemJson()}>Set Item Json</button>
        <button onClick={() => saveItemsApp()}>Save</button>
        <button onClick={() => destroyItemsApp()}>Destroy</button> */}
      </div>

      <div id="my-custom-container"></div>
      <div id="learnosity-author"></div>
      <div id={refrenceId}></div>
    </div>
  );
};

export default QuizMain;
