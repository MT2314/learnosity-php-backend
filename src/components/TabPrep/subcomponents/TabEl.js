import React, { useContext } from "react";
import { defaultProps, TabContext } from "../TabPrep";

//components
import Placeholder from "./Placeholder";
import TabComponents from "./TabComponents";

const TabEl = ({ tab, tabIndex }) => {

  const { layout } = defaultProps;

  const { id, title, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);

  return (
    <div className="tab-instance" key={id}>
      <div className={`tab-title ${ activeTab === tabIndex ? "active-tab" : ''}`}>
        <h3 onClick={() => setActiveTab(tabIndex)}>{title}</h3>
      </div>
      <div className="tab-body">
        {activeTab === tabIndex && layout[tabIndex].components.length === 0 ? (
          <Placeholder />
        ) : (
          <ul>
            {components.map((component, compIndex) => {
              return (
                <TabComponents
                  component={component}
                  compIndex={compIndex}
                  tabIndex={tabIndex}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default TabEl;
