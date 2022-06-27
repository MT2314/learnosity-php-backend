import React from "react";
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
        <span className="ql-formats">
          <button className="ql-align"/>
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
