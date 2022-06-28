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
          left: "103px",
          zIndex: "25",
        }}
        className="dropdown-content"
      >
        <span className="ql-formats" style={{ marginRight: "0px" }}>
          <button alt="left align" className="ql-align">
            left align
          </button>
          <button alt="align center" className="ql-align" value="center">
            <span className="sr-only">center align</span>
          </button>
          <button alt="right align" className="ql-align" value="right">
            <span className="sr-only">right align</span>
          </button>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
