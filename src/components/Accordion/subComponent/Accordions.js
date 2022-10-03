import React, { useContext, useState, useRef } from "react";
import { Button } from "@mui/material";
import { Accordion } from "@mui/material";
import styled from "@emotion/styled";
import { LayoutContext } from "../../../Context/InteractivesContext";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import AccordionItem from "./AccordionItem";
import Pane from "./Pane";
import ConfigBar from "./ConfigBar";

//styled components for Accordion styles
const StyledAccordionContainer = styled("div")({
  width: "100%",
  maxWidth: "60.5rem",
});

const StyledAccordion = styled(Accordion)(({ accordionIndex }) => ({
  backgroundColor: "#FFFFFF",
}));

const StyledExpandCollapseButton = styled(Button)(({ disabled }) => ({
  fontWeight: "400",
  fontSize: "16px",
  color: disabled ? "#000000" : "#232323",
  letterSpacing: "0.15px",
  lineHeight: "24px",
  textTransform: "capitalize",
}));

const StyledButtonsDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
}));

const StyledToolBar = styled("div")(({ toolbar }) => ({
  display: toolbar ? "block " : "none",
  position: "fixed ",
  top: "80px ",
  left: "50% ",
  transform: "translateX(-50%) ",
  zIndex: "1000",
  justifyContent: "center ",
  backgroundColor: "#fff ",
}));
//Styled components end

const Accordions = () => {
  const [state, dispatch] = useContext(LayoutContext);
  const [isActive, setIsActive] = useState(null);

  const [removeError, setRemoveError] = useState(false);


  //click outside hook sets active pane to null when user clicks outside the accordion pane
  const paneRef = useRef()
  useOnClickOutside(paneRef, () => setIsActive(null), true);

  return (
    <StyledAccordionContainer data-testid="accordion-component" ref={paneRef}>
      <StyledToolBar toolbar={isActive === 0 ? true : isActive}>
        <ConfigBar paneIndex={isActive} setPaneIndex={setIsActive} setRemoveError={setRemoveError} />
      </StyledToolBar>
      {state.length > 1 && (
        <StyledButtonsDiv>
          <StyledExpandCollapseButton
            onClick={() => {
              dispatch({
                func: "EXPAND_ALL_PANE"
              });
            }}
            disabled={state.every(s => s.expanded === true)}
          >
            Expand All
          </StyledExpandCollapseButton>
          <StyledExpandCollapseButton
            onClick={() => {
              dispatch({
                func: "COLLAPSE_ALL_PANE"
              });
            }}
            disabled={state.every(s => s.expanded === false)}>
            Collapse All
          </StyledExpandCollapseButton>
        </StyledButtonsDiv>
      )
      }
      {state.map((accordion, accordionIndex) => {
        return (
          <StyledAccordion
            accordionIndex={accordionIndex}
            disableGutters={true}
            expanded={accordion.expanded}
          >
            <Pane accordionIndex={accordionIndex} accordion={accordion} isActive={isActive} setIsActive={setIsActive} removeError={removeError} setRemoveError={setRemoveError} />
            <AccordionItem
              accordionIndex={accordionIndex}
              accordion={accordion}
            />    
          </StyledAccordion>
        );
      })}
    </StyledAccordionContainer>
  );
};

export default Accordions;
