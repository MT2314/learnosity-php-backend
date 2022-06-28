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
        }}
        className="dropdown-content"
      >
        <button alt="bold" className="ql-bold">
          <span className="sr-only">bold</span>
        </button>
        <button alt="italic" className="ql-italic">
          <span className="sr-only">italic</span>
        </button>
        <button alt="underline" className="ql-underline">
          <span className="sr-only">underline</span>
        </button>
        <button alt="strike" className="ql-strike">
          <span className="sr-only">strike thru</span>
        </button>
        <button alt="super script" className="ql-script" value="super">
          <span className="sr-only">super script</span>
        </button>
        <button alt="sub script" className="ql-script" value="sub">
          <span className="sr-only">sub script</span>
        </button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
