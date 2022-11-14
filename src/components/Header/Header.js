import React, { useState, useEffect, useReducer, useRef } from "react";
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
  size: "large",
  alignment: "left",
  heading: "",
};

// Styled components
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
      draft.size = action.size;
      return draft;
    case "CHANGE_ALIGNMENT":
      draft.alignment = action.alignment;
      return draft;
    case "CHANGE_HEADING":
      draft.heading = action.heading;
      return draft;
    default:
      return draft;
  }
};

const Header = ({ headerState = defaultProps, setProp = () => {} }) => {
  const [state, dispatch] = useReducer(produce(headerConfig), headerState);

  const [disconnect, setDisconnect] = useState(true);
  const [headerHasFocus, setHeaderHasFocus] = useState(false);

  const diff = JSON.stringify(state) !== JSON.stringify(headerState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: headerState });
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ headerState: state });
  }, [state]);

  const headerRef = useRef();

  useOnClickOutside(headerRef, () => {
    setHeaderHasFocus(false);
    setDisconnect(true);
  });

  const handleHeadingChange = (e) => {
    dispatch({
      func: "CHANGE_HEADING",
      heading: e.target.value,
    });
  };

  return (
    <>
      <HeaderToolbar
        disconnect={disconnect}
        headerHasFocus={headerHasFocus}
        state={state}
        dispatch={dispatch}
      />
      <StyledPaper elevation="0" ref={headerRef}>
        <StyledHeaderInput
          placeholder="Type your header here..."
          disableUnderline="true"
          onChange={handleHeadingChange}
          value={state.heading}
        />
      </StyledPaper>
    </>
  );
};

export default Header;
