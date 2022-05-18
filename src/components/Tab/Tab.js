import React, { useState } from "react";
import FormattedText from "../FormattedText";
import uuid from "uuid";
import "./Tab.css";
import AddContent from "./AddContent";

export const defaultProps = {
  tabs: [
    { id: 1, names: "Tab 1", content: <AddContent /> },
    {
      id: 2,
      names: "Tab 2",
      content: (
        <>
          <FormattedText />
          <FormattedText />
        </>
      ),
    },
  ],
  currentTab: { id: 1, names: "Tab 1", content: <AddContent /> },
  editTabNameMode: false,
};

const Tab = (defaultProps) => {
  const [state, setState] = useState(defaultProps);
  const { currentTab } = state;

  const handleAddTab = () => {
    const { tabs } = state;

    const newTabObject = {
      id: uuid(),
      names: `Tab ${tabs.length + 1}`,
      content: <AddContent />,
    };

    setState({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editTabNameMode: false,
    });
  };

  const handleOnBlur = () => {
    setState({
      editTabNameMode: false,
    });
  };

  const handleEditTabName = (e) => {
    const { currentTab, tabs } = state;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        return {
          ...tab,
          names: e.target.value,
        };
      } else {
        return tab;
      }
    });

    setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        names: e.target.value,
      },
    });
  };

  const handleSelectTab = (tab) => {
    console.log(tab);
    setState({
      ...state,
      currentTab: tab,
      editTabNameMode: false,
    });
  };

  const handleDoubleClick = () => {
    setState({
      ...state,
      editTabNameMode: true,
    });
  };

  const createTabs = () => {
    const { tabs, currentTab, editTabNameMode } = state;

    const allTabs = tabs.map((tab) => {
      return (
        <li>
          {editTabNameMode && currentTab.id === tab.id ? (
            <input
              value={tab.names}
              onBlur={handleOnBlur}
              onChange={handleEditTabName}
            />
          ) : (
            <button
              className={currentTab.id === tab.id ? "tab active" : "tab"}
              onClick={() => {
                handleSelectTab(tab);
              }}
              onDoubleClick={() => {
                handleDoubleClick(tab);
              }}
            >
              {tab.names}
            </button>
          )}
        </li>
      );
    });

    return <ul className="nav nav-tabs">{allTabs}</ul>;
  };

  const handleDeleteTab = (tabToDelete) => {
    const { tabs } = state;
    const tabToDeleteIndex = tabs.findIndex((tab) => tab.id === tabToDelete.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    setState({
      tabs: updatedTabs,
      editTabNameMode: false,
      currentTab: previousTab,
    });
  };

  return (
    <div className="container">
      <div className="well">
        <button className="add-tab-button" onClick={handleAddTab}>
          <i className="text-primary fas fa-plus-square" /> Add Tab
        </button>
        {createTabs()}
        <div className="tab-content">
          <div>
            <p>{currentTab.content}</p>
            {currentTab.id && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleDeleteTab(currentTab)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
