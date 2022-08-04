import React, { useContext, useCallback } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const enableTitleChange = (e) => {
    e.stopPropagation();
    e.target.dataset.id == activeTab ? (e.target.disabled = false) : null;
  };

  const handleTitleChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_TITLE",
      title: e.target.value,
      id: e.target.dataset.id,
    });
  }, []);

  return (
    <div className="tab-container">
      {/* <button
        onClick={() =>
          dispatch({
            func: "ADD_TAB",
            id: state.length,
            title: `Tab ${state.length + 1}`,
          })
        }
      >
        add tab
      </button> */}

      <div className="tab-title-wrapper">
        {state.map((tabTitle, tabIndex) => {
          return (
            <button
              className={`tab-title ${
                activeTab === tabIndex ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tabIndex)}
            >
              <input
                className="tab-title-input"
                placeholder={`Tab ${tabIndex + 1}`}
                aria-label="tab title input"
                maxLength="200"
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
        return (
          <>
            {activeTab === tabIndex ? (
              <Tab tabIndex={tabIndex} tab={tab} />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Tabs;
