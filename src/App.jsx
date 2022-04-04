import React from "react";
import ReactDOM from "react-dom";
import TextEditable from "./TextEditable/TextEditable";
import QuoteBox from "./QuoteBox/QuoteBox.js";
import Callout from "./Callout/Callout.js";
import Header from "./Header"
import Image from './Image/Image';
import ImageConfig from "./Image/ImageConfig";
import { ImageProvider } from "./Image/ImageProvider";

import "./index.css";

const App = () => (
  <>
  <Header 
    title="component-library"
    backgroundColor="salmon"
  />
  <div className="container" style={{display:"flex"}}>
    <div className="canvas" style={{border: "2px solid black"}}>
      <Callout />
      {/* <QuoteBox /> */}
      <Image /> 
    </div>
    <div className="editPanel" style={{border:"2px solid black", marginLeft: "1em", padding: "10px" }}>
      {/* <Image /> */}
      <ImageConfig /> 
    </div>
  </div>
  </>
);
ReactDOM.render(
  <ImageProvider>
    <App />
  </ImageProvider>,
  document.getElementById("app")
);
