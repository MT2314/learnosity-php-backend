import React, { useContext } from "react";
import { LayoutContext, TabContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  
  const [ activeTab, setActiveTab ] = useContext(TabContext);
  const [ state, dispatch ] = useContext(LayoutContext);

  return (
    <div className="tab-container" data-testid='tab-container'>
      <div className="tab-titles">
        {state.map((tabTitle, tabIndex) => {
          return (
            <button key={`tab-title-${tabIndex}`}
              className={`tab-title ${
                activeTab === tabIndex ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tabIndex)}
            >
            {tabTitle.title}
            </button>
          );
        })}
      </div>
      {state.map((tab, tabIndex) => {
        return <Tab tabIndex={tabIndex} tab={tab}/>;
      })}
    </div>
  );
};

export default Tabs;
