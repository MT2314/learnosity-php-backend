import React, { useContext } from "react";
import { TabContext } from "../TabsMain";

//components
import Placeholder from "./Placeholder";
import TabComponent from "./TabComponent";

const Tab = ({ tab, tabIndex }) => {

  const { id, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);
  
  return (
      <div className="tab-body" key={`tab-${id}`}>
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
