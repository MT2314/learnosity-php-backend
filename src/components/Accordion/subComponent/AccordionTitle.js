import React, { useContext, useCallback, useState } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextField} from "@material-ui/core";
import styled from '@emotion/styled';

const StyledAccordionTitle = styled(TextField)(({theme}) => ({
    '.MuiInputLabel-root.Mui-focused':{
        visibility:'hidden'
    },
    '.MuiInputLabel-shrink':{
        visibility:'hidden'
    },
    '.MuiFormLabel-root':{
        color:'#232323'
    },
    '.MuiInputBase-input': {
        overflow: "hidden",
        textOverflow: "ellipsis"
      }

}))

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {

    const [, dispatch] = useContext(LayoutContext)

    //dispatches function from Context/InteractivesContext to change title and update data base. 
    const handleTitleChange = useCallback((e) => {
        //this if statement gives the input field a character limit of 200ch
        if( e.target.value.length < 200){
           dispatch({
               func: "CHANGE_TITLE",
               title: e.target.value,
               layerIndex: accordionIndex,
           });
        }return
    }, []);

    return (
        //textfield renders for each pane and will display placeholder text if title is <emptystring>
        <StyledAccordionTitle
            key={`accordion-title-${accordionIndex}`}
            name='pane-title'
            label={placeholderTitle}
            aria-label={accordionTitle ? accordionTitle : `Untitled ${placeholderTitle}`}
            fullWidth={true}
            id={`textfield-${accordionIndex}`}
            placeholder={placeholderTitle}
            value={accordionTitle}
            multiline={true}
            maxRows={2}
            InputProps={{ 
                disableUnderline: true
            }}
            InputLabelProps={{
                disableAnimation: true,
            }}
            onChange={handleTitleChange}
        />
    )
}

export default AccordionTitle