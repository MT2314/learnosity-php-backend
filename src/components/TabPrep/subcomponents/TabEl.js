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
      <div className="tab-body" key={id}>
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
  );
};
export default TabEl;
