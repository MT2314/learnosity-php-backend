import React, { useState, useContext, useCallback, useRef } from 'react';
import { TabContext, LayoutContext } from '../TabContext';
import { TextareaAutosize } from '@material-ui/core';
import Tab from './Tab';
import ConfigBar from '../subcomponents/ConfigBar';
import TabTitle from './TabTitle';

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);
  const [toolbar, showToolbar] = useState(false);

  return (
    <>
      <div className="tab-container" test-id="tab-component">
        <div
          className="tab-title-wrapper"
          role="tablist"
          onBlur={(e) => {
            const relatedTarget = e.relatedTarget || document.activeElement;
            if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
              showToolbar(false);
            }
          }}
        >
          <div className={toolbar ? 'show-tabtoolbar' : 'hide-tabtoolbar'}>
            <ConfigBar />
          </div>
          {state.map((tabTitle, tabIndex) => {
            return (
              <TabTitle tabTitle={tabTitle} tabIndex={tabIndex} showToolbar={showToolbar}/>
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
    </>
  );
};

export default Tabs;
