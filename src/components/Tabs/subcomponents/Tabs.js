import React, { useContext, useCallback, useState, useRef } from "react";
import { TabContext, LayoutContext } from "../TabsMain";
import Tab from "./Tab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const titleRef = useRef([]);
  // const [toggleEllipsis, setToggleEllipsis] = useState(true);

  const enableTitleChange = (e) => {
    e.stopPropagation();
    if (e.target.dataset.id == activeTab) {
      console.log("active", e.target);
      console.log("webkit line clamp", e.target.style.WebkitLineClamp);
      e.target.disabled = false;

      for (let i = 0; i < titleRef.current.length; i++) {
        if (e.target.dataset.id === titleRef.current[i].dataset.id) {
          console.log("hit");
          console.log(titleRef.current[i]);
          titleRef.current[i].style.WebkitLineClamp = "unset";
        } else {
          console.log("false");
          console.log(titleRef.current[i]);
          titleRef.current[i].style.WebkitLineClamp = 2;
        }
      }

      // e.target.style.WebkitLineClamp = "unset";
      // setToggleEllipsis(false);
    }
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
      <button
        onClick={() =>
          dispatch({
            func: "ADD_TAB",
            id: state.length,
            title: `Tab ${state.length + 1}`,
          })
        }
      >
        add tab
      </button>

      <div className="tab-title-wrapper">
        {/* {console.log(toggleEllipsis)} */}
        {state.map((tabTitle, tabIndex) => {
          return (
            <button
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
                rows="2"
                wrap="hard"
                style={{
                  overflow: "hidden",
                  resize: "none",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  // WebkitLineClamp: toggleEllipsis ? 2 : 0,
                }}
                ref={(el) => (titleRef.current[tabIndex] = el)}
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
