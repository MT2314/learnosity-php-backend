import React from "react";
import "../styles/Text.scss";

const DefaultText = ({ portal }) => (
  <>
    {portal?.parentComponent == "video" && portal?.placeholder == "Credit" ? (
      <div style={{ fontSize: "12px" }}>
        <i>{portal?.placeholder}</i>
      </div>
    ) : portal ? (
      <div
        style={{
          fontSize: "12px",
          lineHeight: "19.92px",
          letterSpacing: "0.4px",
        }}
      >
        {portal?.placeholder}
      </div>
    ) : (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    )}
  </>
);

export default DefaultText;
