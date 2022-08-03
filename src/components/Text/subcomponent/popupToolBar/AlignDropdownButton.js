import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";
import "../../styles/AlignDropdownButton.scss";
import icons from "../../assets/icons";
// Config styles of MUI components
import { makeStyles } from "@material-ui/core/styles";

// Classes for styling modification. (Tooltip class)
const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(97, 97, 97, 0.9)",
  },
}));
const AlignDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
  setVisibleAlignIcon,
}) => {
  // Allow the use of materialUI styled component classes
  let classes = useStyles();

  return (
    <>
      <Card className={show ? "align-dropdown show" : "align-dropdown hide"}>
        <span className="ql-formats">
          <Tooltip
            arrow
            title="align left"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <button
              aria-label="left align"
              onClick={() => {
                if (activeDropDownItem === "left") {
                  setActiveDropDownItem("");
                } else {
                  setActiveDropDownItem("left");
                  setVisibleAlignIcon(icons["align"]);
                }
              }}
              className={
                activeDropDownItem === "left"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value=""
            >
              {icons["align"]}
            </button>
          </Tooltip>
          <Tooltip
            arrow
            title="centre text"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <button
              aria-label="align center"
              className={
                activeDropDownItem === "center"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value="center"
              onClick={() => {
                if (activeDropDownItem === "center") {
                  setActiveDropDownItem("");
                  setVisibleAlignIcon(icons["align"]);
                } else {
                  setActiveDropDownItem("center");
                  setVisibleAlignIcon(icons["center"]);
                }
              }}
            >
              {icons["center"]}
            </button>
          </Tooltip>
          <Tooltip
            arrow
            title="align right"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <button
              aria-label="right align"
              className={
                activeDropDownItem === "right"
                  ? "ql-align ql-selected ql-active"
                  : "ql-align"
              }
              value="right"
              onClick={() => {
                if (activeDropDownItem === "right") {
                  setActiveDropDownItem("");
                  setVisibleAlignIcon(icons["align"]);
                } else {
                  setActiveDropDownItem("right");
                  setVisibleAlignIcon(icons["right"]);
                }
              }}
            >
              {icons["right"]}
            </button>
          </Tooltip>
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
