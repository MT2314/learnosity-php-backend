import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import Callout from "./Callout/Callout.js";
import CalloutSC from "./CalloutSC/CalloutSC.js";
import Header from "./Header"

import "./index.css";

const App = () => (
  <>
  <Header 
    title="component-library"
    backgroundColor="salmon"
  />
  <div className="container">
      <TextEditable />
      <Callout />
      <QuoteBox />
      <CalloutSC />
  </div>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
