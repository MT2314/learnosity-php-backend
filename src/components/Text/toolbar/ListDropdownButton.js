import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

const ListDropdownButton = (props) => {
  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          maxWidth: "150px",
          position: "absolute",
          zIndex: "25",
          left: "76px",
        }}
        className="dropdown-content"
      >
        <button alt="bullet list" className="ql-list" value="bullet">
          <span className="sr-only">bullet list</span>
        </button>

        <button alt="numbered list" className="ql-list" value="ordered">
          <span className="sr-only">bullet list</span>
        </button>
      </Card>
    </>
  );
};

export default ListDropdownButton;
