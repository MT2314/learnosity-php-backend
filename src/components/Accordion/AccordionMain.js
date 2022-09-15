import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutProvider } from "../../Context/InteractivesContext";
import Accordions from "./subComponent/Accordions"

//Accordion default props
export const defaultProps = {
    layoutState: [
        {
            id: uuidv4(),
            title: "",
            placeholderTitle: "Pane 1",
            components: [],
            expanded: false
        }, 
        {
            id: uuidv4(),
            title: "testy",
            placeholderTitle: "Pane 2",
            components: [],
            expanded: true
        }
    ],
};

const AccordionMain = ({ layoutState = [], setProp = () => { } }) => {
    return (
        // <DndProvider backend={HTML5Backend}>
            <LayoutProvider layoutState={layoutState} setProp={setProp}>
                <Accordions />
            </LayoutProvider>
        // </DndProvider>
    );
}

export default AccordionMain;
