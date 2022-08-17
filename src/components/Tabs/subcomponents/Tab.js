import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabContext";
import { useDrop } from "react-dnd";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["COMPONENT"],
    drop: (item) =>
    {console.log("compo prpos",JSON.parse(item.componentProps))
      dispatch({ func: "ADD_COMPONENT", tabIndex: tabIndex, component: { componentName: item.componentName, componentProps: JSON.parse(item.componentProps) } })},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="tab-body"
      key={id}
      style={{
        border: isOver ? "dashed 2px rgba(201, 210, 221, 1)" : "inherit",
        backgroundColor: isOver ? "rgba(233, 236, 244, 0.2)" : "inherit",
        borderRadius: isOver ? 4 : "inherit",
      }}
    >
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder />
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
