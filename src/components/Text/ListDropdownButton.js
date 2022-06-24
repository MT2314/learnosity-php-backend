import React from "react";
import "reactjs-popup/dist/index.css";
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
        }}
        className="dropdown-content"
      >
        <button className="ql-list" value="ordered" />
      </Card>
    </>
  );
};

export default ListDropdownButton;
