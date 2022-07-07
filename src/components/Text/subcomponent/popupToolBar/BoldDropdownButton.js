import React, { useState, useContext } from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToolBarDropDowns } from "../CustomToolBar";

const BoldDropdownButton = ({ show }) => {
  const [activeDropdownItem, setactiveDropdownItem] =
    useContext(ToolBarDropDowns);

  const [activeInlineOptions, setActiveInlineOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
  });

  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <button
          aria-label="bold"
          className={
            activeDropdownItem === "bold" ? "ql-bold inline-active" : "ql-bold"
          }
          onClick={() => {
            if (activeDropdownItem === "bold") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("bold");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "bold" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="italic"
          className="ql-italic"
          onClick={() => {
            if (activeDropdownItem === "italic") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("italic");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "italic" ? "rgb(226, 236, 245)" : "",
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-italic" />
        </button>
        <button
          aria-label="underline"
          className="ql-underline"
          onClick={() => {
            if (activeDropdownItem === "underline") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("underline");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "underline" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="strike"
          className="ql-strike"
          onClick={() => {
            if (activeDropdownItem === "strike") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("strike");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "strike" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="super script"
          className="ql-script"
          value="super"
          onClick={() => {
            if (activeDropdownItem === "super") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("super");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "super" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
        <button
          aria-label="sub script"
          className="ql-script"
          value="sub"
          onClick={() => {
            if (activeDropdownItem === "sub") {
              setactiveDropdownItem("");
            } else {
              setactiveDropdownItem("sub");
            }
          }}
          style={{
            backgroundColor:
              activeDropdownItem === "sub" ? "rgb(226, 236, 245)" : "",
          }}
        ></button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
