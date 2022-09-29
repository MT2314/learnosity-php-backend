import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Accordion, AccordionDetails } from "@mui/material";
import styled from "@emotion/styled";
import { LayoutContext } from "../../../Context/InteractivesContext";
import AccordionItem from "./AccordionItem";
import Pane from "./Pane";

//styled components for Accordion styles
const StyledAccordion = styled(Accordion)(({ accordionIndex }) => ({
  backgroundColor: "#FFFFFF",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#BDBDBD",
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
//Styled components end

const Accordions = () => {
  const [state, dispatch] = useContext(LayoutContext);

  return (
    <div className="accordion-container" data-testid="accordion-component">
      {state.map((accordion, accordionIndex) => {
        return (
          <StyledAccordion
            accordionIndex={accordionIndex}
            disableGutters={true}
            expanded={accordion.expanded}
          >
            <Pane accordionIndex={accordionIndex} accordion={accordion} />
            <AccordionDetails
              sx={{
                borderWidth: "1px 0px",
                borderStyle: "solid",
                borderColor: "#BDBDBD",
              }}
            >
              <AccordionItem
                accordionIndex={accordionIndex}
                accordion={accordion}
              />
            </AccordionDetails>
          </StyledAccordion>
        );
      })}
    </div>
  );
};

export default Accordions;
