import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import icons from "../../assets/icons";

const BoldDropdownButton = ({ show }) => {
  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"}>
        <button aria-label="bold" className="ql-bold">
          {icons["bold"]}
        </button>
        <button aria-label="italic" className="ql-italic">
          {icons["italic"]}
        </button>
        <button aria-label="underline" className="ql-underline">
          {icons["underline"]}
        </button>
        <button aria-label="strike" className="ql-strike">
          {icons["strike"]}
        </button>
        <button aria-label="sub script" className="ql-script" value="sub">
          {icons["script"]}
        </button>
        <button aria-label="super script" className="ql-script" value="super">
          {icons["super"]}
        </button>
      </Card>
    </>
  );
};

export default BoldDropdownButton;
