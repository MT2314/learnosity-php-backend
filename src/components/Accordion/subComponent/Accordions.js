import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Accordion } from "@mui/material";
import styled from "@emotion/styled";
import { LayoutContext } from "../../../Context/InteractivesContext";
import AccordionItem from "./AccordionItem";
import Pane from "./Pane";

//styled components for Accordion styles
const StyledAccordionContainer = styled("div")({
  width: "100%",
  maxWidth: "60.5rem",
});

const StyledAccordion = styled(Accordion)(({ accordionIndex }) => ({
  backgroundColor: "#FFFFFF",
}));

const StyledAccordionDetails = styled(AccordionDetails)({
  borderWidth: "0rem 0.0625rem 0.0625rem 0.0625rem",
  borderStyle: "solid",
  borderColor: "#BDBDBD",
});

const StyledExpandCollapseButton = styled(Button)(({ disabled }) => ({
  fontWeight: "400",
  fontSize: "1rem",
  color: disabled ? "#000000" : "#232323",
  letterSpacing: "0.009375rem",
  lineHeight: "1.5rem",
  textTransform: "capitalize",
}));

const StyledButtonsDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
}));
//Styled components end

const Accordions = () => {
  const [state, dispatch] = useContext(LayoutContext);

  return (
    <StyledAccordionContainer data-testid="accordion-component">
      {state.map((accordion, accordionIndex) => {
        return (
          <StyledAccordion
            accordionIndex={accordionIndex}
            disableGutters={true}
            expanded={accordion.expanded}
          >
            <Pane accordionIndex={accordionIndex} accordion={accordion} />
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
