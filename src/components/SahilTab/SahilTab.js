import React, { useState } from "react";
import { Tabs, Tab, Button, TextField } from "@mui/material";
import TabPanel from "./TabPanel";
import AddComponentTabs from "./AddComponentTabs";
import FormattedText from "../FormattedText/FormattedText";

export const defaultProps = {
  tabsIntroduction: null,
  tabs: [],
};

const SahilTab = ({ tabs, setProp = () => {} }) => {
  const [value, setValue] = useState(0);
  const [addComponent, setAddComponent] = useState([]);
  const [tabTitle, setTabTitle] = useState("");
  const [tabTitle1, setTabTitle1] = useState("");
  const [newTab, setNewTab] = useState(false);

  const handleTabChange = (e, newTabIndex) => {
    setValue(newTabIndex);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }

  const handleAddMoreComponent = () => {
    setAddComponent(addComponent.concat(<AddComponentTabs />));
  };

  let newTabIndex;

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
            newTabIndex = tabs.length;
            return <Tab label={tab.tabLabel} {...a11yProps({ index })} />;
          })}
          <Tab label="New Tab" {...a11yProps({ newTabIndex })} />
        </Tabs>
      )}

      {tabs.length === 0 ? (
        <>
          <TabPanel value={value} index={0}>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Tab Title"
              variant="outlined"
              value={tabTitle}
              onChange={(e) => setTabTitle(e.target.value)}
            />
            <AddComponentTabs
              data={tabs}
              setProp={setProp}
              tabTitle={tabTitle}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Tab Title"
              variant="outlined"
              value={tabTitle}
              onChange={(e) => setTabTitle(e.target.value)}
            />
            <AddComponentTabs
              data={tabs}
              setProp={setProp}
              tabTitle={tabTitle}
            />
          </TabPanel>
        </>
      ) : (
        tabs.map((tab, index) => (
          <>
            <TabPanel value={value} index={index}>
              {tab.components.map((component) => {
                if (component.type === "formattedText") {
                  return <FormattedText body={component.body} />;
                }
              })}
            </TabPanel>
          </>
        ))
      )}
      <TabPanel value={value} index={newTabIndex}>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Tab Title"
          variant="outlined"
          value={tabTitle1}
          onChange={(e) => setTabTitle1(e.target.value)}
        />
        <AddComponentTabs
          data={tabs}
          setProp={setProp}
          tabTitleNew={tabTitle1}
          newTab
        />
      </TabPanel>
      {addComponent}
      <Button onClick={handleAddMoreComponent}>add more Component</Button>
    </>
  );
};

export default SahilTab;
