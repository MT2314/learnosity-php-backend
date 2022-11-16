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
  size: null,
  alignment: null,
  heading: "",
};

// Styled components

const StyledPaper = styled(Paper)({
  width: "100%",
  padding: "1.25rem 6.5rem",
  background: "#FFF",
});

// ? Styled Text Input
const StyledHeaderInput = styled("input")(({ headerLevel, alignment }) => ({
  width: "100%",
  border: "none",
  fontFamily: `"Inter", sans-serif`,
  fontWeight: "300",
  textAlign:
    alignment == "center-align"
      ? "center"
      : alignment == "right-align"
      ? "right"
      : "left",
  fontSize:
    headerLevel == "Medium" ? "36px" : headerLevel == "Small" ? "34px" : "42px",

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
  const [headerLevel, setHeaderLevel] = useState();

  // Refrences
  const headerRef = useRef();

  // Check for difference in Header and Component Mount State
  const diff = JSON.stringify(state) !== JSON.stringify(headerState);
  const [mounted, setMounted] = useState(false);

  // Update Header State on Mount
  useEffect(() => {
    diff && mounted && setProp({ headerState: state });
  }, [state]);

  // Update Header State on Change
  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: headerState });
    setMounted(true);
  }, []);

  // Close Toolbar on Click Outside
  useOnClickOutside(headerRef, () => {
    setToolbar(false);
  });

  // Header Text Input Change Handler - Save to State
  const handleHeadingChange = (e) => {
    dispatch({
      func: "CHANGE_HEADING",
      heading: e.target.value,
    });
  };

  console.log(state);

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
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // Prevent new line break
          value={state.heading}
          alignment={state.alignment}
          headerLevel={state.size}
        />
      </StyledPaper>
    </div>
  );
};

export default Header;
