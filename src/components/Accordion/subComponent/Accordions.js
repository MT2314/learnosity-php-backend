import React, { useContext } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { LayoutContext } from "../../Tabs/TabContext";
import AccordionTitle from "./AccordionTitle"
import AccordionItem from './AccordionItem';

const Accordions = () => {
    const [state] = useContext(LayoutContext)
    return (
        <div className="accordion-container" data-testid="accordion-component">
            <Accordion>
                <div className="accordion-title-wrapper" role="accordionlist">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        {state.map((accordion, accordionIndex) => {
                            return (
                                <AccordionTitle
                                    key={`accordion-title-${accordionIndex}`}
                                    placeholderTitle={accordion.placeholderTitle}
                                    accordionIndex={accordionIndex}
                                    accordionTitle={accordion.title}
                                />
                            )
                        })}
                    </AccordionSummary>
                </div>
                <AccordionDetails>
                    {state.map((accordion, accordionIndex) => {
                        return (
                            <AccordionItem accordionIndex={accordionIndex} accordion={accordion} />
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Accordions;