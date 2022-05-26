import React, { useState } from "react";
import FormattedText from "../FormattedText";
import uuid from "uuid";
import "./Tab.css";

export const defaultProps = {
  tabs: [
    { id: 1, names: "Maths", content: "" },
    {
      id: 2,
      names: "Geography",
      content: "",
    },
  ],
  currentTab: { id: 1, names: "Tab 1", content: "" },
  editTabNameMode: false,
  editMode: false,
};

const Tab = ({ tabs, setProp = () => {} }) => {
  const [state, setState] = useState(defaultProps);
  const { currentTab, editMode } = state;

  const handleAddTab = () => {
    const newTabObject = {
      id: uuid(),
      names: `Tab ${tabs.length + 1}`,
      content: "",
    };

    setProp({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editTabNameMode: false,
    });
  };

  const handleOnBlur = () => {
    setState({
      ...state,
      editTabNameMode: false,
    });
  };

  const setEditMode = () => {
    setState({
      ...state,
      editMode: !state.editMode,
    });
  };

  const handleContentChange = (e) => {
    const { currentTab } = state;

    const updatedTabs = tabs.map((tab) => {
      if (tab.name === currentTab.name) {
        return {
          ...tab,
          ...state,
          content: e.target.value,
        };
      } else {
        return tab;
      }
    });

    setState({
      ...state,
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        content: e.target.value,
      },
    });
  };

  const handleEditTabName = (e) => {
    const { currentTab } = state;

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
    setState({
      ...state,
      currentTab: tab,
      editTabNameMode: false,
      editMode: false,
    });
  };

  const handleDoubleClick = () => {
    setState({
      ...state,
      editTabNameMode: true,
    });
  };

  const createTabs = () => {
    const { currentTab, editTabNameMode } = state;

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
    const tabToDeleteIndex = tabs.findIndex((tab) => tab.id === tabToDelete.id);

    const updatedTabs = tabs.filter((tab, index) => {
      return index !== tabToDeleteIndex;
    });

    const previousTab =
      tabs[tabToDeleteIndex - 1] || tabs[tabToDeleteIndex + 1] || {};

    setProp({
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
          {editMode ? (
            <div>
              <FormattedText
                onChange={handleContentChange}
                value={state.currentTab.content}
                body={state.currentTab.content}
                setProp={(stateUpdate) =>
                  setProp({ tabBody: stateUpdate.body })
                }
              />
              <button className="save-button" onClick={setEditMode}>
                Done
              </button>
            </div>
          ) : (
            <div>
              <p>{currentTab.content}</p>
              {currentTab.id && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button className="edit-mode-button" onClick={setEditMode}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTab(currentTab)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab;
