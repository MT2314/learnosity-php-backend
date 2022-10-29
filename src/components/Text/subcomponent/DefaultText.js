import React from "react";
import "../styles/Text.scss";

const DefaultText = ({ portal }) => (
  <>
    {portal ? (
      <div>{portal?.placeholder}</div>
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
