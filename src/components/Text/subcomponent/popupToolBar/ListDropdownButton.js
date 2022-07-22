import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";
import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";
// Config styles of MUI components
import { makeStyles } from "@material-ui/core/styles";

// Classes for styling modification. (Tooltip class)
const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(112, 112, 112, 0.9)",
  },
}));

const ListDropdownButton = ({
  show,
  activeDropDownItem,
  setActiveDropDownItem,
}) => {
  // Allow the use of materialUI styled component classes
  let classes = useStyles();

  return (
    <>
      <Card className={show ? "list-dropdown show" : "list-dropdown hide"}>
        <Tooltip
          arrow
          title="bullets"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            aria-label="bullet list"
            className={
              activeDropDownItem === "bullet"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="bullet"
            onClick={() => {
              if (activeDropDownItem === "bullet") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("bullet");
              }
            }}
          >
            {icons["bullet"]}
          </button>
        </Tooltip>

        <Tooltip
          arrow
          title="numbering"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            aria-label="numbered list"
            className={
              activeDropDownItem === "ordered"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="ordered"
            onClick={() => {
              if (activeDropDownItem === "ordered") {
                setActiveDropDownItem("");
              } else {
                setActiveDropDownItem("ordered");
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
