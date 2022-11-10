import React from "react";

// MUI
import { Paper } from "@material-ui/core";
import { Menu, MenuItem } from "@mui/material";

// styles/emotion
import styled from "@emotion/styled";

// Styled Components
const StyledToolbarContainer = styled(Paper)({
  width: "8.4375rem",
  borderRadius: "0.25rem",
  borderLeft: "0.25rem solid rgba(21, 101, 192, 1)",
});

const HeaderToolbar = ({ disconnect, headerHasFocus }) => {
  return <StyledToolbarContainer></StyledToolbarContainer>;
};

export default HeaderToolbar;
