import React, { useState, useEffect, useContext, useRef } from "react";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import "../../styles/Toolbar.scss";

import { MathKeyboard, MathDraw, MathImageUpload } from "../../assets/icons";

import { useSetShowMath, useShowMath, useSetMathpixOption } from "../../Provider";

const MathDropdownButton = ({
  show,
  setActiveDropDownItem,
  activeDropDownItem,
}) => {
  const setShowMath = useSetShowMath();
  const showMath = useShowMath();
  const setMathpixOption = useSetMathpixOption()
  const [ariaLive, setAriaLive] = useState("");
  const [ariaLive2, setAriaLive2] = useState("");
  // Aria Live Handler
  const handleAriaLive = (value) => {
    if (ariaLive === value) {
      setAriaLive("");
      setAriaLive2(value);
    } else {
      setAriaLive2("");
      setAriaLive(value);
    }
  };

  useEffect(()=> {
    setMathpixOption(activeDropDownItem)
  }, [activeDropDownItem])

  return (
    <>
      <Card
        show={show}
        className="StyledCard"
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": "45px",
          "--width": "112px",
          "--box-shadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      // onKeyDown={onKeyDropDown}
      >
        {/* Aria Live */}
        <span
          className="sr-only"
          role="status"
          aria-live="assertive"
          aria-relevant="all"
          aria-atomic="true"
        >
          {ariaLive}
        </span>
        <span
          className="sr-only"
          role="status"
          aria-live="assertive"
          aria-relevant="all"
          aria-atomic="true"
        >
          {ariaLive2}
        </span>
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
              if (activeDropDownItem === "mathDraw" && showMath) {
                setActiveDropDownItem("");
                setShowMath(false);
              } else {
                setActiveDropDownItem("mathDraw");
                setShowMath(true);
              }
              handleAriaLive("mathDraw keyboard is now open.");
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
              handleAriaLive("Math equation keyboard is now open.");
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
