import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import { Editor } from "@craftjs/core";

import "./index.css";

const App = () => (
  <div className="container">
    <Editor>
      <Image />
      <TextEditable />
      <QuoteBox />
    </Editor>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
