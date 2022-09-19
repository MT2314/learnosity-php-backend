import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextareaAutosize } from "@material-ui/core";
import styled from '@emotion/styled';

const StyledAccordionTitle = styled(TextareaAutosize)(({activePane, accordionIndexProp }) => (
    {
      fontFamily: '"Inter", sans-serif',
      backgroundColor: 'rgba(21, 101, 192, 0)',
      border: 'none',
      padding: '0',
      fontSize: '18px',
      fontWeight: 500,
      width: '100%',
      minHeight: '25px',
      maxHeight: '50px',
      resize: 'none',
      textOverflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      '&::-webkit-scrollbar': {
        WebkitAppearance: 'none',
        width: '7px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
        WebkitBoxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
      },
      '&:disabled': {
        background: '#f5f5f5',
      },
      '&::placeholder': {
        color: activePane === accordionIndexProp && 'rgba(35,35,35,1)'
      },
      '&:focus': {
        border: 'none',
        outline: 'none',
        '&:: placeholder': {
        color: 'rgba(35, 35, 35, 0.12)',
        },
      },
    }
  ))

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle, activePane }) => {

    const [, dispatch] = useContext(LayoutContext)

    //dispatches function from Context/InteractivesContext to change title and update data base. 
    const handleTitleChange = useCallback((e) => {
        //this if statement gives the input field a character limit of 200ch
        if (e.target.value.length < 200) {
            dispatch({
                func: "CHANGE_TITLE",
                title: e.target.value,
                layerIndex: accordionIndex,
            });
        } return
    }, []);

    return (
        <>
            {
                accordionIndex === activePane ?
                <StyledAccordionTitle
                activePane={activePane}
                accordionIndexProp={accordionIndex}
                placeholder={placeholderTitle}
                aria-label="accordion title input"
                aria-multiline="true"
                disabled={activePane == accordionIndex ? false : true}
                maxRows="2"
                onChange={handleTitleChange}
                value={accordionTitle || ""}
                
              />
                :<p>{accordionTitle ? accordionTitle : placeholderTitle}</p>
            }
        </>
    )



}

export default AccordionTitle