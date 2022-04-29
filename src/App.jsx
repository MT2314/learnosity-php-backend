import React, { useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Callout, { defaultProps as calloutDefaultProps } from "./components/Callout/Callout.js";
import Header from "./components/Header";
import Image from "./components/Image/Image";
import ImageConfig from "./components/Image/ImageConfig";
import FormattedText from "./components/FormattedText";
import ImageProvider from "./components/Image/ImageProvider";

import "./index.css";

// Simulating for testing environment how it'll behave when saved/loaded in CraftJS
// In CraftJS it'll pass in the setter, and store the state associated with a UUID in a single object
// Edit the initial state to test how a component will respond to being loaded with a value from the DB
const MockCanvasContainer = ({ Component }) => {
  const componentTypeProps = {
    Callout: calloutDefaultProps,
  };

  if (!Component) throw new Error(`MockCanvasContainer called in testing environment without component property`);

  // component.name is the name of the function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
  const defaultComponentProps = componentTypeProps[Component.name];
  if (!defaultComponentProps)
    throw new Error(`Testing environment function doesn't have default props set for ${Component.name} component`);

  const [state, setState] = useState({ ...defaultComponentProps });

  return (
    <Component
      {...state}
      setProp={(stateUpdate) => {
        console.log(`State update for ${Component.name}`, stateUpdate);
        setState({ ...state, ...stateUpdate });
      }}
      uuid={`${Math.floor(Math.random() * 10000)}`}
    />
  );
};

// Mocking a shared context living within CraftJS
const WidgetContext = createContext();

// For testing, mocking a canvas added from CraftJS
const mockedSavedCanvas = [
  {
    Component: Callout,
    heading: "Juno is best dog",
    body: "In this essay, we explore why Golden Retrievers and in particular Juno are superb.  Please see https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg",
    calloutType: "",
  },
  { Component: Callout, heading: "saved heading", body: "", calloutType: "" },
  { Component: Callout, heading: "", body: "", calloutType: "" },
  { Component: Callout, heading: "", body: "saved body", calloutType: "" },
  { Component: Callout, heading: "", body: "", calloutType: "" },
];

const WidgetContextProvider = ({ children }) => {
  const [widgetState, setWidgetState] = useState({ selectedUUID: null });

  const handleChange = (newState) => {
    console.log(`Updating state`, widgetState, newState);
    setWidgetState({ ...widgetState, ...newState });
  };

  return <WidgetContext.Provider value={[widgetState, handleChange]}>{children}</WidgetContext.Provider>;
};

const StateConsumingComponentWrapper = ({ Component, uuid, ...componentProps }) => {
  const [state, setState] = useContext(WidgetContext);

  const handleChange = (stateUpdate) => {
    setState({ [uuid]: { ...(state[uuid] || {}), ...stateUpdate } });
  };

  if (!Component)
    throw new Error(`StateConsumingComponentWrapper called in testing environment without component property`);

  useEffect(() => {
    handleChange({ ...componentProps });
  }, []);

  const componentState = state[uuid] || componentProps;

  return <Component uuid={uuid} setProp={handleChange} {...componentState} />;
};

const App = () => {
  console.log("15.0.1");
  return (
    <>
      <WidgetContextProvider>
        <Header title="component-library" backgroundColor="salmon" />
        <div className="container" style={{ display: "flex" }}>
          <div className="canvas" style={{ border: "2px solid black" }}>
            <MockCanvasContainer Component={Callout} />
            <Image />
            <FormattedText />
            {mockedSavedCanvas.map(({ Component, ...rest }, index) => (
              <StateConsumingComponentWrapper uuid={index} Component={Component} {...rest} />
            ))}
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
      </WidgetContextProvider>
    </>
  );
};
ReactDOM.render(
  <ImageProvider>
    <App />
  </ImageProvider>,
  document.getElementById("app")
);
