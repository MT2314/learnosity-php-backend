import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { TabContext, LayoutContext } from "../TabContext";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["Text","Image","Video","Table"],
    drop: (item) => {
      dispatch({
        func: "ADD_COMPONENT",
        tabIndex: tabIndex,
        component: {
          componentName: item.componentName,
          componentProps: JSON.parse(item.componentProps),
        },
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="tab-body"
      key={id}
      data-testid='tab-drop-zone'
    >
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder isOver={isOver}/>
      ) : (
        <ul>
          {components.map((component, compIndex) => {
            return (
              <TabComponent
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
