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
          "--left": isInfoBox ? "220px" : isVideo ? "278px" : "102px",
          "--width": "78px",
          "--box-shadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Tooltip aria-label="bullets" title="bullets" placement="top" arrow>
          <button
            aria-label="bullet list"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownList === "bullet"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownList == "bullet"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
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
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownList === "ordered"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownList == "ordered"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
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
