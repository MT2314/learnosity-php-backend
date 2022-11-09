import React, { useContext, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import { TabContext, LayoutContext } from "../TabContext";
import NestedComponentWrapper from "../../../Utility/NestedComponentWrapper";

//components
import Placeholder from "./Placeholder";
import PlaceholderError from "./PlaceholderError";

// NOTE: We can use theme once it is set it up end to end
const StyleTabBody = styled("div")(({ isOver, showError, empty }) => ({
  backgroundColor:
    showError && empty
      ? "rgba(211, 47, 47, 0.04)"
      : isOver && empty
      ? "rgba(21, 101, 192, 0.04)"
      : "#ffffff",
  margin: "10px ,0px",
  padding: "10px",
  border: "0.0625rem solid #BDBDBD",
  borderTop: "none",
}));

const Tab = ({ tab, tabIndex, removeError, setRemoveError }) => {
  const { id, components } = tab;
  const dropRef = useRef(null);

  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);
  const [inContainer, setInContainer] = useState(null);
  const [droppedIndex, setDroppedIndex] = useState(null);
  const [activeComp, setActiveComp] = useState(null);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  // ? Error Message
  const [showError, setShowError] = useState();
  const [showDropError, setShowDropError] = useState();

  // useOnClickOutside(dropRef, () => {
  //   setShowError(false);
  //   setShowDropError(false);
  // });

  const [{ isOver, getItem }, drop] = useDrop(() => ({
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
        item?.delete && item?.delete();
      }
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem(),
    }),
  }));

  // Adding space between Cap except iFrame
  const trimCap = (item) => {
    switch (item) {
      case "IFrame":
        return "iFrame";
      case "InfoBox":
        return "InfoBox";
      case "Tab":
        return "Tabs";
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

  drop(dropRef);

  return (
    <>
      <StyleTabBody
        activeTab={activeTab}
        tabIndex={tabIndex}
        onDragLeave={() => setInContainer(false)}
        onDragOver={() => setInContainer(true)}
        ref={dropRef}
        key={id}
        data-testid="tab-drop-zone"
        isOver={isOver}
        empty={components.length == 0}
        showError={showError}
        role="document"
      >
        {activeTab === tabIndex && components.length === 0 ? (
          <Placeholder isOver={isOver} showError={showError} />
        ) : (
          <div role="list" isOver={isOver}>
            {components.map((component, compIndex) => {
              return (
                <NestedComponentWrapper
                  componentType="tabs"
                  key={`key-component-${compIndex}`}
                  numOfComponent={components.length}
                  componentProps={component.componentProps}
                  component={component}
                  compIndex={compIndex}
                  tabIndex={tabIndex}
                  setIsDragging={setIsDragging}
                  inContainer={inContainer}
                  draggingOver={isOver}
                  setDroppedIndex={setDroppedIndex}
                  droppedIndex={droppedIndex}
                  setActiveComp={setActiveComp}
                  activeComp={activeComp}
                  setShowError={setShowError}
                  setShowDropError={setShowDropError}
                />
              );
            })}
            <PlaceholderError showError={showDropError} />
          </div>
        )}
      </StyleTabBody>
    </>
  );
};
export default Tab;
