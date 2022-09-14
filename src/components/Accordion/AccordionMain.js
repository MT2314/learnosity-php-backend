import React from 'react'

//Accordion default props
export const defaultProps = {
    layoutState: [
        {
            id: uuidv4(),
            title: "",
            placeholderTitle: "Pane 1",
            components: [],
        }
    ],
};

const AccordionMain = () => {
    return <h2>I am Accordion</h2>
}

export default AccordionMain;
