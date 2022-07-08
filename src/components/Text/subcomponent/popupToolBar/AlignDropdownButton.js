import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import icons from "../../assets/icons";
import { ToolBarDropDowns } from "../CustomToolBar";

const AlignDropdownButton = ({ show, setActiveAlignIcon }) => {
  const [activeDropDownItem, setActiveDropDownItem] =
    useContext(ToolBarDropDowns);

  return (
    <>
      <Card
        style={{
          display: show ? "block" : "none",
          position: "absolute",
          left: "66px",
          zIndex: "25",
          bottom: "-32px",
          padding: "3px",
        }}
        className="align-dropdown"
      >
        <span className="ql-formats">
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
            className="ql-align"
            value=""
            style={{
              backgroundColor:
                activeDropDownItem === "left" ? "rgb(226, 236, 245)" : "",
            }}
          >
            {icons["align"]}
          </button>

          <button
            aria-label="align center"
            className="ql-align"
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
            style={{
              backgroundColor:
                activeDropDownItem === "center" ? "rgb(226, 236, 245)" : "",
            }}
          >
            {icons["center"]}
          </button>
          <button
            aria-label="right align"
            className="ql-align"
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
            style={{
              backgroundColor:
                activeDropDownItem === "right" ? "rgb(226, 236, 245)" : "",
            }}
          >
            {icons["right"]}
          </button>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
