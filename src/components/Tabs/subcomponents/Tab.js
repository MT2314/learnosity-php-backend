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

  const [{ isOver, getItem }, drop] = useDrop(() => ({
    accept: ["Text", "Image", "Video", "Table", "Callout", "Tab", "QuoteBox", "IFrame"],
    drop: (item) => {
      if (item.componentName === 'Text' | 'Table' | 'Video' | 'Image') {
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
      getItem: monitor.getItem()
    }),
  }));

  return (
    <div ref={drop} className="tab-body" key={id} data-testid="tab-drop-zone">
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder isOver={isOver} getItem={getItem} />
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
