import React, { useContext } from "react";
import { defaultProps, TabContext } from "../TabPrep";
import Placeholder from "./Placeholder";
import TabComponents from "./TabComponents";

const TabEl = ({ tab, tabIndex }) => {

  const { layout } = defaultProps;

  const { id, title, components } = tab;

  const [activeTab, setActiveTab] = useContext(TabContext);

  return (
    <li key={id}>
      <h3 onClick={() => setActiveTab(tabIndex)}>{title}</h3>
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
    </li>
  );
};
export default TabEl;
