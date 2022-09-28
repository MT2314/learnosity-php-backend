import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Accordion, AccordionDetails } from "@mui/material";
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
  // border: "0.0625rem solid #BDBDBD",
  // borderTop: "none",
}));

const StyledAccordionDetails = styled(AccordionDetails)({
  borderWidth: "0rem 0.0625rem 0.0625rem 0.0625rem",
  borderStyle: "solid",
  borderColor: "#BDBDBD",
});

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
    <StyledAccordionContainer data-testid="accordion-component">
      {/* TODO: Add Expand all and collapse all btns when a second pane is added */}
      {/* <StyledButtonsDiv>
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
            </StyledButtonsDiv> */}
      {state.map((accordion, accordionIndex) => {
        return (
          <StyledAccordion
            accordionIndex={accordionIndex}
            disableGutters={true}
            expanded={accordion.expanded}
          >
            <Pane accordionIndex={accordionIndex} accordion={accordion} />
            <StyledAccordionDetails>
              <AccordionItem
                accordionIndex={accordionIndex}
                accordion={accordion}
              />
            </StyledAccordionDetails>
          </StyledAccordion>
        );
      })}
    </StyledAccordionContainer>
  );
};

export default Accordions;
