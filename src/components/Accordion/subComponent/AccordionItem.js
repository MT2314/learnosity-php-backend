import React, { useState, useEffect, useContext } from "react";
import { useDrop } from "react-dnd";
import { AccordionDetails } from "@mui/material";
import styled from "@emotion/styled";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import {
  ActivePaneContext,
  LayoutContext,
} from "../../../Context/InteractivesContext";

// ? Components
import PlaceHolder from "../subComponent/PlaceHolder";
import PlaceholderError from "./PlaceholderError";
import NestedComponentWrapper from "../../../Utility/NestedComponentWrapper";

const StyledAccordionDetails = styled(AccordionDetails)(
  ({ isOver, showError, empty }) => ({
    backgroundColor:
      showError && empty
        ? "rgba(211, 47, 47, 0.04)"
        : isOver && empty
        ? "rgba(21, 101, 192, 0.04)"
        : "#ffffff",
    borderWidth: "1px",
    margin: "10px ,0px",
    padding: "8px",
    borderStyle: "solid",
    borderColor: "#BDBDBD",
  })
);

const AccordionItem = ({
  accordion,
  accordionIndex,
  removeError,
  setRemoveError,
  paneRef,
}) => {
  const { id, components } = accordion;
  const [activeComp, setActiveComp] = useState(null);
  const [activeTab] = useContext(ActivePaneContext);
  const [state, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);

  const [droppedIndex, setDroppedIndex] = useState(null);
  const [inContainer, setInContainer] = useState(null);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  // ? Error Message
  const [showError, setShowError] = useState();
  const [showDropError, setShowDropError] = useState();

  useOnClickOutside(paneRef, () => {
    setShowError(false), true;
    setShowDropError(false), true;
  });

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
        "Accordion",
        "Tab",
        "section",
      ],
      drop: async (item, monitor) => {
        if (!acceptListComp(item) && components.length !== 0)
          setShowDropError(true);
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

  // Adding space between Cap except iFrame
  const trimCap = (item) => {
    switch (item) {
      case "IFrame":
        return "iFrame";
      case "InfoBox":
        return "InfoBox";
      case "NONLEARNING":
        return "Descriptive Container";
      case "LEARNING":
        return "Learning Container";
      default:
        return item.replace(/([A-Z])/g, " $1").trim();
    }
  };

  useEffect(() => {
    if (isOver && !acceptListComp(getItem)) {
      setShowError(trimCap(getItem.componentName || getItem.type));
    } else if (isOver) {
      setShowError();
      setShowDropError(false);
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  }, [isOver]);

  useEffect(() => {
    setShowError();
    setRemoveError(false);
  }, [removeError]);

  return (
    <StyledAccordionDetails
      data-testid="accordion-dropzone"
      isOver={isOver}
      showError={showError}
      empty={components.length == 0}
      ref={drop}
      onDragLeave={() => setInContainer(false)}
      onDragOver={() => setInContainer(true)}
    >
      {components.length !== 0 ? (
        components.map((component, compIndex) => {
          return (
            <NestedComponentWrapper
              key={`key-component-${compIndex}`}
              componentType="accordion"
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
        <PlaceHolder isOver={isOver} showError={showError} />
      )}
      <PlaceholderError showError={showDropError} />
    </StyledAccordionDetails>
  );
};

export default AccordionItem;
