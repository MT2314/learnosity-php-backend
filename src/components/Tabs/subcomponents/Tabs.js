import React, { useContext } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const test = (e) => {
    e.stopPropagation();
    if (e.target.dataset.id == activeTab) {
      console.log(e.target);
      console.log(typeof e.target.dataset.id);
      console.log("dataid:", e.target.dataset.id);
      console.log("activeTab:", activeTab);
    } else {
      console.log("fail");
    }
  };

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
              {console.log(activeTab)}
              <span onClick={(e) => test(e)} data-id={tabIndex}>
                {tabTitle.title}
              </span>
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
