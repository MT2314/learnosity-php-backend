import React, { useState } from "react";
import { Button, TabPanel } from "@mui/material";
import componentIndex from "../componentIndex";
import FormattedText from "../FormattedText";
import Image from "../Image/Image";
import "./Tab.css";

export const defaultProps = {
  tabs: [
    { id: 1, name: "Math", content: [] },
    {
      id: 2,
      name: "Geography",
      content: [],
    },
  ],
};

const Tab = ({ tabs, setProp = () => {} }) => {

  const [ currTabIndex, setCurrTabIndex ] = useState(0)

  const handleAddTab = () => {
    const newTabObject = {
      id: tabs.length + 1,
      name: `Tab ${tabs.length + 1}`,
      content: [],
    };

    setProp({
      tabs: [...tabs, newTabObject],
    });
  };

  //add a component to the tab
  const addTabContent = (tabType) => () => {

    const newContent = {
      tabType,
      id: tabs[currTabIndex].content.length,
      ...componentIndex[tabType].defaultProps,
    };

    setProp({
      tabs: tabs.map((tab, tabIndex) => {
        if (tab.id - 1 !== currTabIndex) return tab;
        return {
          ...tabs[tabIndex],
          content: [...tabs[tabIndex].content, newContent],
        };
      }),
    });


  };;


  const handleEditTabName = (e) => {
    const { currentTab } = state;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        return {
          ...tab,
          name: e.target.value,
        };
      } else {
        return tab;
      }
    });

    setState({
      tabs: updatedTabs,
      currentTab: {
        ...currentTab,
        name: e.target.value,
      },
    });
  };

  // const handleDoubleClick = () => {
  //   setState({
  //     ...state,
  //     editTabNameMode: true,
  //   });
  // };

  const createTabs = () => {

    const allTabs = tabs.map((tab, index) => {
      return (
        <li>
            <button
              //className={currentTab.id === tab.id ? "tab active" : "tab"}
              onClick={() => {setCurrTabIndex(index)}}
              // onDoubleClick={() => {
              //   handleDoubleClick(tab);
              // }}
            >
              {tab.name}
            </button>
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

  const setTabProps = (selectedTabIndex, selectedContentIndex) => (stateUpdate) => {
    // More performant alternative, all the ack still?
    console.log(tabs)
    const newTabState = JSON.parse(JSON.stringify(tabs)); // Makes a deep unlinked copy of the object
    const previousContentState = newTabState[selectedTabIndex].content[selectedContentIndex];
    console.log("previousContentState:", previousContentState)
    newTabState[selectedTabIndex].content.splice(selectedContentIndex, 1, {
      ...previousContentState,
      ...stateUpdate,
    });
    setProp({
      tabs: newTabState
    });
  };

  return (
    <div className="container">
      <div className="well">
        <button className="add-tab-button" onClick={handleAddTab}>
          <i className="text-primary fas fa-plus-square" /> Add Tab
        </button>
        {createTabs()}
        {currTabIndex === tabs[currTabIndex].id - 1 && (
          <div className="tab-content">
            <div>
              {Object.keys(componentIndex)
                .filter((key) => {
                  const regex = /formatted|image/i;
                  return key.match(regex);
                })
                .map((componentKey) => (
                  <button onClick={addTabContent(componentKey)}>
                    Add {componentIndex[componentKey].readableName}
                  </button>
                ))}

              {tabs[currTabIndex].content.map((widget, widgetIndex) => {
                return(
                  <div key={`${widget}-${widgetIndex}`}>
                    {
                      widget.tabType === "FormattedText" ?  
                      <FormattedText
                      {...widget}
                        setProp={setTabProps(currTabIndex, widgetIndex)}/>
                        :
                        <Image
                        {...widget}
                        setProp={setTabProps(currTabIndex, widgetIndex)}/>
                    }
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
