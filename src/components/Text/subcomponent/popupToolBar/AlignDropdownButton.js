import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";

import "../../styles/AlignDropdownButton.scss";
import icons from "../../assets/icons";

const AlignDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  setVisibleAlignIcon,
  onKeyDropDown,
}) => {
  return (
    <>
      <Card className={show ? "align-dropdown show" : "align-dropdown hide"} onKeyDown={onKeyDropDown}>
        <span className="ql-formats">
          <Tooltip
            aria-label="align left"
            title="align left"
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
              aria-label="left align"
              onClick={() => {
                if (activeDropDownItem === "left") {
                  setActiveDropDownItem("");
                } else {
                  setActiveDropDownItem("left");
                  setVisibleAlignIcon(icons["align"]);
                }
              }}
              className={
                activeDropDownItem === "left"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value=""
            >
              {icons["align"]}
            </button>
          </Tooltip>
          <Tooltip
            aria-label="center text"
            title="center text"
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
              aria-label="align center"
              className={
                activeDropDownItem === "center"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value="center"
              onClick={() => {
                if (activeDropDownItem === "center") {
                  setActiveDropDownItem("");
                  setVisibleAlignIcon(icons["align"]);
                } else {
                  setActiveDropDownItem("center");
                  setVisibleAlignIcon(icons["center"]);
                }
              }}
            >
              {icons["center"]}
            </button>
          </Tooltip>
          <Tooltip
            aria-label="align right"
            title="align right"
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
              aria-label="right align"
              className={
                activeDropDownItem === "right"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value="right"
              onClick={() => {
                if (activeDropDownItem === "right") {
                  setActiveDropDownItem("");
                  setVisibleAlignIcon(icons["align"]);
                } else {
                  setActiveDropDownItem("right");
                  setVisibleAlignIcon(icons["right"]);
                }
              }}
            >
              {icons["right"]}
            </button>
          </Tooltip>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
