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
      components: [<FormattedText placeholderText="Type stuff here..."/>],
    },
    {
      tabLabel: "Science",
      components: [<FormattedText/>, <FormattedText/>],
    },
  ],
};

const SahilTab = ({ tabsIntroduction, tabs}) => {
  console.log(tabs)
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
        <Tab label="Formatted Text" {...a11yProps(0)} />
        <Tab label="item2" {...a11yProps(1)} />
        <Tab label="Add Component" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormattedText />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddComponentTabs />
      </TabPanel>
      <hr />
    </>
  );
};

export default SahilTab;
