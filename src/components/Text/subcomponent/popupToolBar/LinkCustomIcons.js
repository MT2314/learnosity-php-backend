import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Tooltip } from "@material-ui/core/";
import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";
// Config styles of MUI components
import { makeStyles } from "@material-ui/core/styles";

// Classes for styling modification. (Tooltip class)
const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "rgba(97, 97, 97, 0.9)",
  },
}));

export const TrashcanTooltip = () => {
  // Allow the use of materialUI styled component classes
  let classes = useStyles();

  return (
    <Tooltip
      arrow
      title="delete link"
      placement="top"
      classes={{ tooltip: classes.tooltip }}
    >
      <button aria-label="remove link" className="trashcan">
        {icons["trashcan"]}
      </button>
    </Tooltip>
  );
};

export const PencilTooltip = () => {
  let classes = useStyles();
  return (
    <Tooltip
      arrow
      title="edit link"
      placement="top"
      classes={{ tooltip: classes.tooltip }}
    >
      <button aria-label="edit link" className="pencil">
        {icons["pencil"]}
      </button>
    </Tooltip>
  );
};

export const ApplyTooltip = ({ quill }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  let classes = useStyles();

  const props = {
    title: "add link",
    placement: "top",
    disableHoverListener: isDisabled,
    disableFocusListener: isDisabled,
    arrow: true,
  };

  const handleMouseOver = () => {
    quill.querySelector(".disabled") !== null
      ? setIsDisabled(true)
      : setIsDisabled(false);
  };
  return (
    <Tooltip
      {...props}
      onMouseEnter={handleMouseOver}
      classes={{ tooltip: classes.tooltip }}
    >
      <button aria-label="add link" className="apply">
        Apply
      </button>
    </Tooltip>
  );
};
