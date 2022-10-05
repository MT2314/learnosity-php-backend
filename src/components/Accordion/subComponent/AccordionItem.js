import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { AccordionDetails } from "@mui/material";
import styled from "@emotion/styled";
import {
  ActivePaneContext,
  LayoutContext,
} from "../../../Context/InteractivesContext";
import PlaceHolder from "../subComponent/PlaceHolder";
import NestedComponentWrapper from "../../../Utility/NestedComponentWrapper";

const StyledAccordionDetails = styled(AccordionDetails)(({ isOver }) => ({
  backgroundColor: isOver ? "rgba(21, 101, 192, 0.04)" : "#ffffff",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#BDBDBD",
}));

const AccordionItem = ({ accordion, accordionIndex }) => {
  const { id, components } = accordion;
  const [activeComp, setActiveComp] = useState(null);
  const [activeTab] = useContext(ActivePaneContext);
  const [state, dispatch] = useContext(LayoutContext);
  const [droppedIndex, setDroppedIndex] = useState(null);
  const [inContainer, setInContainer] = useState(null);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  const [showDropError, setShowDropError] = useState();
  const [{ isOver, getItem }, drop] = useDrop(
    () => ({
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
        if (!acceptListComp(item)) setShowDropError(true);
        if (item.within && components.length !== 0) return;
        if (monitor.didDrop()) return;
        if (!monitor.isOver({ shallow: true })) return;
        if (acceptListComp(item)) {
          dispatch({
            func: "ADD_COMPONENT",
            tabIndex: accordionIndex,
            component: {
              componentName: item.componentName,
              componentProps: JSON.parse(item?.componentProps),
            },
          });
          item?.delete && item?.delete();
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        getItem: monitor.getItem(),
      }),
    }),
    [components]
  );

  return (
    <StyledAccordionDetails
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
              componentType='accordion'
              numOfComponent={components.length}
              componentProps={component.componentProps}
              component={component}
              compIndex={compIndex}
              tabIndex={accordionIndex}
              inContainer={inContainer}
              setDroppedIndex={setDroppedIndex}
              setActiveComp={setActiveComp}
              activeComp={activeComp}
              draggingOver={isOver}
            />
          );
        })
      ) : (
        <PlaceHolder />
      )}
    </StyledAccordionDetails>
  );
};

export default AccordionItem;
