import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";
import { ToolBarDropDowns } from "../CustomToolBar";

const AlignDropdownButton = (props) => {
  const [activeDropDownItem, setActiveDropDownItem] =
    useContext(ToolBarDropDowns);

  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          position: "absolute",
          left: "66px",
          zIndex: "25",
          bottom: "-32px",
          padding: "3px",
        }}
        className="dropdown-content"
      >
        <span className="ql-formats">
          <Tooltip arrow title="align left" placement="top">
            <button
              aria-label="left align"
              onClick={() => {
                if (activeDropDownItem === "left") {
                  setActiveDropDownItem("");
                } else {
                  setActiveDropDownItem("left");
                }
              }}
              className="ql-align"
              style={{
                backgroundColor:
                  activeDropDownItem === "left" ? "rgb(226, 236, 245)" : "",
              }}
            ></button>
          </Tooltip>
          <Tooltip arrow title="centre text" placement="top">
            <button
              aria-label="align center"
              className="ql-align"
              value="center"
              onClick={() => {
                if (activeDropDownItem === "center") {
                  setActiveDropDownItem("");
                } else {
                  setActiveDropDownItem("center");
                }
              }}
              style={{
                backgroundColor:
                  activeDropDownItem === "center" ? "rgb(226, 236, 245)" : "",
              }}
            ></button>
          </Tooltip>
          <Tooltip arrow title="align right" placement="top">
            <button
              aria-label="right align"
              className="ql-align"
              value="right"
              onClick={() => {
                if (activeDropDownItem === "right") {
                  setActiveDropDownItem("");
                } else {
                  setActiveDropDownItem("right");
                }
              }}
              style={{
                backgroundColor:
                  activeDropDownItem === "right" ? "rgb(226, 236, 245)" : "",
              }}
            ></button>
          </Tooltip>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
