import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";
import { v4 as uuidv4 } from "uuid";

import styles from "./assets/styles.module.scss";
import "./assets/styles.module.scss";
import "./assets/styles.scss";

export const defaultProps = {
  quizId: "quizId",
  quizName: "quizName",
};

const MultipleChoice = () => {
  // Learnosity Author API configuration
  const [response, setResponse] = useState(null);
  const [refrenceId, setRefrenceId] = useState(null);
  // Author script is loaded from the Learnosity CDN
  const [authorAPI, setAuthorAPI] = useState(null);
  const authorScript = useScript(authorAPI);

  // Fetch the Learnosity Author API configuration
  const requestAPI = async (itemId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1/learnosity-demos/www/authoring/item-create_customMC.php`,
        {
          headers: { "Content-Type": "application/json" },
          params: { mode: "item_edit", itemref: `${itemId}` },
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

  useMemo(() => {
    let itemId = `publishing-${uuidv4()}`;
    console.log(itemId);
    setRefrenceId(itemId);
    requestAPI(itemId);
  }, []);

  var itemsApp = null;

  const customApp = (response) => {
    itemsApp = LearnosityAuthor.init(response, "my-custom-container", {
      readyListener: function (e) {
        console.log("Items API initialization completed successfully");
      },
    });
    console.log("itemsApp", itemsApp);
    itemsApp.on("ready", function (e) {
      itemsApp.createItem(refrenceId);
    });

    itemsApp.on("navigate", function (event) {
      console.log("navigate", event);
      var itemRef;
      console.log(itemRef);
      if (event.data.route === "items/:reference/widgets/new") {
        event.preventDefault();
        console.log("new item");
        addItem();
      }
    });
    itemsApp.on("item:created", function (event) {
      console.log("item:created", event);
    });
    itemsApp.on("item:edited", function (event) {
      console.log("item:edited", event);
    });
  };

  const addItem = () => {
    if (itemsApp) {
      itemsApp.addItem(refrenceId);
    }
  };

  const setItemJson = () => {
    if (itemsApp) {
      itemsApp.setItemJson({
        item: {
          reference: refrenceId,
          title: "example-title",
          definition: {
            widgets: [
              {
                reference: "example-widget-ref1",
              },
            ],
          },
        },
        questions: [
          {
            reference: "example-widget-ref1",
            options: [
              {
                label: "[Choice A]",
                value: "0",
              },
              {
                label: "[Choice B]",
                value: "1",
              },
              {
                label: "[Choice C]",
                value: "2",
              },
              {
                label: "[Choice D]",
                value: "3",
              },
            ],
            widget_type: "response",
            data: {
              stimulus: "<p>[This is multiple choice]</p>",
              type: "mcq",
            },
            type: "mcq",
          },
        ],
      });
    }
  };

  const destroyItemsApp = () => {
    if (itemsApp) {
      itemsApp.destroy();
      itemsApp = null;
    }
  };
  const saveItemsApp = () => {
    if (itemsApp) {
      itemsApp.save();
    }
  };
  function setWidget(widgetJson, widgetTemplate) {
    return itemsApp.setWidget(
      {
        options: [
          {
            label: "[Choice A]",
            value: "0",
          },
          {
            label: "[Choice B]",
            value: "1",
          },
          {
            label: "[Choice C]",
            value: "2",
          },
          {
            label: "[Choice D]",
            value: "3",
          },
        ],
        stimulus: "<p>[This is the stem.]</p>",
        type: "mcq",
        ui_style: {},
        validation: {
          scoring_type: "exactMatch",
          valid_response: {
            score: 1,
            value: [""],
          },
        },
      },
      {
        template_reference: "908de244-5c71-4c09-b094-7fb49554f2f9",
      }
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <h1>Multiple Choice Quiz</h1>
          <button onClick={() => customApp(response)}>Create</button>
          <button onClick={() => addItem()}>Add Item</button>
          <button onClick={() => setWidget()}>Set Widget</button>

          <button onClick={() => setItemJson()}>Set Item Json</button>
          <button onClick={() => saveItemsApp()}>Save</button>
          <button onClick={() => destroyItemsApp()}>Destroy</button>

          <div style={{ display: "none", visibility: "hidden" }}>
            <div
              id="my-custom-container"
              style={{ display: "none", visibility: "hidden" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default MultipleChoice;
