import React, { useState, useEffect, useContext, useRef } from "react";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import "../../styles/Toolbar.scss";

import { MathKeyboard, MathDraw, MathImageUpload } from "../../assets/icons";

import { useSetShowMath, useShowMath } from "../../Provider";

const MathDropdownButton = ({
  show,
  setActiveDropDownItem,
  activeDropDownItem,
}) => {
  const setShowMath = useSetShowMath();
  const showMath = useShowMath();

  return (
    <>
      <Card
        show={show}
        className="StyledCard"
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": "45px",
          "--width": "112px",
        }}
        // onKeyDown={onKeyDropDown}
      >
        <Tooltip
          aria-label="draw equation"
          title="draw equation"
          placement="top"
          arrow
        >
          <button
            aria-label="draw equation"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "mathDraw"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "mathDraw"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
            onClick={() => {
              setActiveDropDownItem("mathDraw");
            }}
            value="mathDraw"
          >
            {MathDraw}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="image conversion"
          title="image conversion"
          placement="top"
          arrow
        >
          <button
            aria-label="image conversion"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "imageConversion"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "imageConversion"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
            onClick={() => {
              setActiveDropDownItem("imageConversion");
            }}
            value="imageConversion"
          >
            {MathImageUpload}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="equation keyboard"
          title="equation keyboard"
          placement="top"
          arrow
        >
          <button
            aria-label="equation keyboard"
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem === "equationKeyboard"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "equationKeyboard"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
            onClick={() => {
              if (activeDropDownItem === "equationKeyboard" && showMath) {
                setActiveDropDownItem("");
                setShowMath(false);
              } else {
                setActiveDropDownItem("equationKeyboard");
                setShowMath(true);
              }
            }}
            value="equationKeyboard"
          >
            {MathKeyboard}
          </button>
        </Tooltip>
      </Card>
    </>
  );
};

export default MathDropdownButton;
