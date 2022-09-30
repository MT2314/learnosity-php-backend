import React, { useContext, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";
import {
  TabContext,
  LayoutContext,
} from "../../../Context/InteractivesContext";
import PlaceHolder from "../subComponent/PlaceHolder";
import NestedComponentWrapper from '../../../Utility/NestedComponentWrapper'

const StyleAccordionBody = styled("div")(({ isOver }) => ({
  backgroundColor: isOver ? "#E9EDF1" : "white",
}));

const AccordionItem = ({ accordion, accordionIndex }) => {
  const { id, components } = accordion;
  const [ activeComp, setActiveComp] = useState(null);
  const [activeTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);
  const [droppedIndex, setDroppedIndex] = useState(null);
  const [inContainer, setInContainer] = useState(null);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  const [showDropError, setShowDropError] = useState();
  const [{ isOver, getItem }, drop] = useDrop(() => ({
    accept: [
      "Text",
      "Image",
      "Video",
      "Table",
      "InfoBox",
      "QuoteBox",
      "IFrame",
    ],
    drop: async (item, monitor) => {
      console.log(item)
      if (!acceptListComp(item)) setShowDropError(true);
      if (item.within && components.length !== 0) return;
      if (monitor.didDrop()) return;
      if (acceptListComp(item)) {
        dispatch({
          func: "ADD_COMPONENT",
          tabIndex: activeTab,
          component: {
            componentName: item.componentName,
            componentProps: JSON.parse(item?.componentProps),
          },
        });
        item?.delete && item?.delete(item.tabIndex, item.compIndex);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem(),
    }),
  }));

  return (
    <StyleAccordionBody
      data-testid="accordion-dropzone"
      isOver={isOver}
      ref={drop}
      onDragLeave={() => setInContainer(false)}
      onDragOver={() => setInContainer(true)}
    >
      {components.length !== 0 ? (
        components.map((component, compIndex) => {
          return (
            <NestedComponentWrapper
              key={`key-component-${compIndex}`}
              numOfComponent={components.length}
              componentProps={component.componentProps}
              component={component}
              compIndex={compIndex}
              tabIndex={activeTab}
              inContainer={inContainer}
              setDroppedIndex={setDroppedIndex}
              setActiveComp={setActiveComp}
              activeComp={activeComp}
              />
          );
        })
      ) : (
        <PlaceHolder />
      )}
    </StyleAccordionBody>
  );
};

export default AccordionItem;
