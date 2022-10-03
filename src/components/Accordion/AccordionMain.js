import React from "react";
import { v4 as uuidv4 } from "uuid";
import { LayoutProvider } from "../../Context/InteractivesContext";
import Accordions from "./subComponent/Accordions";

//Accordion default props
export const defaultProps = {
  layoutState: [
    {
      id: uuidv4(),
      title: "",
      placeholderTitle: "Pane 1",
      components: ["1"],
      expanded: false,
    }
  ],
};

const AccordionMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    // <DndProvider backend={HTML5Backend}>
    <LayoutProvider layoutState={layoutState} setProp={setProp}>
      <Accordions />
    </LayoutProvider>
    // </DndProvider>
  );
};

export default AccordionMain;
