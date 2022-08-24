import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";

import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";

const ListDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  onKeyDropDown,
}) => {
  return (
    <>
      <Card className={show ? "list-dropdown show" : "list-dropdown hide"} onKeyDown={onKeyDropDown}>
        <Tooltip
          aria-label="bullets"
          title="bullets"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
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

        <Tooltip
          aria-label="numbering"
          title="numbering"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
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
