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

  const status = useScript("https://authorapi.learnosity.com/?v2022.2.LTS");
  const domain = "localhost";
  const user_id = uuid.v4();
  const session_id = uuid.v4();

  const [request, setRequest] = useState({});

  useEffect(() => {
    const learnositySdk = new Learnosity(); // Instantiate the SDK
    const req = learnositySdk.init(
      "items", // Select Items API
      // Consumer key and consumer secret are the public & private security keys required to access Learnosity APIs and data. These keys grant access to Learnosity's public demos account. Learnosity will provide keys for your own account.
      {
        consumer_key: config.consumerKey, // Load key from config.js
        domain: domain, // Set the domain (from line 20)
      },
      config.consumerSecret, // Load secret from config.js
      {
        mode: "item_list",
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
        user: {
          id: "demos-site",
          firstname: "Demos",
          lastname: "User",
          email: "demos@learnosity.com",
        },
      }
    );

    setRequest(req);
  }, []); // Run this only once when the component mounts

  const [itemsApp, setItemsApp] = useState({});
  useEffect(() => {
    if (status === "ready") {
      setItemsApp(() =>
        LearnosityAuthor.init(request, {
          readyListener() {
            console.log(itemsApp);

            console.log("ready");
          },
          errorListener(err) {
            console.log("error", err);
          },
        })
      );
    }
  }, [status]);
  const [data, newData] = useState(null);

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

export default QuizMain;
