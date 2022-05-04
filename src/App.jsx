import React from "react";
import ReactDOM from "react-dom";
import { WidgetContextProvider, ConfigStateWrapper, ComponentSelector, Canvas } from "./Utility/mockWrapper"
import Header from "./components/Header";
import FormattedText from "./components/FormattedText";

import "./index.css";

const App = () => {
  console.log("15.0.1");

  return (
    <>
      <WidgetContextProvider>
        <Header title="component-library" backgroundColor="DarkSlateGray" />
        <div className="container" style={{ display: "flex",minWidth: "1100px" }}>
          <Canvas unwrappedComponents={[<FormattedText />]} />

          <div
            className="editPanel"
            style={{
              border: "2px solid black",
              marginLeft: "1em",
              padding: "10px",
              maxWidth: "350px"
            }}
          >
            <ConfigStateWrapper />
          </div>
        </div>
        <ComponentSelector />
      </WidgetContextProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
