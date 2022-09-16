import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextField} from "@material-ui/core";

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {

    const [, dispatch] = useContext(LayoutContext)

    const handleTitleChange = useCallback((e) => {
        if( e.target.value.length < 10){
           dispatch({
               func: "CHANGE_TITLE",
               title: e.target.value,
               layerIndex: accordionIndex,
           });
        }return
    }, []);

    return (
        <TextField
            key={`accordion-title-${accordionIndex}`}
            accordionTitle={accordionTitle}
            aria-label={accordionTitle ? accordionTitle : `Untitled ${placeholderTitle}`}
            fullWidth={true}
            id={`textfield-${accordionIndex}`}
            placeholder={placeholderTitle}
            value={accordionTitle}
            InputProps={{ disableUnderline: true}}
            onChange={handleTitleChange}
            maxlength="5"
        />
    )
}

export default AccordionTitle