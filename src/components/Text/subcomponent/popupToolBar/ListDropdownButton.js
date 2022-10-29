import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";

import { useQuill, useFormat } from "../../Provider";

import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";

import styled from "@emotion/styled";

const StyleCard = styled(Card)(({ show, isInfoBox, isVideo }) => ({
  position: "absolute",
  zIndex: 25,
  left: isInfoBox ? "76.5px" : isVideo ? "74px" : "105px",
  bottom: "-32.5px",
  padding: "3px",
  display: show ? "block" : "none",
  ".ql-active": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    svg: { ".svg-fill": { fill: "#1565c0" } },
  },
}));

const ListDropdownButton = ({ isInfoBox, show, onKeyDropDown, isVideo }) => {
  const quill = useQuill();
  const format = useFormat();

  const [activeDropDownList, setActiveDropDownList] = useState("");

  useEffect(() => {
    format?.list
      ? setActiveDropDownList(format.list)
      : setActiveDropDownList("");
  }, [format]);
  return (
    <>
      <StyleCard
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        onKeyDown={onKeyDropDown}
      >
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
              activeDropDownList === "bullet"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="bullet"
            onClick={() => {
              if (activeDropDownList === "bullet") {
                setActiveDropDownList("");
                quill.format("list", false);
              } else {
                setActiveDropDownList("bullet");
                quill.format("list", "bullet");
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
              activeDropDownList === "ordered"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="ordered"
            onClick={() => {
              if (activeDropDownList === "ordered") {
                setActiveDropDownList("");
                quill.format("list", false);
              } else {
                setActiveDropDownList("ordered");
                quill.format("list", "ordered");
              }
            }}
          >
            {icons["ordered"]}
          </button>
        </Tooltip>
      </StyleCard>
    </>
  );
};

export default ListDropdownButton;
