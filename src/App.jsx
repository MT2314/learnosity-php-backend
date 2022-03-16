import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";

import "./index.css";

const App = () => (
  <div className="container">
    <Image />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
