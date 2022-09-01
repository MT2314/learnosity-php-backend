import React, { useState, useContext } from 'react';
import { TabContext, LayoutContext } from '../TabContext';

import Tab from './Tab';
import ConfigBar from '../subcomponents/ConfigBar';
import TabTitle from './TabTitle';

const Tabs = () => {
  const [activeTab] = useContext(TabContext);
  const [state] = useContext(LayoutContext);
  const [toolbar, showToolbar] = useState(false);
  return (
    <>
      <div className="tab-container" data-testid="tab-component">
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
              <TabTitle
                key={`tab-title-${tabIndex}`}
                tabTitle={tabTitle}
                tabIndex={tabIndex}
                showToolbar={showToolbar}
              />
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
