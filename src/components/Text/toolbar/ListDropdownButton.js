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
          left: "76px"
        }}
        className="dropdown-content"
      >
        <button className="ql-list" value="bullet"/>
        <button className="ql-list" value="ordered" />
      </Card>
    </>
  );
};

export default ListDropdownButton;
