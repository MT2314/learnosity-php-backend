import React, { useContext } from 'react'
import { LayoutContext } from "../../Tabs/TabContext"
import { TextareaAutosize } from "@material-ui/core";

const AccordionTitle = ({ accordionTitle, accordionIndex, placeholderTitle }) => {
    const [state] = useContext(LayoutContext)

    return (
        <div
            key={`accordion-title-${accordionIndex}`}
            accordionIndex="0"
            aria-label={accordionTitle ? accordionTitle : `Untitled ${placeholderTitle}`}
            className={`accordion-title`}
        >
            <p
                className="placeholder-title"
            >
                {accordionTitle ? accordionTitle : placeholderTitle}
            </p>
        </div>
    )
}

export default AccordionTitle