import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextField } from "@material-ui/core";
import styled from '@emotion/styled';

const StyledAccordionTitle = styled(TextField)(({theme}) => ({

    '.MuiInputLabel-root':{
    },

}))

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {

    const [state, dispatch] = useContext(LayoutContext)

    const handleTitleChange = useCallback((e) => {
        dispatch({
          func: "CHANGE_TITLE",
          title: e.target.value,
          layerIndex: accordionIndex,
        });
      }, []);

    return (
            <StyledAccordionTitle
                key={`accordion-title-${accordionIndex}`}
                aria-label={accordionTitle ? accordionTitle : `Untitled ${placeholderTitle}`}
                fullWidth={true}
                label={placeholderTitle}
                id={`textfield-${accordionIndex}`}
                placeholder={placeholderTitle}
                value={accordionTitle}
                InputProps={{ disableUnderline: true }}
                onChange={handleTitleChange}
             />
    )
}

export default AccordionTitle