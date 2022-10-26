import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";

import "../../styles/AlignDropdownButton.scss";
import icons from "../../assets/icons";

import styled from "@emotion/styled";

const StyleCard = styled(Card)(({ show, isInfoBox, isVideo }) => ({
  position: "absolute",
  left: isInfoBox ? "40.5px" : isVideo ? "40px" : "71px",
  zIndex: 25,
  bottom: "-34px",
  padding: "3px",
  display: show ? "block" : "none",
  ".ql-active": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    svg: { ".svg-fill": { fill: "#1565c0" } },
  },
}));

const AlignDropdownButton = ({
  isInfoBox,
  isVideo,
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  setVisibleAlignIcon,
  onKeyDropDown,
  activeDirection,
}) => {
  return (
    <>
      <StyleCard
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        onKeyDown={onKeyDropDown}
      >
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
                setActiveDropDownItem("left");
                setVisibleAlignIcon(icons["align"]);
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
            aria-label="centre text"
            title="centre text"
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
                if (
                  activeDropDownItem === "center" ||
                  activeDirection !== "center"
                ) {
                  setActiveDropDownItem("left");
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
                if (
                  activeDropDownItem === "right" ||
                  activeDirection !== "right"
                ) {
                  setActiveDropDownItem("left");
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
      </StyleCard>
    </>
  );
};

export default AlignDropdownButton;
