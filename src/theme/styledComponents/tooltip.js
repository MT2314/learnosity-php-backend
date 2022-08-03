import React from "react";

import { Tooltip as MUITooltip } from "@mui/material/";

import styled from "@emotion/styled";

//? Config Bar
// * Working but minimal configuration, revisit when remaking config bar component
export const Tooltip = styled(({ theme, className, ...props }) => (
  <MUITooltip
    {...props}
    classes={{ popper: className }}
    style={{
      // * Background of each config icon
      color: "white",
      // * Background of custom config
      background: "white",
    }}
  />
))``;

export default Tooltip;
