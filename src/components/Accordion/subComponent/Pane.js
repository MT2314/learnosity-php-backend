import React, { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import styled from "@emotion/styled";
import AccordionTitle from "./AccordionTitle";
import {
  LayoutContext,
  ActivePaneContext,
} from "../../../Context/InteractivesContext";

//styles for accordion
const StyledPaneContainer = styled("div")({
  width: "100%",
});

const StyledAccordionSummary = styled(AccordionSummary)(({ isActive }) => ({
  minHeight: "2.5rem",
  maxHeight: "4.125rem",
  width: "100%",
  padding: "0.5rem 0.5rem 0.5rem 0.625rem",
  fontSize: "1.125rem",
  color: "#232323",
  letterSpacing: "0.009375rem",
  fontcolor: "#232323",
  backgroundColor: isActive
    ? "rgba(21, 101, 192, 0.12) !important"
    : "#fff !important", //!important overrides the MUI grey background.
  borderWidth: isActive
    ? "0.0625rem 0.0625rem 0.1875rem 0.0625rem"
    : "0.0625rem",
  borderStyle: "solid",
  borderColor: isActive ? "#232323" : "#BDBDBD",
  borderRadius: "0.625rem 0.625rem 0 0",

  "&:focus": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  },

  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  },
}));

const StyledAccordionSummaryContents = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  margin: "-0.75rem -0.125rem -0.75rem 0",
});
//styles end.

const Pane = ({ accordionIndex, accordion, isActive, setIsActive, removeError, setRemoveError }) => {
  const { title, placeholderTitle } = accordion;
  const [, dispatch] = useContext(LayoutContext);
  const [, setActivePane] = useContext(ActivePaneContext);

  useEffect(() => {
    setRemoveError(false);
  }, [removeError]);

  return (
    <StyledPaneContainer key={`pane-${accordionIndex}`}>
      <StyledAccordionSummary
        //id attribute below creates an "aria-labelledby" and is REQUIRED for accessibilty.
        id={`panel-${accordionIndex + 1}-add-components-${uuidv4()}`}
        onClick={() => {
          setIsActive(accordionIndex)
        }}
        accordionIndex={accordionIndex}
        isActive={accordionIndex === isActive}
      >
        <StyledAccordionSummaryContents>
        <AccordionTitle
          key={`accordion-title-${accordionIndex}`}
          placeholderTitle={placeholderTitle}
          accordionIndex={accordionIndex}
          accordionTitle={title}
          isActive={isActive}
          setIsActive={setIsActive}
        />
          <ExpandMore
            onClick={() => {
              dispatch({
                func: "TOGGLE_PANE",
                paneIndex: accordionIndex,
              });
              setActivePane({
                func: "TOGGLE_PANE",
                paneIndex: accordionIndex,
              });
            }}
            sx={{
              pointerEvents: "auto",
            }}
          />
        </StyledAccordionSummaryContents>
      </StyledAccordionSummary>
    </StyledPaneContainer>
  );
};
export default Pane;
