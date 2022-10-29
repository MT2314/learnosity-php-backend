import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "../../styles/BoldDropdownButton.scss";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import icons from "../../assets/icons";

import styled from "@emotion/styled";

import { useQuill, useFormat } from "../../Provider";

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
  const format = useFormat();

  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    sub: false,
    super: false,
  });

  useEffect(() => {
    if (format) {
      let formatList = [];

      Object.keys(format).forEach((key) => {
        key === "script"
          ? formatList.push(format.script)
          : formatList.push(key);
      });

      Object.keys(active).forEach((key) =>
        setActive((prev) => ({ ...prev, [key]: formatList.includes(key) }))
      );
    }
  }, [format]);

  const handleFormat = (type) => {
    /* Creating a copy of the active object. */
    let temp = { ...active };

    /* Checking if the type is either sub or super. */
    const isScript = ["sub", "super"].includes(type);

    /* Checking if the type is either sub or super. */
    if (isScript) {
      /* Setting the sub and super to true or false depending on the type. */
      temp.sub = type === "sub";
      temp.super = type === "super";

      /* Setting the script to false. */
      quill.format("script", false);
    }

    /* Checking if the type is active. */
    const isActive = active[type];

    /* Creating a copy of the active object and then setting the type to the opposite of what it was. */
    temp = { ...temp, [type]: !isActive };

    /* Checking if the type is either sub or super. If it is, it is setting the script to false. */
    isScript && quill.format("script", isActive ? false : type);

    /* Formatting the text. */
    quill.format(type, !isActive);

    /* Setting the state of the active object. */
    setActive(temp);
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
              active.bold ? "ql-bold ql-selected ql-active" : "ql-bold"
            }
            onClick={(e) => handleFormat("bold")}
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
          <button
            aria-label="italic"
            className={
              active.italic ? "ql-italic ql-selected ql-active" : "ql-italic"
            }
            onClick={(e) => handleFormat("italic")}
          >
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
          <button
            aria-label="underline"
            className={
              active.underline
                ? "ql-underline ql-selected ql-active"
                : "ql-underline"
            }
            onClick={(e) => handleFormat("underline")}
          >
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
          <button
            aria-label="strike"
            className={
              active.strike ? "ql-strike ql-selected ql-active" : "ql-strike"
            }
            onClick={(e) => handleFormat("strike")}
          >
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
          <button
            aria-label="sub script"
            className={
              active.sub ? "ql-script ql-selected ql-active" : "ql-script"
            }
            onClick={(e) => handleFormat("sub")}
            value="sub"
          >
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
          <button
            aria-label="super script"
            className={
              active.super ? "ql-script ql-selected ql-active" : "ql-script"
            }
            onClick={(e) => handleFormat("super")}
            value="super"
          >
            {icons["super"]}
          </button>
        </Tooltip>
      </StyleCard>
    </>
  );
};

export default BoldDropdownButton;
