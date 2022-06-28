import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

const BoldDropdownButton = (props) => {
  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          position: "absolute",
          zIndex: "25",
          bottom: '-20px'
        }}
        className="dropdown-content"
      >
        <button aria-label="bold" className="ql-bold"></button>
        <button aria-label="italic" className="ql-italic"></button>
        <button aria-label="underline" className="ql-underline"></button>
        <button aria-label="strike" className="ql-strike"></button>
        <button
          aria-label="super script"
          className="ql-script"
          value="super"
        ></button>
        <button
          aria-label="sub script"
          className="ql-script"
          value="sub"
        ></button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
