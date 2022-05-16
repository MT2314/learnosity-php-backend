import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "./TabPanel";
import FormattedText from "../FormattedText";
import AddComponentTabs from "./AddComponentTabs";

export const defaultProps = {
  tabsIntroduction: "test",
  tabs: [
    {
      tabLabel: "Geography",
      components: [<FormattedText placeholderText="Type stuff here..." />],
    },
    {
      tabLabel: "Science",
      components: [<FormattedText />, <FormattedText />],
    },
  ],
};

const SahilTab = ({ tabs }) => {
  console.log(tabs);
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
        {tabs.map((tab, index) => (
          <Tab label={tab.tabLabel} {...a11yProps({ index })} />
        ))}
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
