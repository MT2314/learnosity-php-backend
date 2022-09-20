import React, { useContext, useState } from 'react'
import { ExpandMore } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styled from '@emotion/styled';
import { LayoutContext } from "../../../Context/InteractivesContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';
import { v4 as uuidv4 } from "uuid";

//styled components for Accordion styles
const StyledAccordion = styled(Accordion)(({ accordionIndex }) => ({
    backgroundColor: '#FFFFFF',
    borderWidth: accordionIndex === 0 ? '1px 1px 0px 1px' : '0px 1px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
}))
const StyledAccordionPane = styled(AccordionSummary)(({accordionIndex,activePane}) => ({
    height: '40px',
    fontSize: '18px',
    color: '#232323',
    letterSpacing: '0.15px',
    fontcolor: "#232323",
    backgroundColor: accordionIndex === activePane ? 'rgba(21, 101, 192, 0.12) !important' : '#fff !important', //!important overrides the MUI grey background. 
}))

const StyledExpandCollapseButton = styled(Button)(({ disabled }) => ({
    fontWeight: '400',
    fontSize: '16px',
    color: disabled ? "#000000" : "#232323",
    letterSpacing: '0.15px',
    lineHeight: '24px',
    textTransform: "capitalize"
}))

const StyledButtonsDiv = styled("div")(() => ({
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px"
}))
//Styled components end

const Accordions = () => {
    const [state, dispatch] = useContext(LayoutContext)
    const [ activePane, setActivePane ] = useState(null)

    return (
        <div className="accordion-container" data-testid="accordion-component">
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
            {state.map((accordion, accordionIndex) => {
                return (
                    <StyledAccordion
                        accordionIndex={accordionIndex}
                        disableGutters={true}
                        expanded={accordion.expanded}
                    >
                        <StyledAccordionPane
                        //id attribute below creates an "aria-labelledby" and is REQUIRED for accessibilty.
                            id={`panel-${accordionIndex + 1}-add-components-${uuidv4()}`}
                            onClick={() => setActivePane(accordionIndex)}
                            accordionIndex={accordionIndex}
                            activePane={activePane}
                            expandIcon={<ExpandMore
                                onClick={() => {
                                    dispatch({
                                        func: "TOGGLE_PANE",
                                        paneIndex: accordionIndex
                                    });
                                }}
                                sx={{
                                    pointerEvents: "auto",
                                }}
                            />}    
                        >
                            <AccordionTitle
                                key={`accordion-title-${accordionIndex}`}
                                placeholderTitle={accordion.placeholderTitle}
                                accordionIndex={accordionIndex}
                                accordionTitle={accordion.title}
                                activePane={activePane}
                            />
                        </StyledAccordionPane>

                        <AccordionDetails
                            sx={{
                                borderWidth: '1px 0px',
                                borderStyle: 'solid',
                                borderColor: '#BDBDBD'
                            }}>
                            <AccordionItem accordionIndex={accordionIndex} accordion={accordion} />
                        </AccordionDetails>
                    </StyledAccordion>
                )
            })}
        </div >
    )
}

export default Accordions;