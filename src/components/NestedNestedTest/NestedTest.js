import React, { useState } from "react";

import { Button, IconButton, TextField } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

import componentIndex from "../componentIndex";

export const defaultProps = {
  tabs: [
    {
      tabType: "Image",
      id: 71021,
      label: "Tabothy",
      imgSize: "default",
      uploadedImg: "",
      imgLink: "",
      alt: "",
      longDesc: "",
      caption: {
        blocks: [
          {
            key: "3gsp1",
            text: "woo state",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      credit: {
        blocks: [
          {
            key: "fdbtd",
            text: "state woo",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
    {
      tabType: "FormattedText",
      id: 95034,
      label: "Tabamie",
      placeHolderText: "",
      body: {
        blocks: [
          {
            key: "7huli",
            text: "testing state, I hope this works...",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
  ],
};

const TabPanel = ({ tabType, selectedTab, deleteTab, index, ...tabComponentProps }) => {
  if (!(tabType in componentIndex)) return null;
  const TabComponent = componentIndex[tabType].Component;

  if (selectedTab !== index) return null;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ marginTop: "20px", position: "relative" }}
    >
      <div style={{ position: "absolute", display: "flex", top: "-20px", right: "0", zIndex: "10000" }}>
        <IconButton color="warning" aria-label="delete tab" component="span" onClick={deleteTab}>
          <Delete />
        </IconButton>
      </div>
      <TabComponent {...componentIndex[tabType].defaultProps} {...tabComponentProps} />
    </div>
  );
};

const TabNameSetter = ({ setName, name, selectedTabIndex }) => {
  return <TextField variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />;
};

const NestedNestedTest = ({ body, setProp, setNestedProp, tabs = [], ...rest }) => {
  const [tab, setTab] = useState(0);
  const [editTabNameShown, setEditTabNameShown] = useState(false);
  const [currentTabName, setCurrentTabName] = useState(null);

  const setTabProps = (tabIndex) => (stateUpdate) => {
    console.log({ tabIndex, stateUpdate });
    const newTabsState = JSON.parse(JSON.stringify(tabs));
    newTabsState.splice(tabIndex, 1, { ...tabs[tabIndex], ...stateUpdate });
    setProp({ tabs: newTabsState });
  };

  const addTab = (tabType) => () => {
    const newTab = {
      tabType,
      id: Math.floor(Math.random() * 100000),
      label: ["Tabitha", "Tabernacle", "Tabothy", "Tabigold", "Tabie", "Tabamie"][Math.floor(Math.random() * 6)],
      ...componentIndex[tabType].defaultProps,
    };
    setProp({ tabs: [...tabs, newTab] });
    setTab(tabs.length);
  };

  const toggleEditNameMode = () => {
    if (editTabNameShown === false) {
      setCurrentTabName(tabs[tab].label);
      setEditTabNameShown(true);
      return;
    }

    const tabsState = JSON.parse(JSON.stringify(tabs));
    tabsState.splice(tab, 1, { ...tabs[tab], label: currentTabName });
    setProp({ tabs: tabsState });
    setEditTabNameShown(false);
    setCurrentTabName(null);
  };

  return (
    <div style={{ margin: "0.5em", padding: "0.5em", outline: "2px solid blue" }}>
      <div>
        {Object.keys(componentIndex)
          .filter((key) => !key.includes("Nested") && !key.includes("Tab"))
          .map((componentKey) => (
            <Button sx={{ margin: "0 5px" }} type="button" onClick={addTab(componentKey)} variant="outlined">
              Add {componentIndex[componentKey].readableName} tab
            </Button>
          ))}
      </div>
      <IconButton color="warning" aria-label="edit tab name" component="span" onClick={() => toggleEditNameMode()}>
        <Edit />
      </IconButton>
      {editTabNameShown && <TabNameSetter name={currentTabName} setName={setCurrentTabName} selectedTabIndex={tab} />}
      <div style={{ border: "1px solid blueviolet", padding: "4px", marginTop: "10px" }} role="tablist">
        {tabs.map((tabData, index) => (
          <Button
            key={tabData.id}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
            onClick={() => setTab(index)}
            sx={{ margin: "10px 5px", backgroundColor: index !== tab ? "blueviolet" : null, display: "inline-block" }}
            variant="contained"
          >
            {tabData.label}
            <br />
            <span style={{ fontSize: "0.5em" }}>{tabData.tabType}</span>
          </Button>
        ))}
      </div>
      {tabs.map((tabData, index) => (
        <TabPanel
          key={tabData.id}
          selectedTab={tab}
          tabType={tabData.tabType}
          index={index}
          deleteTab={() => setProp({ tabs: tabs.filter((_, tabIndex) => tabIndex !== index) })}
          setProp={setTabProps(index)}
          {...tabData}
        />
      ))}
    </div>
  );
};

export default NestedNestedTest;

/*
Data storage options for Tab, with Image, with Formatted text

{
  [id]: {
    name: "tabs",
    tabs: ['id1', 'id2']
    tab_id1: {
      type: "FormattedText",
      body: 'bodystuff'
    },
    tab_id2: {
      type: "Image",
      imgSize: "default",
      uploadedImg: "<<juno photo here>>",
      imgLink: "",
      alt: "Juno",
      caption: "caption body for formatted text"
    }
  }
}

OR

{
  [id]: {
    name: "tabs",
    tabs: [{
      type: "FormattedText",
      body: 'bodystuff'
    }, {
      type: "Image",
      imgSize: "default",
      uploadedImg: "<<juno photo here>>",
      imgLink: "",
      alt: "Juno",
      caption: "caption body for formatted text"
    }]
  }
}

*/
