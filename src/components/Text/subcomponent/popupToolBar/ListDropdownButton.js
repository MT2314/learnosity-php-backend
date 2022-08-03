import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@mui/material";

import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";

const ListDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
}) => {
  return (
    <>
      <Card className={show ? "list-dropdown show" : "list-dropdown hide"}>
        <Tooltip arrow title="bullets" placement="top">
          <button
            aria-label="bullet list"
            className={
              activeDropDownItem === "bullet"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="bullet"
            onClick={() => {
              if (activeDropDownItem === "bullet") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("bullet");
              }
            }}
          >
            {icons["bullet"]}
          </button>
        </Tooltip>

        <Tooltip arrow title="numbering" placement="top">
          <button
            aria-label="numbered list"
            className={
              activeDropDownItem === "ordered"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="ordered"
            onClick={() => {
              if (activeDropDownItem === "ordered") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("ordered");
              }
            }}
          >
            {icons["ordered"]}
          </button>
        </Tooltip>
      </Card>
    </>
  );
};

export default ListDropdownButton;
