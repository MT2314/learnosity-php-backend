import React, { useContext, useCallback, useRef } from "react";
import { TabContext, LayoutContext } from "../TabContext";
import Tab from "./Tab";
import TabTitle from './TabTitle'

const Tabs = () => {
  const [activeTab] = useContext(TabContext);
  const [state] = useContext(LayoutContext);

  return (
    <div className="tab-container">
      <div className="tab-title-wrapper" role="tablist">
        {state.map((tabTitle, tabIndex) => (
          <TabTitle
            tabTitle={tabTitle}
            tabIndex={tabIndex}/>
        ))}
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
