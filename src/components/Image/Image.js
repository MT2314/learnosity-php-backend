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

const Image = () => {
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
    itemsApp = LearnosityAuthor.init(response, "my-custom-container");
    console.log("itemsApp", itemsApp);
    itemsApp.on("ready", function (e) {
      e.preventDefault();
      itemsApp.createItem(refrenceId);
      // itemsApp.getWidget();
    });

    // itemsApp.editItem(refrenceId);

    //   console.log("ready");
    // });
    itemsApp.on("navigate", function (event) {
      // event.preventDefault();
      console.log("navigate", event);
      var itemRef;
      console.log(itemRef);
      //   if (event.data.route === "items/new") {
      //     myApp.createNewItem();
      //     event.preventDefault();
      //   }
      if (event.data.route === "items/:reference/widgets/new") {
        event.preventDefault();
        console.log("new item");
        addItem();
      }
      // if (event.data.route === "items/:reference") {
      //   // Extract the reference from e.g. "items/example-item-ref"
      //   // event.preventDefault();
      //   itemRef = event.data.location.replace(/^(items\/)/, "");
      //   // itemsApp.editItem(itemRef, true);
      //   console.log("itemRef", itemRef);
      //   console.log("navigate", event);
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
  const editItem = () => {
    if (itemsApp) {
      itemsApp.editItem(refrenceId);
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
            widget_type: "response",
            data: {
              stimulus: "short text",
              type: "shorttext",
            },
            type: "shorttext",
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
  const createMCItem = () => {
    itemsApp.createItem(refrenceId);
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
          <h1>Standalone Assessment Example1</h1>
          {/* <button onClick={createMCItem}>Create MC</button> */}
          {/* <button onClick={destroyItemsApp}>Destroy</button> */}
          <button onClick={() => customApp(response)}>Create</button>
          <button onClick={() => destroyItemsApp()}>SetJSON</button>
          <button onClick={() => editItem()}>Edit Item</button>
          <button onClick={() => addItem()}>Add Item</button>
          <button onClick={() => setWidget()}>Set widget Item</button>

          <button onClick={() => setItemJson()}>setItemJson</button>
          <button onClick={() => saveItemsApp()}>Save</button>
          <button onClick={() => destroyItemsApp()}>Destroy</button>
          <div id="my-custom-container">
            {/* <div className="container col-12">
              <span data-lrn-qe-layout-widget-title></span>
              <span data-lrn-qe-layout-tile-list></span>
              <span data-lrn-qe-layout-validate-question></span>
              <span data-lrn-qe-layout-live-score></span>
              <div id="container" className="lrn-qe-row-flex">
                <div
                  id="firstElement"
                  className="lrn-qe-col-xs-12 lrn-qe-col-sm-6"
                >
                  <div>First element</div>
                </div>
                <div
                  id="secondElement"
                  className="lrn-qe-col-xs-12 lrn-qe-col-sm-6"
                >
                  <div>Second element</div>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="iau-demo"> */}
          {/* <span className="learnosity-response question-60001"></span> */}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Image;
