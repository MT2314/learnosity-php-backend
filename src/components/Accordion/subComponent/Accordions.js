import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import styled from '@emotion/styled';
import { LayoutContext } from "../../Tabs/TabContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';

const StyledAccordionPane = styled(AccordionSummary)(() => ({
    height:'40px'
}))

const Accordions = () => {
    const [state] = useContext(LayoutContext)
    console.log('state:',state.length - 1)
    return (
        <div className="accordion-container" data-testid="accordion-component">
            {state.map((accordion, accordionIndex) => {
                return (
                    <Accordion
                        disableGutters={true}
                        sx={{
                            backgroundColor:'#FFFFFF',
                            borderWidth: state.length - 1 === accordionIndex ? '1px':'1px 1px 0px 1px',
                            borderStyle: 'solid',
                            borderColor:'#BDBDBD',
                        }}
                        >
                        <div className="accordion-title-wrapper" role="accordionlist">
                            <StyledAccordionPane
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
                    </Accordion>
                )
            })}
        </div >
    )
}

export default Accordions;