import React, { useState, useContext } from "react";
import { TabContext, LayoutContext } from "../TabContext";
import styled from "@emotion/styled";

import Tab from "./Tab";
import ConfigBar from "../subcomponents/ConfigBar";
import TabTitle from "./TabTitle";

const StyledTabContainer = styled("div")(({ theme }) => (
  {
  boxSizing:'border-box',
  //TODO: import the font-family from Saas with theme?  or import from google fonts. 
  //fontFamily: '"Inter", sans-serif',
  letterSpacing: '0.1px',
  lineHeight: '25px',
  color: '#636363',
}));

const StyledTabTitleWrapper = styled("div")(({ theme }) => (
  {
    display: 'flex',
    minHeight: '40px',
    maxHeight: '69px',

  }));

  const StyledToolBar = styled('div')(({theme, toolbar }) => (
    {
      display: toolbar ? 'block ' : 'none',
      position: 'fixed ',
      top: '80px ',
      left: '50% ',
      transform: 'translateX(-50%) ',
      zIndex: '1000',
      justifyContent: 'center ',
      backgroundColor: '#fff ',
    }
  ))

const Tabs = () => {
  const [activeTab] = useContext(TabContext);
  const [state] = useContext(LayoutContext);
  const [toolbar, showToolbar] = useState(false);
  const [removeError, setRemoveError] = useState(false);
  return (
    <>
      <StyledTabContainer data-testid="tab-component">
        <StyledTabTitleWrapper
          role="tablist"
          onBlur={(e) => {
            const relatedTarget = e.relatedTarget || document.activeElement;
            if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
              showToolbar(false);
            }
          }}
        >
          <StyledToolBar
            toolbar={toolbar}>
            <ConfigBar setRemoveError={setRemoveError} />
          </StyledToolBar>
          {state.map((tab, tabIndex) => {
            return (
              <TabTitle
                key={`tab-title-${tabIndex}`}
                tabTitle={tab.title}
                tab={tab}
                placeholderTitle={tab.placeholderTitle}
                tabIndex={tabIndex}
                showToolbar={showToolbar}
              />
            );
          })}
        </StyledTabTitleWrapper>
        {state.map((tab, tabIndex) => {
          return (
            <>
              {activeTab === tabIndex ? (
                <Tab
                  tabIndex={tabIndex}
                  tab={tab}
                  removeError={removeError}
                  setRemoveError={setRemoveError}
                />
              ) : null}
            </>
          );
        })}
      </StyledTabContainer>
    </>
  );
};

export default Tabs;
