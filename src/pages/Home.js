import React from "react";
import {
  ConfigStateWrapper,
  ComponentSelector,
  Canvas,
} from "../Utility/mockWrapper";
import Header from "../components/Header";

export const Home = () => {
  return (
    <>
      <Header title="component-library" backgroundColor="DarkSlateGray" />
      <div
        className="container"
        style={{ display: "flex", minWidth: "1100px" }}
      >
        <Canvas unwrappedComponents={[]} />

        <div
          className="editPanel"
          style={{
            border: "2px solid black",
            marginLeft: "1em",
            padding: "10px",
            maxWidth: "350px",
          }}
        >
          <ConfigStateWrapper />
        </div>
      </div>
      <ComponentSelector />
    </>
  );
};

export default Home;
