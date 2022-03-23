import React from "react";
import ReactDOM from "react-dom";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox";
import Callout from "./Callout/Callout";
import Header from "./Header"
import { Form, FormOutput } from "./Form/Form";

import "./index.css";

const App = () => (
  <>
  <Header 
    title="component-library"
    backgroundColor="salmon"
  />
  <div className="container" style={{display:"flex"}}>
    <div className="canvas" style={{border: "2px solid black"}}>
      <TextEditable />
      <QuoteBox />
      <Callout />
      <FormOutput />
    </div>
    <div className="editPanel" style={{border:"2px solid black", marginLeft: "2em" }}>
      <Form />
    </div>
  </div>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
