import React, { useState } from "react";

// MUI
import { Paper } from "@material-ui/core";
import { Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

// styles/emotion
import styled from "@emotion/styled";

const useStyles = makeStyles((theme) => ({
  icon: {
    left: 0,
  },
  select: {
    paddingLeft: "24px",
  },
}));

// Styled Components
const StyledToolbarContainer = styled(Paper)({
  width: "8.4375rem",
  padding: "0.25rem 0.875rem 0.1875rem 1.15625rem",
  borderRadius: "0.25rem",
  borderLeft: "0.25rem solid rgba(21, 101, 192, 1)",
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
});

const StyledHeaderSizeMenu = styled(Select)({
  background: "#FFF",
  fontSize: "1rem",
});

const StyledVerticalLine = styled("div")({
  margin: "0rem 0.875rem 0rem 0.625rem",
});

const verticalLineSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1"
    height="24"
    viewBox="0 0 1 24"
    fill="none"
  >
    <line
      x1="0.25"
      y1="1.09278e-08"
      x2="0.249999"
      y2="24"
      stroke="#E0E0E0"
      stroke-width="0.5"
    />
  </svg>
);

const leftAlignSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
      fill="#232323"
    />
  </svg>
);

const HeaderToolbar = ({ disconnect, headerHasFocus, dispatch, state }) => {
  const classes = useStyles();

  const handleSizeSelect = (e) => {
    dispatch({
      func: "CHANGE_SIZE",
      size: e.target.value,
    });
  };

  console.log(state);

  return (
    <StyledToolbarContainer>
      <StyledHeaderSizeMenu
        defaultValue="large"
        value={state.size}
        variant="standard"
        disableUnderline
        disableRipple
        disableFocusRipple
        IconComponent={KeyboardArrowDownIcon}
        classes={{
          icon: classes.icon,
          select: classes.select,
          input: classes.input,
        }}
        onChange={handleSizeSelect}
      >
        <MenuItem value="large">Large</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="small">Small</MenuItem>
      </StyledHeaderSizeMenu>
      <StyledVerticalLine>{verticalLineSVG}</StyledVerticalLine>
      <div>{leftAlignSVG}</div>
    </StyledToolbarContainer>
  );
};

export default HeaderToolbar;
