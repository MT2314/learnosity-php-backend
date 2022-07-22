import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core/";
import icons from "../../assets/icons";
// Config styles of MUI components
import { makeStyles } from "@material-ui/core/styles";

// Classes for styling modification. (Tooltip class)
const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(112, 112, 112, 0.9)",
  },
}));
const BoldDropdownButton = ({ show }) => {
  // Allow the use of materialUI styled component classes
  let classes = useStyles();

  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <Tooltip
          arrow
          title="bold"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="bold" className="ql-bold">
            {icons["bold"]}
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title="italic"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="italic" className="ql-italic">
            {icons["italic"]}
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title="underline"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="underline" className="ql-underline">
            {icons["underline"]}
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title="strikethrough"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="strike" className="ql-strike">
            {icons["strike"]}
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title="subscript"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="sub script" className="ql-script" value="sub">
            {icons["script"]}
          </button>
        </Tooltip>
        <Tooltip
          arrow
          title="superscript"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button aria-label="super script" className="ql-script" value="super">
            {icons["super"]}
          </button>
        </Tooltip>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
