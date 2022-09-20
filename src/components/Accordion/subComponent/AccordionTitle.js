import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextareaAutosize } from "@material-ui/core";
import styled from '@emotion/styled';

const StyledAccordionTitle = styled(TextareaAutosize)(({ activePane, accordionIndexProp }) => (
  {
    fontFamily: '"Inter", sans-serif',
    backgroundColor: 'rgba(21, 101, 192, 0)',
    border: 'none',
    fontSize: '18px',
    fontWeight: 500,
    width: '100%',
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
    '&::placeholder': {
      color: activePane === accordionIndexProp && '#232323',
      opacity: 1,
    },
    '&:focus': {
      border: 'none',
      outline: 'none',
      '&:: placeholder': {
        color: '#232323 ',
        opacity: 0.6,
      },
    },
    ':-ms-input-placeholder': { /* Internet Explorer 10-11 */
      color: activePane === accordionIndexProp && '#232323',
    },

    '::-ms-input-placeholder': { /* Microsoft Edge */
      color: activePane === accordionIndexProp && '#232323',
    }
  }
))

const StyledAccorPlaceholder = styled('div')(({ activePane, accordionIndexProp }) => (
  {
    width: '100%',
    fontSize: '18px',
    wordWrap: 'break-word',
    overflowX: 'hidden',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: activePane == accordionIndexProp ? "unset" : 2,
  }
))

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle, activePane, isActive }) => {

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
            disabled={activePane === accordionIndex ? false : true}
            maxRows="2"
            minRow="1"
            onChange={handleTitleChange}
            value={accordionTitle || ""}

          />
          : <StyledAccorPlaceholder
            accordionIndexProp={accordionIndex}
            activePane={activePane}
          >{accordionTitle ? accordionTitle : placeholderTitle}</StyledAccorPlaceholder>
      }
    </>
  )



}

export default AccordionTitle