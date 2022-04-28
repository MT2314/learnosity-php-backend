import React, { useEffect} from "react";
import ReactDOM from "react-dom";
import Callout from "./Callout/Callout.js";
import Header from "./Header";
import Image from "./Image/Image";
import ImageConfig from "./Image/ImageConfig";
import FormattedText from "./FormattedText";
import { ImageProvider } from "./Image/ImageProvider";

import "./index.css";
import QuoteBox from "./QuoteBox/QuoteBox.js";

 

const App = () => {
  console.log("15.0.1")

  


  return (
    <>
      <Header title="component-library" backgroundColor="salmon" />
      <div className="container" style={{ display: "flex", minWidth: "1100px"}}>
        <div className="canvas" style={{ border: "2px solid black", minWidth: "650px" }}>
          <Callout />
          <QuoteBox />
          <Image />
          <FormattedText />
        </div>
        <div
          className="editPanel"
          style={{
            border: "2px solid black",
            marginLeft: "1em",
            padding: "10px",
            maxWidth: "350px"
          }}
        >
          <ImageConfig />
        </div>
      </div>
    </>
  );
};
ReactDOM.render(
  <ImageProvider>
    <App />
  </ImageProvider>,
  document.getElementById("app")
);
