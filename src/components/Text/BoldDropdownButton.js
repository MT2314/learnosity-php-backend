import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

const BoldDropdownButton = (props) => {
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
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
      </Card>
    </>
  );
};

export default BoldDropdownButton;
