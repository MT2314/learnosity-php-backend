import React from "react";
import ReactDOM from "react-dom";
import Callout from "./Callout/Callout.js";
import Header from "./Header";
import Image from "./Image/Image";
import ImageConfig from "./Image/ImageConfig";
import FormattedText from "./FormattedText";
import { ImageProvider } from "./Image/ImageProvider";

import "./index.css";

const App = () => {
  console.log("15.0.1")
  return (
    <>
      <Header title="component-library" backgroundColor="salmon" />
      <div className="container" style={{ display: "flex" }}>
        <div className="canvas" style={{ border: "2px solid black" }}>
          <Image uuid="1" />
          <Callout />
          <Image uuid="2" />
          <FormattedText />
        </div>
        <div
          className="editPanel"
          style={{
            border: "2px solid black",
            marginLeft: "1em",
            padding: "10px",
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
