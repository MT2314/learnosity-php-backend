import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";
import AddComponentTabs from "./AddComponentTabs";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [],
};

const SahilTab = ({ tabs, setProp = () => {} }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newTabIndex) => {
    setValue(newTabIndex);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  let newTabIndex

  return (
    <>
      {tabs.length === 0 ? (
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="New Tab" {...a11yProps(0)} />
          <Tab label="New Tab" {...a11yProps(1)} />
        </Tabs>
      ) : (
        <Tabs value={value} onChange={handleTabChange}>
          {tabs.map((tab, index) => {
            newTabIndex = tabs.length
            return <Tab label={tab.tabLabel} {...a11yProps({ index })} />
          }
          )}
          <Tab label="New Tab" {...a11yProps({newTabIndex})}/>
        </Tabs>
      )}

      {tabs.length === 0 ? (
        <>
          <TabPanel value={value} index={0}>
            <AddComponentTabs data={tabs} setProp={setProp} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddComponentTabs data={tabs} setProp={setProp} />
          </TabPanel>
        </>
      ) : (
        tabs.map((tab, index) => (
          <>
          <TabPanel value={value} index={index}>
            {tab.components.map((component) => {
              return component;
            })}
          </TabPanel>
          <TabPanel value={value} index={newTabIndex}>
            <AddComponentTabs data={tabs} setProp={setProp} />
          </TabPanel>
          </>
        ))
      )}
    </>
  );
};

export default SahilTab;
