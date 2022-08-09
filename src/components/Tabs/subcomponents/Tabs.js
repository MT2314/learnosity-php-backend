import React, { useContext, useCallback } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

import { useDrag } from 'react-dnd';

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const enableTitleChange = (e) => {
    e.stopPropagation();
    if (e.target.dataset.id == activeTab) {
      e.target.disabled = false;
      e.target.style.overflow = "unset";
      // e.target.style.WebkitLineClamp = "unset";
    }
  };

  const handleTitleChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_TITLE",
      title: e.target.value,
      id: e.target.dataset.id,
    });
  }, []);

  const handleTitleBlur = (e) => {
    e.target.style.overflow = "hidden";
    e.target.scrollTo(0, 0);
  };

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'component',
    item: { type: 'component', msg: 'i am button'}
  }))

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
      <button ref={drag}>test drag</button>

      <div className="tab-title-wrapper">
        {state.map((tabTitle, tabIndex) => {
          return (
            <button
              key={`tab-title-${tabIndex}`}
              className={`tab-title ${
                activeTab === tabIndex ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(tabIndex)}
            >
              <textarea
                className="tab-title-input"
                placeholder={`Tab ${tabIndex + 1}`}
                aria-label="tab title input"
                maxLength="200"
                disabled={activeTab == tabIndex ? false : true}
                onClick={(e) => enableTitleChange(e)}
                onChange={handleTitleChange}
                data-id={tabIndex}
                value={state[tabIndex].title}
                rows="2"
                wrap="hard"
                style={{
                  WebkitLineClamp: activeTab == tabIndex ? "unset" : 2,
                  // WebkitLineClamp: 2,
                }}
                onBlur={handleTitleBlur}
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
