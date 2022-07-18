import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";
import "../../styles/AlignDropdownButton.scss";
import icons from "../../assets/icons";

const AlignDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  setActiveAlignIcon,
}) => {
  return (
    <>
      <Card className={show ? "align-dropdown show" : "align-dropdown hide"}>
        <span className="ql-formats">
          <Tooltip arrow title="align left" placement="top">
            <button
              aria-label="left align"
              onClick={() => {
                if (activeDropDownItem === "left") {
                  setActiveDropDownItem("");
                  setActiveAlignIcon("");
                } else {
                  setActiveDropDownItem("left");
                  setActiveAlignIcon("left");
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
          <Tooltip arrow title="centre text" placement="top">
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
                  setActiveAlignIcon("");
                } else {
                  setActiveDropDownItem("center");
                  setActiveAlignIcon("center");
                }
              }}
            >
              {icons["center"]}
            </button>
          </Tooltip>
          <Tooltip arrow title="align right" placement="top">
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
                  setActiveAlignIcon("");
                } else {
                  setActiveDropDownItem("right");
                  setActiveAlignIcon("right");
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