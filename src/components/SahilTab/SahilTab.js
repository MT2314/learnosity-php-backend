import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";
import FormattedText from "../FormattedText";
import AddComponentTabs from "./AddComponentTabs";

export const defaultProps = {
  tabsIntroduction: null,
  tabs:[],
};

const SahilTab = ({ tabs, setProp = () => {} }) => {
 
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newTabIndex) => {
    setValue(newTabIndex);
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Tabs value={value} onChange={handleTabChange}>
        {
          tabs.length === 0
          ? 
          <>
            <Tab label="New Tab" {...a11yProps(0)} />
            <Tab label="New Tab" {...a11yProps(1)} />
          </>
          : tabs.map((tab, index) => (
            <Tab label={tab.tabLabel} {...a11yProps({index})} />
          ))

        }
        {/* {tabs.map((tab, index) => (
          <Tab label={tab.tabLabel} {...a11yProps({index})} />
        ))} */}
      </Tabs>

      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index}>
          {tab.components.map((component) => {
            return component;
          })}
        </TabPanel>
      ))}
    </>
  );
};

export default SahilTab;
