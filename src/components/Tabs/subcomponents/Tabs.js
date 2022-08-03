import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);


  return (
    <div className="tab-container">
      <div className="tab-titles">
        {state.map((tabTitle, tabIndex) => {
          return (
            <button
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
        return <Tab tabIndex={tabIndex} tab={tab} />;
      })}
    </div>
  );
};

export default Tabs;
