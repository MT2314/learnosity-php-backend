import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

const AlignDropdownButton = (props) => {
  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          position: "absolute",
          left: "94px",
          zIndex: "25",
          bottom: '-20px'
        }}
        className="dropdown-content"
      >
        <span className="ql-formats">
          <button aria-label="left align" className="ql-align"></button>
          <button
            aria-label="align center"
            className="ql-align"
            value="center"
          ></button>
          <button
            aria-label="right align"
            className="ql-align"
            value="right"
          ></button>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
