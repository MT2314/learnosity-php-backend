import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import styled from '@emotion/styled';
import AccordionTitle from "./AccordionTitle";

const StyledAccordionPane = styled(AccordionSummary)(({isActive}) => ({
  height: '40px',
  fontSize: '18px',
  color: '#232323',
  letterSpacing: '0.15px',
  fontcolor: "#232323",
  backgroundColor: isActive ? 'rgba(21, 101, 192, 0.12) !important' : '#fff !important', //!important overrides the MUI grey background. 
}))

const Pane = ({ accordionIndex, accordion}) => { 

  const { title, placeholderTitle } = accordion

  const [ isActive, setIsActive ] = useState(false)
  //click outside hook sets active pane to null when user clicks outside the accordion pane
  const paneRef = useRef()
  useOnClickOutside( paneRef, () => setIsActive(false))

  return (
  <div key={`pane-${accordionIndex}`} ref={paneRef}>
    <StyledAccordionPane
    //id attribute below creates an "aria-labelledby" and is REQUIRED for accessibilty.
        id={`panel-${accordionIndex + 1}-add-components-${uuidv4()}`}
        onClick={() => {setIsActive(true)}}
        accordionIndex={accordionIndex}
        isActive={isActive}
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
            placeholderTitle={placeholderTitle}
            accordionIndex={accordionIndex}
            accordionTitle={title}
            isActive={isActive}
        />
    </StyledAccordionPane>
    </div>
  )
}  
export default Pane;