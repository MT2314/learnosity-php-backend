import React, { useState, useReducer, useRef } from "react";
import produce from "immer";
// MUI
import { Paper } from "@material-ui/core";
// styles/emotion
import styled from "@emotion/styled";
// Toolbar
import HeaderToolbar from "./subcomponents/HeaderToolbar";
// Custom hooks
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const defaultProps = {
  headerSize: "large",
  headerAlign: "left",
};

const StyledPaper = styled(Paper)({
  width: "100%",
  padding: "1.25rem 6.5rem",
  background: "#FFF",
});

const StyledHeaderInput = styled("input")({
  width: "100%",
  border: "none",
  fontFamily: `"Inter", sans-serif`,
  fontWeight: "300",

  "&::placeholder": {
    color: "rgba(35, 35, 35, 1)",
  },

  "&:focus-visible": {
    outline: "none",
  },
});

export const headerConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return draft.action;
    case "CHANGE_SIZE":
      draft.headerSize = action.headerSize;
      return draft;
    case "CHANGE_ALIGNMENT":
      draft.headerAlign = action.headerAlign;
      return draft;
    default:
      return draft;
  }
};

const Header = ({ headerState = defaultProps, setProp = () => {} }) => {
  const [state, dispatch] = useReducer(produce(headerConfig), headerState);

  const [disconnect, setDisconnect] = useState(true);
  const [headerHasFocus, setHeaderHasFocus] = useState(false);

  const headerRef = useRef();

  useOnClickOutside(headerRef, () => {
    setHeaderHasFocus(false);
    setDisconnect(true);
  });

  return (
    <>
      <HeaderToolbar disconnect={disconnect} headerHasFocus={headerHasFocus} />
      <StyledPaper elevation="0" ref={headerRef}>
        <StyledHeaderInput
          placeholder="Type your header here..."
          disableUnderline="true"
        />
      </StyledPaper>
    </>
  );
};

export default Header;
