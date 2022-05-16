import React, { useState } from "react";
import { Tabs, Tab, TextField, Button } from "@mui/material";
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
  const [tabTitle, setTabTitle] = useState("Add Component");
  const [addComponent, setAddComponent] = useState([]);
  const handleTabChange = (e, newTabIndex) => {
    setValue(newTabIndex);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleSubmit = () => {
    defaultProps.tabs.push({ title: tabTitle });
    console.log(defaultProps);
  };

  const handleAddMoreComponent = () => {
    setAddComponent(
      addComponent.concat(
        <AddComponentTabs
          submitComponent={handleSubmit}
          addMoreComponent={handleAddMoreComponent}
        />
      )
    );
  };
  console.log(addComponent);

  return (
    <>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Formatted Text" {...a11yProps(0)} />
        <Tab label="item2" {...a11yProps(1)} />
        <Tab label={tabTitle} {...a11yProps(2)} />
      </Tabs>
      <TextField
        value={tabTitle}
        onChange={(e) => {
          setTabTitle(e.target.value);
        }}
      />
      <TabPanel value={value} index={0}>
        <FormattedText />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddComponentTabs submitComponent={handleSubmit} />
      </TabPanel>
      {addComponent}
      <Button onClick={handleAddMoreComponent}>add more Component</Button>
      <hr />
    </>
  );
};

export default SahilTab;
