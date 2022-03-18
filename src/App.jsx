import React from "react";
import ReactDOM from "react-dom";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import Callout from "./Callout/Callout.js";

import "./index.css";

const App = () => (
  <div className="container">
      <TextEditable />
      <QuoteBox />
      <Callout />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
