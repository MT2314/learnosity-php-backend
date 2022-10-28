import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import icons from "../../assets/icons";

import styled from "@emotion/styled";

import { useQuill } from "../../Provider";

const StyleCard = styled(Card)(({ show, isInfoBox, isVideo }) => ({
  position: "absolute",
  zIndex: 25,
  left: isInfoBox ? "0px" : isVideo ? "0px" : "-4px",
  bottom: "-32.5px",
  padding: "3px",
  display: show ? "block" : "none",
  ".ql-active": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    svg: { ".svg-fill": { fill: "#1565c0" } },
  },
}));

const BoldDropdownButton = ({ show, onKeyDropDown, isInfoBox, isVideo }) => {
  const quill = useQuill();

  const [active, setActive] = useState("");

  const quillFormatClick = (e, type) => {
    if (active === type) {
      setActive("");
      quill.format(type, false);
    } else {
      e.preventDefault();
      e.stopPropagation();
      setActive(type);
      const range = quill.getSelection();
      if (range) {
        const [line, offset] = quill.getLine(range.index);
        const formats = line.formats();
        if (formats.bold) {
          console.log("BOLD False");
          quill.format(type, false);
        } else {
          console.log("BOLD True");
          quill.format(type, true);
        }
      }
    }
  };
  return (
    <>
      <StyleCard
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        className={show ? "bold-dropdown show" : "bold-dropdown hide"}
        onKeyDown={onKeyDropDown}
      >
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
          <button
            aria-label="bold"
            className={
              active === "bold" ? "ql-bold ql-selected ql-active" : "ql-bold"
            }
            onClick={(e) => quillFormatClick(e, "bold")}
          >
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
      </StyleCard>
    </>
  );
};

export default BoldDropdownButton;
