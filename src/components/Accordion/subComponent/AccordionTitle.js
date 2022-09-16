import React, { useContext, useCallback } from 'react'
import { LayoutContext } from '../../../Context/InteractivesContext'
import { TextField} from "@material-ui/core";

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
        <TextField
            key={`accordion-title-${accordionIndex}`}
            name='pane-title'
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