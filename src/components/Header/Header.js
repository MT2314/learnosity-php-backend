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

// ? Styled Text Input
const StyledHeaderInput = styled("input")(({ headerLevel }) => ({
  width: "100%",
  border: "none",
  fontFamily: `"Inter", sans-serif`,
  fontWeight: "300",
  fontSize:
    headerLevel == "Large"
      ? "42px"
      : headerLevel == "Medium"
      ? "36px"
      : headerLevel == "Small"
      ? "34px"
      : "42px",

  "&::placeholder": {
    color: "rgba(35, 35, 35, 1)",
  },

  "&:focus-visible": {
    outline: "none",
  },
}));

// Reducers
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
  // Header Component State
  const [state, dispatch] = useReducer(produce(headerConfig), headerState);
  // Toolbar Active State
  const [toolbar, setToolbar] = useState(false);
  // Header Level State
  const [headerLevel, setHeaderLevel] = useState("large");

  // Check for difference in Header and Component Mount State
  const diff = JSON.stringify(state) !== JSON.stringify(headerState);
  const [mounted, setMounted] = useState(false);

  // Update Header State on Mount
  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: headerState });
    setMounted(true);
  }, []);

  // Update Header State on Change
  useEffect(() => {
    diff && mounted && setProp({ headerState: state });
  }, [state]);

  // Refrences
  const headerRef = useRef();

  // Close Toolbar on Click Outside
  useOnClickOutside(headerRef, () => {
    setToolbar(false);
  });

  // Handle Toolbar State Change
  const handleHeadingChange = (e) => {
    dispatch({
      func: "CHANGE_HEADING",
      heading: e.target.value,
    });
  };
  return (
    <div
      onClick={(e) => setToolbar(true)}
      onFocus={(e) => setToolbar(true)}
      ref={headerRef}
    >
      <HeaderToolbar
        toolbar={toolbar}
        state={state}
        dispatch={dispatch}
        setHeaderLevel={setHeaderLevel}
      />

      <StyledPaper elevation="0">
        <StyledHeaderInput
          placeholder="Type your header here..."
          disableUnderline="true"
          onChange={handleHeadingChange}
          value={state.heading}
          headerLevel={headerLevel}
        />
      </StyledPaper>
    </div>
  );
};

export default Header;
