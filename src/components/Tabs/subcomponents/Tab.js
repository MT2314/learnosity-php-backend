import React, { useContext } from "react";
import { TabContext } from "../TabsMain";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

import { useDrop } from "react-dnd";
import { ListItem } from "@material-ui/core";

const Tab = ({ tab, tabIndex }) => {
  const { id, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["component"],
    drop: (item) => console.log("hello world"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="tab-body" key={id}>
      {activeTab === tabIndex && components.length === 0 ? (
        <Placeholder />
      ) : (
        <ul ref={drop}>
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
