import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import icons from "../../assets/icons";

const BoldDropdownButton = ({ show, onKeyDownExit }) => {
  return (
    <>
      <Card className={show ? "bold-dropdown show" : "bold-dropdown hide"} onKeyDown={onKeyDownExit}>
        <Tooltip
          aria-label="bold"
          title="bold"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
          <button aria-label="bold" className="ql-bold">
            {icons["bold"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="italic"
          title="italic"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
          <button aria-label="italic" className="ql-italic">
            {icons["italic"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="underline"
          title="underline"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
          <button aria-label="underline" className="ql-underline">
            {icons["underline"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="strikethrough"
          title="strikethrough"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
          <button aria-label="strike" className="ql-strike">
            {icons["strike"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="subscript"
          title="subscript"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
        >
          <button aria-label="sub script" className="ql-script" value="sub">
            {icons["script"]}
          </button>
        </Tooltip>
        <Tooltip
          aria-label="superscript"
          title="superscript"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
            popperOptions: {
              positionFixed: true,
              modifiers: {
                preventOverflow: {
                  enabled: true,
                  boundariesElement: "window", // where "window" is the boundary
                },
              },
            },
          }}
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
