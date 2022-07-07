import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { ToolBarDropDowns } from "../CustomToolBar";

const AlignDropdownButton = ({ show, activeAlignIcon, setActiveAlignIcon }) => {
  var icons = ReactQuill.Quill.import("ui/icons");
  icons["align"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/left_align.svg"
      alt="left text alignment"
    />
  );

  icons["center"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/center_align.svg"
      alt="center text alignment"
    />
  );

  icons["right"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/right_align.svg"
      alt="right text alignment"
    />
  );

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "left" ? "#1565c0" : "#232323"}
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.55556 10.6667V12.4444H12.4444V10.6667H3.55556ZM0 16H16V14.2222H0V16ZM0 8.88889H16V7.11111H0V8.88889ZM3.55556 3.55556V5.33333H12.4444V3.55556H3.55556ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "center" ? "#1565c0" : "#232323"}
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M0 16H16V14.2222H0V16ZM5.33333 12.4444H16V10.6667H5.33333V12.4444ZM0 8.88889H16V7.11111H0V8.88889ZM5.33333 5.33333H16V3.55556H5.33333V5.33333ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "right" ? "#1565c0" : "#232323"}
              />
            </svg>
          </button>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
