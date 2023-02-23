import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useScript from "../../Utility/useScript";
import { v4 as uuidv4 } from "uuid";

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

  // Multiple Choice state
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

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

  const customApp = (response) => {
    itemsApp = LearnosityAuthor.init(response, "my-custom-container", {
      readyListener: function (e) {
        console.log("Items API initialization completed successfully");
      },
    });
    itemsApp.on("ready", function (e) {
      itemsApp.createItem(refrenceId);
    });

    itemsApp.on("navigate", function (event) {
      console.log("navigate", event);
      var itemRef;
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
                reference: refrenceId,
              },
            ],
          },
        },
        questions: [
          {
            reference: refrenceId,
            widget_type: "response",
            data: {
              options: [
                {
                  label: [options[0]],
                  value: "0",
                },
                {
                  label: [options[1]],
                  value: "1",
                },
                {
                  label: [options[2]],
                  value: "2",
                },
                {
                  label: [options[3]],
                  value: "3",
                },
              ],
              stimulus: "What is the best authoring application _____?",
              type: "mcq",
              validation: {
                scoring_type: "exactMatch",
                valid_response: {
                  score: 1,
                  value: [correctAnswer],
                },
              },
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
            value: [correctAnswer],
          },
        },
      },
      {
        template_reference: "9e8149bd-e4d8-4dd6-a751-1a113a4b9163",
      }
    );
  }

  // Multiple choice functions
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="mc-container">
      <div className="row">
        <h1>Multiple Choice</h1>
        <button onClick={() => customApp(response)}>Create</button>
        <button onClick={() => addItem()}>Add Item</button>
        <button onClick={() => setWidget()}>Set Widget</button>

        <button onClick={() => setItemJson()}>Set Item Json</button>
        <button onClick={() => saveItemsApp()}>Save</button>
        <button onClick={() => destroyItemsApp()}>Destroy</button>
      </div>
      <div className="multiple-choice-container">
        <div className="multiple-choice-custom">
          <form onSubmit={handleSubmit}>
            <div className="mc-question">
              <label>
                Question:
                <input
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                />
              </label>
            </div>
            {options.map((option, index) => (
              <label key={index}>
                Option {index + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, event.target.value)
                  }
                />
              </label>
            ))}

            <br />

            <button type="button" onClick={addOption}>
              Add Option
            </button>
            <br />
            <label>
              Correct Answer:
              <select
                value={correctAnswer}
                onChange={handleCorrectAnswerChange}
              >
                <option value="" disabled>
                  Select Correct Answer
                </option>
                {options.map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="submit-button"
              onClick={() => console.log(question, options, correctAnswer)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: "none", visibility: "hidden" }}>
        <div
          id="my-custom-container"
          style={{ display: "none", visibility: "hidden" }}
        ></div>
      </div>
    </div>
  );
};

export default Image;
