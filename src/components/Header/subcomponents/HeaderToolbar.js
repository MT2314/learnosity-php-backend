import React from "react";
// subcomponents
import AlignmentDropdown from "./AlignmentDropdown";
// MUI
import { Paper } from "@material-ui/core";
import { Select, MenuItem, Divider } from "@mui/material";
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
      <Divider orientation="vertical" variant="middle" flexItem />
      {/* AlignmentDropdown.js */}
    </StyledToolbarContainer>
  );
};

export default HeaderToolbar;
