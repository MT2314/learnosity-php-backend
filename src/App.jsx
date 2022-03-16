import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import TextEditable from "./TextEditable/TextEditable";

import "./index.css";

const App = () => (
  <div className="container">
    <TextEditable />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
