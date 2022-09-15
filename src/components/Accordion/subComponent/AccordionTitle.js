import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteactivesContext'
import { TextField } from "@material-ui/core";

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {

    const [state] = useContext(LayoutContext)
    console.log(state)

    const handleTitleChange = useCallback((e) => {
        dispatch({
          func: "CHANGE_TITLE",
          title: e.target.value,
          id: e.target.dataset.id,
        });
      }, []);

    return (
        <div
            key={`accordion-title-${accordionIndex}`}
            aria-label={accordionTitle ? accordionTitle : `Untitled ${placeholderTitle}`}
        >
            <TextField 
                fullWidth 
                label={placeholderTitle} 
                id={`textfield-${accordionIndex}`}
                placeholder={placeholderTitle}
                value={accordionTitle}
             />
        </div>
    )
}

export default AccordionTitle