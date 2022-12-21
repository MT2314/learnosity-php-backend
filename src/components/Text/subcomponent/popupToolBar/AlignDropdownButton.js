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
        className="StyledCard"
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": isInfoBox ? "185.5px" : isVideo ? "244px" : "69px",
          "--width": "112px",
          "--box-shadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        onKeyDown={onKeyDropDown}
      >
        <Tooltip
          aria-label="align left"
          title="align left"
          placement="top"
          arrow
        >
          <button
            aria-label="align left"
            onClick={() => {
              setActiveDropDownItem("left");
              setVisibleAlignIcon(icons["align"]);
              quill.format("align", false);
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "left"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "left"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
            value=""
          >
            {icons["align"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="align center"
          title="align center"
          placement="top"
          arrow
        >
          <button
            aria-label="align center"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "center"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "center"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
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
            aria-label="align right"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "right"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "right"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
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
      </Card>
    </>
  );
};

export default AlignDropdownButton;
