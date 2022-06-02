import React, { useState } from "react";
import { Button, TabPanel } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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
  const [currTabIndex, setCurrTabIndex] = useState(0);
  const [currContentIndex, setCurrContentIndex] = useState(0);
  const [editMode, setEditoMode] = useState(false);
  const[tabName, setTabName] = useState(tabs[currTabIndex].name)

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
  };

  const createTabs = () => {
    const allTabs = tabs.map((tab, index) => {
      return (
        <li>
          <button
            onClick={() => {
              setCurrTabIndex(index);
              setTabName(tabs[index].name)
            }}
          >
            {tab.name}
          </button>
        </li>
      );
    });

    const handleEditTab = () => {
      setEditoMode(true)
    };
    
    const handleRename = (tabi, updatedName) => {
      setProp({
        tabs: tabs.map((tab, tabIndex) => {
          if (tab.id !== tabi) return tab;
          return {
            ...tabs[tabIndex],
            name: updatedName
          };
        }),
      });
      setEditoMode(false)
    }

    return (
      <>
        <ul className="nav nav-tabs">{allTabs}</ul>
        {editMode === false && (
          <button
            onClick={handleEditTab}
          >
            Edit Current Tab Name
          </button>
        )}
        {editMode && (
          <>
          <input type="text" value={tabName} onChange={(e)=> {setTabName(e.target.value)}} placeholder="enter tab rename"/>
          <button onClick={()=>{handleRename(tabs[currTabIndex].id,tabName)}}>Done</button>
          </>
        )}
      </>
    );
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
        <Button 
        variant="outlined"
        //className="add-tab-button"
        startIcon={<AddIcon/>} 
        onClick={handleAddTab}>
         Add Tab
        </Button>
        {createTabs()}
          <div className="tab-content">
            <div>
              {Object.keys(componentIndex)
                .filter((key) => {
                  const regex = /formatted|image/i;
                  return key.match(regex);
                })
                .map((componentKey) => (
                  <Button 
                    onClick={addTabContent(componentKey)}
                    variant="outlined">
                    Add {componentIndex[componentKey].readableName}
                  </Button>
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
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Tab;
