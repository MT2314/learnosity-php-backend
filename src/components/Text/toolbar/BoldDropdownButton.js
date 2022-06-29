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
          bottom: "-32px",
          padding: "3px",
          width: "180px",
        }}
        className="dropdown-content"
      >
        <button aria-label="bold" className="ql-bold">
          {/* <img
          src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/bold.svg"
          alt="font formatting dropdown menu"
          
        /> */}
        </button>
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
