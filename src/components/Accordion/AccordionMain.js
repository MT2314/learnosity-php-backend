import React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
      components: [],
      expanded: true,
    },
  ],
};

const AccordionMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={layoutState} setProp={setProp}>
        <Accordions />
      </LayoutProvider>
    </DndProvider>
  );
};

AccordionMain.propTypes = {
  layoutState: PropTypes.array.isRequired,
  setProp: PropTypes.func.isRequired,
};

export default AccordionMain;
