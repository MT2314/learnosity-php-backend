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
              {console.log(activeTab)}
              <input
                type="text"
                className="tab-title-input"
                placeholder={tabTitle.title}
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
