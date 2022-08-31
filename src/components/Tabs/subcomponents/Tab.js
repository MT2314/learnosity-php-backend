import React, { useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import { TabContext, LayoutContext } from "../TabContext";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab] = useContext(TabContext);

  const [, dispatch] = useContext(LayoutContext);

  const [{ isOver, canDrop, isOverCurrent }, drop] = useDrop(() => ({
    accept: ["Text", "Image", "Video", "Table", "Callout", "Descriptive", "Learning", "Tabs", "Quote Box", "iFrame"],
    // accept: ["Text", "Image", "Video", "Table"],
    drop: (item) => {
      if (item.componentName === 'Callout') {
        alert("Reject Callout");
      } else {
        dispatch({
          func: "ADD_COMPONENT",
          tabIndex: tabIndex,
          component: {
            componentName: item.componentName,
            componentProps: JSON.parse(item.componentProps),
          }
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    canDrop: (item) => {
      if (item.componentName === 'Text' |
      item.componentName === 'Table' |
      item.componentName === 'Video' |
      item.componentName === 'Image' 
      ) {
        return true
      } else {
        console.log("Cannot add to tab");
      }
    }
  }));

  return (
    <div ref={drop} className="tab-body" key={id} data-testid="tab-drop-zone">
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder isOver={isOver} />
      ) : (
        <ul>
          {components.map((component, compIndex, index) => {
            return (
              <TabComponent
                key={index}
                component={component}
                compIndex={compIndex}
                tabIndex={tabIndex}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Tab;
