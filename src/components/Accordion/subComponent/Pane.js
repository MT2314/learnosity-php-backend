import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import AccordionTitle from "./AccordionTitle";
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { AccordionSummary } from "@material-ui/core";
import { ExpandMore } from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledAccordionPane = styled(AccordionSummary)(({accordionIndex,activePane, isActive}) => ({
  height: '40px',
  fontSize: '18px',
  color: '#232323',
  letterSpacing: '0.15px',
  fontcolor: "#232323",
  backgroundColor: isActive ? 'rgba(21, 101, 192, 0.12) !important' : '#fff !important', //!important overrides the MUI grey background. 
}))

const Pane = ({ accordionIndex, accordion}) => { 

  const [ activePane, setActivePane ] = useState(null)
  const [ isActive, setIsActive ] = useState(false)
  //click outside hook sets active pane to null when user clicks outside the accordion pane
  const paneRef = useRef()
  useOnClickOutside( paneRef, () => setIsActive(false))

  console.log(isActive)
  return (
  <div key={`pane-${accordionIndex}`} ref={paneRef}>
    <StyledAccordionPane
    //id attribute below creates an "aria-labelledby" and is REQUIRED for accessibilty.
        id={`panel-${accordionIndex + 1}-add-components-${uuidv4()}`}
        onClick={() => {setIsActive(true)}}
        accordionIndex={accordionIndex}
        activePane={activePane}
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
            placeholderTitle={accordion.placeholderTitle}
            accordionIndex={accordionIndex}
            accordionTitle={accordion.title}
            activePane={activePane}
            isActive={isActive}
        />
    </StyledAccordionPane>
    </div>
  )
}  
export default Pane;