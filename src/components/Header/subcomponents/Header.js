import React, { useState, useContext, useRef } from "react";
import produce from "immer";
// MUI
import { Paper, TextareaAutosize } from "@material-ui/core";
// styles/emotion
import styled from "@emotion/styled";
// Toolbar
import HeaderToolbar from "./HeaderToolbar";
// Context
import { HeaderContext } from "../HeaderContext";

// Custom hooks
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

// Styled components

const StyledPaper = styled(Paper)({
  position: "relative",
  // width: "968px",
  padding: "1.25rem 6.5rem",
  background: "#FFF",
});

// ? Styled Text Input
const StyledHeaderInput = styled(TextareaAutosize)(
  ({ headerLevel, alignment }) => ({
    width: "100%",
    border: "none",
    fontFamily: `"Inter", sans-serif`,
    fontWeight: "300",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    overflowWrap: "break-word",
    msWordBreak: "break-word",
    wordBreak: "break-word",
    resize: "none",

    textAlign:
      alignment == "center-align"
        ? "center"
        : alignment == "right-align"
        ? "right"
        : "left",
    fontSize:
      headerLevel == "medium"
        ? "36px"
        : headerLevel == "small"
        ? "34px"
        : "42px",
    fontWeight: headerLevel == "small" ? "500" : "300",
    lineHeight:
      headerLevel == "small" ? "39.68px" : "medium" ? "43.2px" : "49.01px",
    letterSpacing:
      headerLevel == "medium" ? "-0.5 px" : "large" ? "-1.5 px" : "normal",
    "&::placeholder": {
      color: "rgba(35, 35, 35, 1)",
    },
    "&:focus::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
    "&:focus-visible": {
      outline: "none",
    },
  })
);
const StyledConfigBar = styled("div")({
  position: "fixed",
  top: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  justifyContent: "center",
  backgroundColor: "transparent",
});
const Header = () => {
  // Header Component State
  const [state, dispatch] = useContext(HeaderContext);

  // Toolbar Active State
  const [toolbar, setToolbar] = useState(false);
  // ? Alignment Dropdown Open/Close State
  const [activeTopMenu, setActiveTopMenu] = useState(false);

  // Refrences
  const headerRef = useRef();

  // Close Toolbar on Click Outside
  useOnClickOutside(headerRef, () => {
    setToolbar(false);
    setActiveTopMenu(false);
  });

  // Header Text Input Change Handler - Save to State
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
      <StyledConfigBar>
        <HeaderToolbar
          toolbar={toolbar}
          state={state}
          dispatch={dispatch}
          activeTopMenu={activeTopMenu}
          setActiveTopMenu={setActiveTopMenu}
        />
      </StyledConfigBar>

      <StyledPaper elevation="0">
        <StyledHeaderInput
          data-id="headerInput"
          placeholder="Type your header here..."
          aria-label="Header input field"
          type="text "
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
