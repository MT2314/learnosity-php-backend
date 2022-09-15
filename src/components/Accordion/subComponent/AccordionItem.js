import React from "react"
import PlaceHolder from '../subComponent/PlaceHolder'

const AccordionItem = ({accordion, accordionIndex}) => {

    const {components} = accordion
    return (
        <div style={{border:"2px solid red"}}>
            {
            components ?
             components.map((component, compIndex) => (
                <p>{component}</p>
             )
             )   
             :<PlaceHolder/>
            }
        </div>
    )
}

export default AccordionItem