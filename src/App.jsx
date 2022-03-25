import React from "react";
import ReactDOM from "react-dom";
import QuoteBox from "./QuoteBox/QuoteBox";
import Callout from "./Callout/Callout";
import Header from "./Header"
import Form from "./Form/Form";
import FormOutput from "./Form/FormOutput";
import Image from './Image/Image';
import { WidgetContextProvider } from "./Provider";

import "./index.css";

const App = () => (
  <>
  <Header 
    title="component-library"
    backgroundColor="salmon"
  />
  <div className="container" style={{display:"flex"}}>
    <div className="canvas" style={{border: "2px solid black"}}>
      <QuoteBox />
      <Callout />
      <FormOutput />
    </div>
    <div className="editPanel" style={{border:"2px solid black", marginLeft: "2em" }}>
      <Form />
      {/* <Image /> */}
    </div>
  </div>
  </>
);
ReactDOM.render(
  <WidgetContextProvider>
    <App />
  </WidgetContextProvider>,
  document.getElementById("app")
);
