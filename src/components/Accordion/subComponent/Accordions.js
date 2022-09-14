import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';

import { LayoutContext } from "../../Tabs/TabContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';

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
                            //height: '40px',
                            backgroundColor:'#FFFFFF',
                            borderWidth: state.length - 1 === accordionIndex ? '1px':'1px 1px 0px 1px',
                            borderStyle: 'solid',
                            borderColor:'#BDBDBD',
                        }}
                        >
                        <div className="accordion-title-wrapper" role="accordionlist">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon
                                    sx={{
                                        pointerEvents: "auto"
                                    }}
                                />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ pointerEvents: "none" }}
                            >
                                <AccordionTitle
                                    key={`accordion-title-${accordionIndex}`}
                                    placeholderTitle={accordion.placeholderTitle}
                                    accordionIndex={accordionIndex}
                                    accordionTitle={accordion.title}
                                />
                            </AccordionSummary>
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