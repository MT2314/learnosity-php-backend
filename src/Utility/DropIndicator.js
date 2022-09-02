import React from "react";

import styled from "@emotion/styled";

const triangleSize = 9;

const DropIndicator = styled("div")(
  ({ offsetLine, showLine, centerLine, offsetDown = 4, offsetUp = -3 }) => {
    const style = {
      position: "relative",
      display: showLine ? "block" : "none",
      left: "2px",
      right: "2px",
      height: "0px",
      // Caution: Magic numbers
      top: offsetLine === 0 ? `${offsetUp}px` : null,
      bottom: offsetLine === 1 ? `${offsetDown}px` : null,
      overflow: "visible",
      borderTop: "3px dashed #1565C0",
      transition: "top 1s linear, bottom 1s linear, position 1s linear",
      "&::before": {
        content: "''",
        position: "absolute",
        borderStyle: "solid",
        borderRight: `${triangleSize}px solid transparent`,
        borderTop: `${triangleSize / 2}px solid transparent`,
        borderBottom: `${triangleSize / 2}px solid transparent`,
        borderLeft: `${triangleSize}px solid #1565C0`,
        display: "block",
        width: "10px",
        height: "10px",
        left: "0px",
        top: "-7px",
        zIndex: "10000",
      },
      "&::after": {
        content: "''",
        position: "absolute",
        borderStyle: "solid",
        borderLeft: `${triangleSize}px solid transparent`,
        borderTop: `${triangleSize / 2}px solid transparent`,
        borderBottom: `${triangleSize / 2}px solid transparent`,
        borderRight: `${triangleSize}px solid #1565C0`,
        display: "block",
        width: "10px",
        height: "10px",
        right: "0px",
        top: "-7px",
        zIndex: "10000",
      },
    };

    if (centerLine === true) {
      delete style.bottom;
      style.top = "8px";
    }

    return style;
  }
);

// TODO: Add logic to other indicator as prop
export const CenterDropIndicator = () => (
  <hr
    style={{
      height: "0px",
      borderTop: "2px dashed blue",
      position: "absolute",
      top: "-10px",
      left: 0,
      right: 0,
    }}
  />
);

export default DropIndicator;
