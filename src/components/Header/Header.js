import React from "react";

// MUI
import { Paper } from "@material-ui/core";

// styles/emotion
import styled from "@emotion/styled";

export const defaultProps = {
  headerSize: "large",
  headerAlign: "left",
};

const StyledPaper = styled(Paper)({
  width: "100%",
  fontFamily: `"Inter", sans-serif`,
  padding: "1.25rem 6.5rem",
  background: "#FFF",
});

const Header = () => {
  return (
    <StyledPaper>
      <p>Hello, World!</p>
    </StyledPaper>
  );
};

export default Header;
