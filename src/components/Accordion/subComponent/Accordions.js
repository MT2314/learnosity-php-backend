import React, { useContext, useCallback } from 'react'
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styled from '@emotion/styled';
import { LayoutContext } from "../../Tabs/TabContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';

//styled components for Accordion styles
const StyledAccordion = styled(Accordion)(({ accordionIndex }) => ({
    backgroundColor: '#FFFFFF',
    borderWidth: accordionIndex === 0 ? '1px 1px 0px 1px' : '0px 1px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
}))
const StyledAccordionPane = styled(AccordionSummary)(() => ({
    height: '40px',
    fontSize: '18px',
    color: '#232323',
    letterSpacing: '0.15px'
}))
//Styled components end

const Accordions = () => {
    const [state, dispatch] = useContext(LayoutContext)

    return (
        <div className="accordion-container" data-testid="accordion-component">
            <button
                onClick={() => {
                    dispatch({
                        func: "EXPAND_ALL_PANE",
                        array: state
                    });
                }}
                disabled={state.every(s => s.expanded === true)}
            >
                Expand All
            </button>
            <br />
            <button disabled={state.every(s => s.expanded === false)}>Collapse All</button>
            {state.map((accordion, accordionIndex) => {
                return (
                    <StyledAccordion
                        accordionIndex={accordionIndex}
                        disableGutters={true}
                        expanded={accordion.expanded}
                    >
                        <div className="accordion-title-wrapper">
                            <StyledAccordionPane
                                accordionIndex={accordionIndex}
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
                                id={`panel${accordionIndex}-header`}
                            >
                                <AccordionTitle
                                    key={`accordion-title-${accordionIndex}`}
                                    placeholderTitle={accordion.placeholderTitle}
                                    accordionIndex={accordionIndex}
                                    accordionTitle={accordion.title}
                                />
                            </StyledAccordionPane>
                        </div>
                        <AccordionDetails
                            sx={{
                                borderWidth: '1px 0px',
                                borderStyle: 'solid',
                                borderColor: '#BDBDBD'
                            }}>
                             <AccordionItem accordionIndex={accordionIndex} accordion={accordion}/>
                        </AccordionDetails>
                    </StyledAccordion>
                )
            })}
        </div >
    )
}

export default Accordions;