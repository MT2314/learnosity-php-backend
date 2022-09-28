import React, { useContext, useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { TabContext, LayoutContext } from "../TabContext";
import ComponentWrapper from "./ComponentWrapper";

//components
import Placeholder from "./Placeholder";
import PlaceholderError from "./PlaceholderError";
import { ActiveComponentProvider } from "../TabContext";

// NOTE: We can use theme once it is set it up end to end
const StyleTabBody = styled("div")(({ isDragging }) => ({
  padding: "10px 10px 20px 10px",
  borderColor: "#bdbdbd",
  borderStyle: "solid",
  borderWidth: "0 1px 1px 1px",
  backgroundColor: isDragging ? "#E9EDF1" : "white",
}));

const Tab = ({ tab, tabIndex, removeError, setRemoveError }) => {
  const { id, components } = tab;
  const dropRef = useRef(null);

  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);
  const [inContainer, setInContainer] = useState(null);
  const [droppedIndex, setDroppedIndex] = useState(null);
  const [ activeComp, setActiveComp] = useState(null);

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
      if (!acceptListComp(item)) setShowDropError(true);
      if (item.within && components.length !== 0) return;
      if (monitor.didDrop()) return;
      if (acceptListComp(item)) {
        dispatch({
          func: "ADD_COMPONENT",
          tabIndex: tabIndex,
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

  // Adding space between Cap except iFrame
  const trimCap = (item) => {
    switch (item) {
      case "IFrame":
        return "iFrame";
      case "InfoBox":
        return "InfoBox";
      default:
        return item.replace(/([A-Z])/g, " $1").trim();
    }
  };

  // Error message stays. This gives the user time to read and learn.
  const [showError, setShowError] = useState();
  useEffect(() => {
    if (isOver && !acceptListComp(getItem)) {
      setShowError(trimCap(getItem.componentName));
    } else if (isOver) {
      setShowError();
      setShowDropError(false);
    }
    setIsDragging(isOver);
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
        isDragging={isDragging}
      >
        {activeTab === tabIndex && components.length === 0 ? (
          <Placeholder isOver={isOver} showError={showError} />
        ) : (
          <div role="list" isOver={isOver}>
            {components.map((component, compIndex) => {
              return (
                <ComponentWrapper
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
