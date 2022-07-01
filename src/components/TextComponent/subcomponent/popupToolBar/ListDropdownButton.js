import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

import { ToolBarDropDowns } from "../CustomToolBar";

const ListDropdownButton = (props) => {
  const [activeDropDownItem, setActiveDropDownItem] =
    useContext(ToolBarDropDowns);
  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          maxWidth: "150px",
          position: "absolute",
          zIndex: "25",
          left: "103px",
          bottom: "-32px",
          padding: "3px",
        }}
        className="dropdown-content"
      >
        <button
          aria-label="bullet list"
          className="ql-list"
          value="bullet"
          onClick={() => setActiveDropDownItem("bullet")}
          style={{
            backgroundColor:
              activeDropDownItem === "bullet" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>

        <button
          aria-label="numbered list"
          className="ql-list"
          value="ordered"
          onClick={() => setActiveDropDownItem("ordered")}
          style={{
            backgroundColor:
              activeDropDownItem === "ordered" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
      </Card>
    </>
  );
};

export default ListDropdownButton;
