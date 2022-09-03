import React, { useContext, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { TabContext, LayoutContext } from "../TabContext";
import ComponentWrapper from "./ComponentWrapper";

//components
import Placeholder from "./Placeholder";
import PlaceholderError from "./PlaceholderError";

// NOTE: We can use theme once it is set it up end to end
const StyleTabBody = styled("div")(({ theme, isDragging }) => ({
  padding: "10px 10px 20px 10px",
  border: "1px solid #bdbdbd",
  borderTop: "none,",
  backgroundColor: isDragging ? "#E9EDF1" : "white",
}));

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab] = useContext(TabContext);
  const [, dispatch] = useContext(LayoutContext);
  const [isDragging, setIsDragging] = useState(false);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return ["Text", "Table", "Video", "Image"].indexOf(item.componentName) >= 0;
  };

  const [{ isOver, getItem }, drop] = useDrop(() => ({
    accept: [
      "Text",
      "Image",
      "Video",
      "Table",
      "Callout",
      "Tab",
      "QuoteBox",
      "IFrame",
    ],
    drop: async (item, monitor) => {
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
      }
    },
    canDrop: (item) => {
      if (item.within) return false;
      return true;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      getItem: monitor.getItem(),
    }),
  }));

  // Adding space between Cap except iFrame
  const trimCap = (item) => {
    return item === "IFrame"
      ? "iFrame"
      : item.replace(/([A-Z])/g, " $1").trim();
  };

  // Error message stays. This gives the user time to read and learn.
  const [showError, setShowError] = useState();
  useEffect(() => {
    if (isOver && !acceptListComp(getItem)) {
      setShowError(trimCap(getItem.componentName));
    } else if (isOver) {
      setShowError();
    }
  }, [isOver]);

  return (
    <StyleTabBody
      ref={drop}
      key={id}
      data-testid="tab-drop-zone"
      isDragging={isDragging}
    >
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder isOver={isOver} showError={showError} />
      ) : (
        <ul
          style={{
            padding: 0,
            listStyleType: "none",
          }}
          isOver={isOver}
        >
          {components.map((component, compIndex) => {
            return (
              <ComponentWrapper
                key={`key-component-${compIndex}`}
                numOfComponent={components.length}
                component={component}
                compIndex={compIndex}
                tabIndex={tabIndex}
                setIsDragging={setIsDragging}
                // setShowError={setShowError}
              />
            );
          })}
          <PlaceholderError showError={showError} />
        </ul>
      )}
    </StyleTabBody>
  );
};
export default Tab;
