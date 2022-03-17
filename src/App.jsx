import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import Callout from "./Callout/Callout.js";

import "./index.css";

const App = () => (
  <div className="container">
      <Image />
      <TextEditable />
      <QuoteBox />
      <Callout />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
