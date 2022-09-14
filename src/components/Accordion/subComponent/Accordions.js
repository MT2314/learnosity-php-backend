import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import styled from '@emotion/styled';
import { LayoutContext } from "../../Tabs/TabContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';

//styled components for Accordion styles
const StyledAccordion = styled(Accordion)(({accordionIndex}) => ({
    backgroundColor:'#FFFFFF',
    borderWidth: accordionIndex === 0 ? '1px 1px 0px 1px': '0px 1px 1px 1px' ,
    borderStyle: 'solid',
    borderColor:'#BDBDBD',
}))
const StyledAccordionPane = styled(AccordionSummary)(() => ({
    height:'40px',
    fontSize:'18px',
    color: '#232323',
    letterSpacing:'0.15px'
    //TODO: on expand add border to the panes
}))
//Styled components end

const Accordions = () => {
    const [state] = useContext(LayoutContext)
    return (
        <div className="accordion-container" data-testid="accordion-component">
            {state.map((accordion, accordionIndex) => {
                return (
                    <StyledAccordion
                        accordionIndex={accordionIndex}
                        disableGutters={true}
                        >
                        <div className="accordion-title-wrapper" role="accordionlist">
                            <StyledAccordionPane
                                accordionIndex={accordionIndex}
                                expandIcon={<ExpandMoreIcon
                                    sx={{
                                        pointerEvents: "auto",
                                    }}
                                />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <AccordionTitle
                                    key={`accordion-title-${accordionIndex}`}
                                    placeholderTitle={accordion.placeholderTitle}
                                    accordionIndex={accordionIndex}
                                    accordionTitle={accordion.title}
                                />
                            </StyledAccordionPane>
                        </div>
                        <AccordionDetails>
                            <AccordionItem accordionIndex={accordionIndex} accordion={accordion} />
                        </AccordionDetails>
                    </StyledAccordion>
                )
            })}
        </div >
    )
}

export default Accordions;