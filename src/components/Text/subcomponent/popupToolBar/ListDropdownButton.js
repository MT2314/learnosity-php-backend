import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";

import { useQuill, useFormat } from "../../Provider";

import icons from "../../assets/icons";
import "../../styles/Toolbar.scss";

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
      <Card
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        onKeyDown={onKeyDropDown}
        className={`StyledCard`}
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": isInfoBox ? "73.5px" : isVideo ? "73px" : "102px",
          "--width": "78px",
        }}
      >
        <Tooltip aria-label="bullets" title="bullets" placement="top" arrow>
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

        <Tooltip aria-label="numbering" title="numbering" placement="top" arrow>
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
      </Card>
    </>
  );
};

export default ListDropdownButton;
