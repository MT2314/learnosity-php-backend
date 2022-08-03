import React, { useContext, useCallback } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const enableTitleChange = (e) => {
    e.stopPropagation();
    if (e.target.dataset.id == activeTab) {
      console.log("hit");
      e.target.disabled = false;
    }
  };

  const handleTitleChange = useCallback((e) => {
    console.log(e.target.value);

    dispatch({
      func: "CHANGE_TITLE",
      title: e.target.value,
      id: e.target.dataset.id,
    });
  }, []);

  return (
    <div className="tab-container">
      <button
        onClick={() =>
          dispatch({
            func: "ADD_TAB",
            id: state.length,
            title: `tab ${state.length}`,
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
                onClick={(e) => enableTitleChange(e)}
                onChange={handleTitleChange}
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
