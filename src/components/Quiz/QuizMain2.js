import React, { useState, useEffect } from "react";
import useScript from "../../Utility/useScript";
import { v4 as uuid } from "uuid";

const Learnosity = require("./Utils/Learnosity.js");

import "./assets/style.css";

const QuizMain = () => {
  const config = {
    consumerKey: "yis0TYCu7U9V4o7M",
    consumerSecret: "74c5fd430cf1242a527f6223aebd42d30464be22",
  };

  const status = useScript("https://items-va.learnosity.com/?v2022.2.LTS");
  const domain = "localhost";
  const user_id = uuid.v4();
  const session_id = uuid.v4();

  const learnositySdk = new Learnosity(); // Instantiate the SDK
  // Items API configuration parameters.
  // const request = learnositySdk.init(
  //   "items", // Select Items API
  //   // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
  //   {
  //     consumer_key: config.consumerKey, // Load key from config.js
  //     domain: domain, // Set the domain (from line 20)
  //   },
  //   config.consumerSecret, // Load secret from config.js
  //   {
  //     // Unique student identifier, a UUID generated on line 18.
  //     user_id: user_id,
  //     // A reference of the Activity to retrieve from the Item bank, defining which Items will be served in this assessment.
  //     activity_template_id: "quickstart_examples_activity_template_001",
  //     // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
  //     // Uniquely identifies this specific assessment attempt session for  save/resume, data retrieval and reporting purposes. A UUID generated on line 18.
  //     session_id: session_id,
  //     // Used in data retrieval and reporting to compare results with other users submitting the same assessment.
  //     activity_id: "quickstart_examples_activity_001",
  //     // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
  //     rendering_type: "assess",
  //     // Selects the context for the student response storage `submit_practice` mode means student response storage in the Learnosity cloud, for grading.
  //     type: "submit_practice",
  //     // Human-friendly display name to be shown in reporting.
  //     name: "Items API Quickstart",
  //     // Can be set to `initial, `resume` or `review`. Optional. Default = `initial`.
  //     state: "initial",
  //   }
  // );
  console.log(learnositySdk);

  // useEffect(() => {
  //   if (status === "ready") {
  //     // const req = JSON.stringify(request);
  //     // console.log(Learnosity);
  //     const request = learnositySdk.init(
  //       "items", // Select Items API
  //       // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
  //       {
  //         consumer_key: config.consumerKey, // Load key from config.js
  //         domain: domain, // Set the domain (from line 20)
  //       },
  //       config.consumerSecret, // Load secret from config.js
  //       {
  //         // Unique student identifier, a UUID generated on line 18.
  //         user_id: user_id,
  //         // A reference of the Activity to retrieve from the Item bank, defining which Items will be served in this assessment.
  //         activity_template_id: "quickstart_examples_activity_template_001",
  //         // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
  //         // Uniquely identifies this specific assessment attempt session for  save/resume, data retrieval and reporting purposes. A UUID generated on line 18.
  //         session_id: session_id,
  //         // Used in data retrieval and reporting to compare results with other users submitting the same assessment.
  //         activity_id: "quickstart_examples_activity_001",
  //         // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
  //         rendering_type: "assess",
  //         // Selects the context for the student response storage `submit_practice` mode means student response storage in the Learnosity cloud, for grading.
  //         type: "submit_practice",
  //         // Human-friendly display name to be shown in reporting.
  //         name: "Items API Quickstart",
  //         // Can be set to `initial, `resume` or `review`. Optional. Default = `initial`.
  //         state: "initial",
  //       }
  //     );
  //     const req = JSON.stringify(request);
  //     const itemsApp = LearnosityItems.init(req, {
  //       readyListener() {
  //         console.log("ready");
  //       },
  //       errorListener(err) {
  //         console.log("error", err);
  //       },
  //     });
  //     var activity = itemsApp.getActivity();
  //     console.log(activity);
  //   }
  // }, [status]);
  useEffect(() => {
    if (status === "ready") {
      // Make the API request and get the response
      const request = learnositySdk.init(
        "items", // Select Items API
        // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
        {
          consumer_key: config.consumerKey, // Load key from config.js
          domain: domain, // Set the domain (from line 20)
        },
        config.consumerSecret, // Load secret from config.js
        {
          // Unique student identifier, a UUID generated on line 18.
          user_id: user_id,
          // A reference of the Activity to retrieve from the Item bank, defining which Items will be served in this assessment.
          activity_template_id: "quickstart_examples_activity_template_001",
          // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
          // Uniquely identifies this specific assessment attempt session for  save/resume, data retrieval and reporting purposes. A UUID generated on line 18.
          session_id: session_id,
          // Used in data retrieval and reporting to compare results with other users submitting the same assessment.
          activity_id: "quickstart_examples_activity_001",
          // Selects a rendering mode, `assess` type is a "standalone" mode (loading a complete assessment player for navigation, VS `inline`, for embedded).
          rendering_type: "assess",
          // Selects the context for the student response storage `submit_practice` mode means student response storage in the Learnosity cloud, for grading.
          type: "submit_practice",
          // Human-friendly display name to be shown in reporting.
          name: "Items API Quickstart",
          // Can be set to `initial, `resume` or `review`. Optional. Default = `initial`.
          state: "initial",
        }
      );
      const req = JSON.stringify(request);
      const itemsApp = LearnosityItems.init(req, {
        readyListener() {
          console.log("ready");
        },
        errorListener(err) {
          console.log("error", err);
        },
      });
      console.log(itemsApp);
      // var activity = itemsApp.getActivity();
      // console.log(activity);
    }
  }, [status]);

  return (
    <div>
      <div>
        Script status: <b>{status}</b>
      </div>
      {status === "ready" && <div id="learnosity_assess"></div>}
    </div>
  );
};
export default QuizMain;

//   const user_id = uuidv4();
//   const session_id = uuidv4();
//   const domain = "localhost";

//   const initializationObject = {
//     // Security
//     consumer_key: "ts34Rdc45SWE34f",
//     signature:
//       "22d26b3b582d5bca19b26784534b338381a0ac1bc737b071a971c5b7d0cf9721",
//     timestamp: "20110918-1820",
//     user_id: "aeee19fb-4e7b-435c-92f9-d93a1099988b",

//     // Mandatory
//     id: "f0001",
//     name: "Intro Activity - French 101",
//     questions: [
//       {
//         response_id: "60005",
//         type: "association",
//         stimulus: "Match the cities to the parent nation.",
//         stimulus_list: ["London", "Dublin", "Paris", "Sydney"],
//         possible_responses: ["Australia", "France", "Ireland", "England"],
//         validation: {
//           valid_responses: [
//             ["England"],
//             ["Ireland"],
//             ["France"],
//             ["Australia"],
//           ],
//         },
//         instant_feedback: true,
//       },
//     ],
//     session_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",

//     // Optional
//     captureOnResumeError: true,
//     math_renderer: "mathquill",
//     prevent_flash: false,
//     render_with_captured_questions: true,
//     renderSaveButton: true,
//     renderSubmitButton: true,
//     show_distractor_rationale: true,
//     state: "initial",
//     type: "submit_practice",
//     validateOnSubmit: true,

//     // These are override parameters. These change the default behaviour of
//     // Questions API. Only use if the specific override behaviour is desired.
//     // "allow_negative_scores": true,
//     // "fontsize": "normal",
//     // "showCorrectAnswers": false,
//     // "showInstructorStimulus": true,
//     // "attribute_overrides": {
//     //      "spellcheck": true,
//     //      "instant_feedback": false
//     // }
//   };

//     if (status === "ready") {
//       window.LearnosityItems.init(request, {
//         readyListener() {
//           console.log("ready");
//         },
//         errorListener(err) {
//           console.log("error", err);
//         },
//       });
//       console.log(window.LearnosityItems);
//     }
