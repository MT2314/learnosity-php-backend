import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { ToolBarDropDowns } from "../CustomToolBar";

const BoldDropdownButton = ({ show }) => {
  const [activeInlineOptions, setActiveInlineOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    sub: false,
    superscript: false,
  });

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["bold"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/bold-icon.svg"
      alt="bold"
    />
  );

  icons["italic"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/italic-icon.svg"
      alt="italic"
    />
  );

  const [activeDropdownItem, setActiveDropdownItem] =
    useContext(ToolBarDropDowns);

  console.log(activeInlineOptions);

  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <button
          aria-label="bold"
          className={
            activeInlineOptions.bold === true
              ? "ql-bold inline-active"
              : "ql-bold"
          }
          onClick={() => {
            if (activeDropdownItem === "bold") {
              setActiveDropdownItem("");
              setActiveInlineOptions({ ...activeInlineOptions, bold: false });
            } else {
              setActiveDropdownItem("bold");
              setActiveInlineOptions({ ...activeInlineOptions, bold: true });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
          >
            <path
              d="M9.2 7.26372C10.2377 6.54698 10.9651 5.37023 10.9651 4.27907C10.9651 1.8614 9.09302 0 6.68605 0H0V14.9767H7.53116C9.76698 14.9767 11.5 13.1581 11.5 10.9223C11.5 9.29628 10.58 7.90558 9.2 7.26372ZM3.2093 2.67442H6.4186C7.30651 2.67442 8.02326 3.39116 8.02326 4.27907C8.02326 5.16698 7.30651 5.88372 6.4186 5.88372H3.2093V2.67442ZM6.95349 12.3023H3.2093V9.09302H6.95349C7.8414 9.09302 8.55814 9.80977 8.55814 10.6977C8.55814 11.5856 7.8414 12.3023 6.95349 12.3023Z"
              fill={activeInlineOptions.bold === true ? "#1565C0" : "#232323"}
            />
          </svg>
        </button>
        <button
          aria-label="italic"
          className={
            activeInlineOptions.italic === true
              ? "ql-italic inline-active"
              : "ql-italic"
          }
          onClick={() => {
            if (activeDropdownItem === "italic") {
              setActiveDropdownItem("");
              setActiveInlineOptions({ ...activeInlineOptions, italic: false });
            } else {
              setActiveDropdownItem("italic");
              setActiveInlineOptions({ ...activeInlineOptions, italic: true });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
          >
            <path
              d="M4.5 0V3.375H6.98625L3.13875 12.375H0V15.75H9V12.375H6.51375L10.3612 3.375H13.5V0H4.5Z"
              fill={activeInlineOptions.italic === true ? "#1565C0" : "#232323"}
            />
          </svg>
        </button>
        <button
          aria-label="underline"
          className={
            activeInlineOptions.underline === true
              ? "ql-underline inline-active"
              : "ql-underline"
          }
          onClick={() => {
            if (activeDropdownItem === "underline") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                underline: false,
              });
            } else {
              setActiveDropdownItem("underline");
              setActiveInlineOptions({
                ...activeInlineOptions,
                underline: true,
              });
            }
          }}
        ></button>
        <button
          aria-label="strike"
          className={
            activeInlineOptions.strike === true
              ? "ql-strike inline-active"
              : "ql-strike"
          }
          onClick={() => {
            if (activeDropdownItem === "strike") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                strike: false,
              });
            } else {
              setActiveDropdownItem("strike");
              setActiveInlineOptions({
                ...activeInlineOptions,
                strike: false,
              });
            }
          }}
        ></button>
        <button
          aria-label="sub script"
          className={
            activeInlineOptions.sub === true
              ? "ql-script inline-active"
              : "ql-script"
          }
          value="sub"
          onClick={() => {
            if (activeDropdownItem === "sub") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                sub: false,
              });
            } else {
              setActiveDropdownItem("sub");
              setActiveInlineOptions({
                ...activeInlineOptions,
                sub: true,
                super: false,
              });
            }
          }}
        ></button>
        <button
          aria-label="super script"
          className={
            activeInlineOptions.super === true
              ? "ql-script inline-active"
              : "ql-script"
          }
          value="super"
          onClick={() => {
            if (activeDropdownItem === "super") {
              setActiveDropdownItem("");
              setActiveInlineOptions({
                ...activeInlineOptions,
                super: false,
              });
            } else {
              setActiveDropdownItem("super");
              setActiveInlineOptions({
                ...activeInlineOptions,
                super: true,
                sub: false,
              });
            }
          }}
        ></button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
