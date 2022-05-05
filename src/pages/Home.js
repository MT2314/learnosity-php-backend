import React from "react";
import { Link } from "react-router-dom";
import {
  ConfigStateWrapper,
  ComponentSelector,
  Canvas,
} from "../Utility/mockWrapper";
import Header from "../components/Header";
import FormattedText from "../components/FormattedText";

export const Home = () => {
  return (
    <>
      <Header title="component-library" backgroundColor="DarkSlateGray" />
      <div
        className="container"
        style={{ display: "flex", minWidth: "1100px" }}
      >
        <ul>
          <li>
            <Link to="/accessibility-keys">Accessibility Keys Page</Link>
          </li>
        </ul>
        <Canvas unwrappedComponents={[<FormattedText />]} />

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
