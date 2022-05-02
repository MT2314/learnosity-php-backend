import React, { useEffect} from "react";
import ReactDOM from "react-dom";
import Callout from "./components/Callout/Callout.js";
import QuoteBox from "./components/QuoteBox/QuoteBox.js";
import Header from "./components/Header";
import Image from "./components/Image/Image";
import ImageConfig from "./components/Image/ImageConfig";
import FormattedText from "./components/FormattedText";
import ImageProvider from "./components/Image/ImageProvider";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css"; 


const App = () => {

  const OurFallbackComponent = ({ error, componentStack, resetErrorBoundary }) => {
    return (
      <div>
        <h1>An error occurred: {error.message}</h1>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  console.log("15.0.1")

  return (
    <>
      <Header title="component-library" backgroundColor="lightslategray" />
      <div className="container" style={{ display: "flex", minWidth: "1100px"}}>
        <div className="canvas" style={{ border: "2px solid black", minWidth: "650px" }}>
          <ErrorBoundary
            FallbackComponent={OurFallbackComponent}><Callout /></ErrorBoundary>
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
