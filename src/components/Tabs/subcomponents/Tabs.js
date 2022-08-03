import React, { useContext, useState } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const [saveText, setSaveText] = useState("");

  const test = (e) => {
    e.stopPropagation();
    if (e.target.dataset.id == activeTab) {
      console.log(e.target);
      console.log(typeof e.target.dataset.id);
      console.log("dataid:", e.target.dataset.id);
      console.log("activeTab:", activeTab);
      e.target.disabled = false;

      dispatch({
        func: "CHANGE_TITLE",
        title: saveText,
        // id: state.length + 1,
        // title: `tab ${state.length + 1}`,
      });
    } else {
      console.log("fail");
    }
  };

  return (
    <div className="tab-container">
      <button
        onClick={() =>
          dispatch({
            func: "ADD_TAB",
            id: state.length + 1,
            title: `tab ${state.length + 1}`,
          })
        }
      >
        add tab
      </button>

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
              <input
                type="text"
                placeholder={tabTitle.title}
                aria-label="testing"
                disabled={activeTab == tabIndex ? false : true}
                onClick={(e) => test(e)}
                onChange={(e) => setSaveText(e.target.value)}
                data-id={tabIndex}
              />
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
