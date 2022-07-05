import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";

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
        <Tooltip title="bullets" placement="top">
          <button
            aria-label="bullet list"
            className="ql-list"
            value="bullet"
            onClick={() => {
              if (activeDropDownItem === "bullet") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("bullet");
              }
            }}
            style={{
              backgroundColor:
                activeDropDownItem === "bullet" ? "rgb(226, 236, 245)" : "",
            }}
          ></button>
        </Tooltip>
        <Tooltip title="numbering" placement="top">
          <button
            aria-label="numbered list"
            className="ql-list"
            value="ordered"
            onClick={() => {
              if (activeDropDownItem === "ordered") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("ordered");
              }
            }}
            style={{
              backgroundColor:
                activeDropDownItem === "ordered" ? "rgb(226, 236, 245)" : "",
            }}
          ></button>
        </Tooltip>
      </Card>
    </>
  );
};

export default ListDropdownButton;
