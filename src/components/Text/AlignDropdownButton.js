import React from "react";
import "reactjs-popup/dist/index.css";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

const AlignDropdownButton = (props) => {
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
        <span className="ql-formats" style={{}}>
          <button className="ql-align" value="right" />
          <button className="ql-align" value="justify" />
          <button className="ql-align" value="left" />
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
