import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Tooltip } from "@mui/material";

import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";

export const TrashcanTooltip = () => {
  return (
    <Tooltip arrow title="delete link" placement="top">
      <button aria-label="delete link" className="trashcan">
        {icons["trashcan"]}
      </button>
    </Tooltip>
  );
};

export const PencilTooltip = () => {
  return (
    <Tooltip arrow title="edit link" placement="top">
      <button aria-label="edit link" className="pencil">
        {icons["pencil"]}
      </button>
    </Tooltip>
  );
};

export const ApplyTooltip = ({ quill }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const props = {
    title: "apply link",
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
    <Tooltip {...props} onMouseEnter={handleMouseOver}>
      <button aria-label="apply link" className="apply">
        Apply
      </button>
    </Tooltip>
  );
};