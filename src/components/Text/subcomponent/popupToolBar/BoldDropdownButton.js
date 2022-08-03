import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { Tooltip } from "../../../../theme/styledComponents/tooltip";
import icons from "../../assets/icons";

const BoldDropdownButton = ({ show }) => {
  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <Tooltip arrow title="bold" placement="top">
          <button aria-label="bold" className="ql-bold">
            {icons["bold"]}
          </button>
        </Tooltip>
        <Tooltip arrow title="italic" placement="top">
          <button aria-label="italic" className="ql-italic">
            {icons["italic"]}
          </button>
        </Tooltip>
        <Tooltip arrow title="underline" placement="top">
          <button aria-label="underline" className="ql-underline">
            {icons["underline"]}
          </button>
        </Tooltip>
        <Tooltip arrow title="strikethrough" placement="top">
          <button aria-label="strike" className="ql-strike">
            {icons["strike"]}
          </button>
        </Tooltip>
        <Tooltip arrow title="subscript" placement="top">
          <button aria-label="sub script" className="ql-script" value="sub">
            {icons["script"]}
          </button>
        </Tooltip>
        <Tooltip arrow title="superscript" placement="top">
          <button aria-label="super script" className="ql-script" value="super">
            {icons["super"]}
          </button>
        </Tooltip>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
