import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabsMain";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

import { useDrop } from "react-dnd";
import { ListItem } from "@material-ui/core";

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["COMPONENT"],
    drop: (item) => dispatch({func: "ADD_COMPONENT", tabIndex: tabIndex, component: item,}),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="tab-body" key={id} style={{ backgroundColor: isOver ? 'green' : 'inherit'}}>
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder />
      ) : (
        <ul >
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
