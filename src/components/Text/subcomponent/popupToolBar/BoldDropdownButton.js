import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToolBarDropDowns } from "../CustomToolBar";

const BoldDropdownButton = (props) => {
  const [activeDropDownItem, setActiveDropDownItem] =
    useContext(ToolBarDropDowns);

  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          position: "absolute",
          zIndex: "25",
          bottom: "-32px",
          padding: "3px",
          width: "180px",
        }}
        className="dropdown-content"
      >
        <button
          aria-label="bold"
          className="ql-bold"
          onClick={() => {
            if (activeDropDownItem === "bold") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("bold");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "bold" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="italic"
          className="ql-italic"
          onClick={() => {
            if (activeDropDownItem === "italic") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("italic");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "italic" ? "rgb(226, 236, 245)" : "",
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-italic" />
        </button>
        <button
          aria-label="underline"
          className="ql-underline"
          onClick={() => {
            if (activeDropDownItem === "underline") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("underline");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "underline" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="strike"
          className="ql-strike"
          onClick={() => {
            if (activeDropDownItem === "strike") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("strike");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "strike" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="super script"
          className="ql-script"
          value="super"
          onClick={() => {
            if (activeDropDownItem === "super") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("super");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "super" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="sub script"
          className="ql-script"
          value="sub"
          onClick={() => {
            if (activeDropDownItem === "sub") {
              setActiveDropDownItem("");
            } else {
              setActiveDropDownItem("sub");
            }
          }}
          style={{
            backgroundColor:
              activeDropDownItem === "sub" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
