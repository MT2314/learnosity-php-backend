import React, { useContext, useState, useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { tooltipClasses } from "@mui/material/Tooltip";
import { IconButton, Toolbar, AppBar, Tooltip } from "@mui/material";
import { ArrowBack, ArrowForward, Add, Remove } from "@mui/icons-material";
// ? Icons
import icons from "../icons/configIcons";

// * Styled Components
// ? Styled Container for configBar
const Container = styled("div")({
  display: "absolute",
  color: "white",
});

// ? Styled Tooltip, differnet but most compact method for styling tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(97, 97, 97, 0.9)",
    border: "4px",
    color: "#fff",
    height: "22px",
    padding: "4px, 8px, 4px, 8px",
    fontSize: "10px",
    lineHeight: "14px",
    fontWeight: "500",
    "& .MuiTooltip-arrow": {
      color: "rgba(97, 97, 97, 0.9)",
    },
  },
}));

// ? styled Toolbar
const StyledToolbar = styled(Toolbar)({
  position: "relative",
  display: "flex",
  justifyContent: "space-evenly",
  width: "146px",
  height: "40px",
  color: "#000",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  margin: "10px, 8px",
  minHeight: "32px !important",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const StyledIconButton = styled(IconButton)({
  width: "30px",
  height: "30px",
  padding: "7px",
  color: "#000",
  backgroundColor: "none",
  borderRadius: "4px!important",
  "& svg": {
    fill: "#000",
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      fill: "rgba(21, 101, 192, 1)",
    },
  },
  "&:active": {
    cursor: "pointer",
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      fill: "rgba(21, 101, 192, 1)",
    },
  },
  "&:disabled": {
    backgroundColor: "rgba(255, 255, 255, 1) !important",
    "& svg": {
      fill: "rgba(0, 0, 0, 0.38)",
    },
  },
});

const TempConfigBar = ({ disableToolbar }) => {
  return (
    <Container>
      <AppBar position="static">
        <StyledToolbar variant="dense" disableGutters test-id="tab-toolbar">
          <StyledTooltip title="move tab left" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons["bold"]}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="move tab right" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons["align"]}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="add tab" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons["bullet"]}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="remove current tab" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons["link"]}
            </StyledIconButton>
          </StyledTooltip>
        </StyledToolbar>
      </AppBar>
    </Container>
  );
};

export default TempConfigBar;
