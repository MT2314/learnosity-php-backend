import React from "react";
import "react-quill/dist/quill.snow.css";
import { Tooltip } from "@material-ui/core/";
import "../../styles/ListDropdownButton.scss";
import icons from "../../assets/icons";

export const TrashcanTooltip = () => {
  return (
    <Tooltip arrow title="remove link" placement="top">
      <button aria-label="remove link" className="trashcan">
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

export const ApplyTooltip = () => {
  return (
    <Tooltip arrow title="add link" placement="top">
      <button aria-label="add link" className="apply">
        Apply
      </button>
    </Tooltip>
  );
};
