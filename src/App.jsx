import React from "react";
import ReactDOM from "react-dom";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import Callout from "./Callout/Callout.js";
import Header from "./Header"
import Form from "./Form/Form";
import FormOutput from "./Form/FormOutput";
import MfImage from './Image/MfImage';
import MfImageConfig, { ImageWidgetContext } from "./Image/MfImageConfig";
import { WidgetContextProvider } from "./Provider";
import { ImageCC } from "./Image/MfImageConfig";

import "./index.css";

const App = () => (
  <>
  <Header 
    title="component-library"
    backgroundColor="salmon"
  />
  <div className="container" style={{display:"flex"}}>
    <div className="canvas" style={{border: "2px solid black"}}>
      {/* <TextEditable /> */}
      <Callout />
      {/* <QuoteBox /> */}
      {/* <CalloutSC /> */}
      {/* <FormOutput /> */}
      <MfImage /> 
    </div>
    <div className="editPanel" style={{border:"2px solid black", marginLeft: "1em", padding: "10px" }}>
      {/* <Form /> */}
      {/* <Image /> */}
      <MfImageConfig /> 
    </div>
  </div>
  </>
);
ReactDOM.render(
  <ImageCC>
    <App />
  </ImageCC>,
  document.getElementById("app")
);
