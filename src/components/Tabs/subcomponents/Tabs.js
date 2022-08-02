import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);


  return (
    <div className="tab-container">
      <button onClick={() => dispatch({ func: "ADD_TAB", title: "Tab 3" })}>
        add tab
      </button>
      <div className="tab-titles">
        {state.map((tab, tabIndex) => {
          return (
            <div
              className={`tab-title ${
                activeTab === tabIndex ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tabIndex)}
            >
              <h3>{tab.title}</h3>
            </div>
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
