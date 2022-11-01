import React, { useContext, useCallback } from "react";
import {
  LayoutContext,
  ActivePaneContext,
} from "../../../Context/InteractivesContext";
import { TextareaAutosize } from "@material-ui/core";
import styled from "@emotion/styled";

const StyledAccordionTitle = styled(TextareaAutosize)(({ isActive }) => ({
  fontFamily: '"Inter", sans-serif',
  backgroundColor: "rgba(21, 101, 192, 0)",
  border: "none",
  fontSize: "1.125rem",
  fontWeight: 500,
  width: "100%",
  maxWidth: "57.125rem",
  minHeight: "1.5625rem",
  lineHeight: 1.5,
  resize: "none",
  textOverflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  "&::-webkit-scrollbar": {
    WebkitAppearance: "none",
    width: "0.4375rem",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "0.25rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0 0.0625rem rgba(255, 255, 255, 0.5)",
    WebkitBoxShadow: "0 0 0.0625rem rgba(255, 255, 255, 0.5)",
  },
  "&::placeholder": {
    color: isActive && "#232323",
    opacity: 1,
  },
  "&:focus": {
    border: "none",
    outline: "none",
    "&:: placeholder": {
      color: "#232323 ",
      opacity: 0.6,
    },
  },
  ":-ms-input-placeholder": {
    /* Internet Explorer 10-11 */ color: isActive && "#232323",
  },

  "::-ms-input-placeholder": {
    /* Microsoft Edge */ color: isActive && "#232323",
  },
}));

const StyledAccorPlaceholder = styled("div")(({ isActive }) => ({
  width: "100%",
  maxWidth: "57.125rem",
  maxHeight: "3.125rem",
  fontSize: "1.125rem",
  wordWrap: "break-word",
  overflowX: "hidden",
  overflowY: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  display: "-webkit-box",
  whiteSpace: "pre-wrap",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: isActive ? "unset" : 2,
}));

const AccordionTitle = ({
  accordionTitle,
  accordionIndex,
  placeholderTitle,
  activePane,
  isActive,
  setIsActive,
}) => {
  const [, dispatch] = useContext(LayoutContext);
  const [, setActivePane] = useContext(ActivePaneContext);

  //dispatches function from Context/InteractivesContext to change title and update data base.
  const handleTitleChange = useCallback((e) => {
    //this if statement gives the input field a character limit of 200ch
    const trimCharLimit = e.target.value.substring(0, 200);
    dispatch({
      func: "CHANGE_TITLE",
      title: trimCharLimit,
      layerIndex: accordionIndex,
    });
    return;
  }, []);

  return (
    <>
      {(isActive === 0 ? true : isActive) ? (
        <StyledAccordionTitle
          placeholder={placeholderTitle}
          aria-label="accordion title input"
          aria-multiline="true"
          minRows="1"
          maxRows="2"
          onChange={handleTitleChange}
          value={accordionTitle || ""}
        />
      ) : (
        <StyledAccorPlaceholder
          accordionIndexProp={accordionIndex}
          activePane={activePane}
        >
          {accordionTitle ? accordionTitle : placeholderTitle}
        </StyledAccorPlaceholder>
      )}
    </>
  );
};

export default AccordionTitle;
