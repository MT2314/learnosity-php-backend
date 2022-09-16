import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextField} from "@material-ui/core";

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {

    const [, dispatch] = useContext(LayoutContext)

    const handleTitleChange = useCallback((e) => {
        //this if  statement give the input filed a character limit of 200ch
        if( e.target.value.length < 200){
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
            multiline={true}
            maxRows={2}
            InputProps={{ 
                disableUnderline: true

            }}
            onChange={handleTitleChange}
        />
    )
}

export default AccordionTitle