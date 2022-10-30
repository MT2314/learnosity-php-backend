import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import "../../styles/Toolbar.scss";

import { useQuill, useFormat } from "../../Provider";

import icons from "../../assets/icons";

const AlignDropdownButton = ({
  isInfoBox,
  isVideo,
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  setVisibleAlignIcon,
  onKeyDropDown,
}) => {
  const quill = useQuill();
  const format = useFormat();

  useEffect(() => {
    if (format?.align) {
      setActiveDropDownItem(format.align);
      setVisibleAlignIcon(icons[format.align]);
    } else {
      setActiveDropDownItem("left");
      setVisibleAlignIcon(icons["align"]);
    }
  }, [format]);

  return (
    <>
      <Card
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        onKeyDown={onKeyDropDown}
        className="StyledCard"
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": isInfoBox ? "37px" : isVideo ? "61px" : "40.5px",
          "--width": "112px",
        }}
      >
        <span className="ql-formats">
          <Tooltip
            aria-label="align left"
            title="align left"
            placement="top"
            arrow
          >
            <button
              aria-label="left align"
              onClick={() => {
                setActiveDropDownItem("left");
                setVisibleAlignIcon(icons["align"]);
                quill.format("align", false);
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
                  setActiveDropDownItem("left");
                  setVisibleAlignIcon(icons["align"]);
                  quill.format("align", false);
                } else {
                  setActiveDropDownItem("center");
                  setVisibleAlignIcon(icons["center"]);
                  quill.format("align", "center");
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
                  setActiveDropDownItem("left");
                  setVisibleAlignIcon(icons["align"]);
                  quill.format("align", false);
                } else {
                  setActiveDropDownItem("right");
                  setVisibleAlignIcon(icons["right"]);
                  quill.format("align", "right");
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
