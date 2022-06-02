import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material/";
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
  const [editMode, setEditoMode] = useState(false);
  const[tabName, setTabName] = useState(tabs[currTabIndex].name)
console.log(tabs[currTabIndex])
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
  //maps the tabs default props and creates a tab for each.
  const createTabs = () => {

    const handleDeleteTab = (tabIndex) => {
      const newTabState = JSON.parse(JSON.stringify(tabs)); // Makes a deep unlinked copy of the object
      newTabState.splice(tabIndex, 1);//removes the selected tab
  
      setProp({
        tabs: newTabState //resets the tabs data
      })

      setCurrTabIndex(tabIndex - 1)//set the current tab to the previous tab in list
      
    }

    const allTabs = tabs.map((tab, index) => {
      return (
        <li key={`tab-${index}`}>
          <button
            onClick={() => {
              setCurrTabIndex(index);
              setTabName(tabs[index].name)
            }}
          >
            {tab.name}
          </button>
          <Button onClick={() => handleDeleteTab(index)} startIcon={<Delete/>}></Button>
        </li>
      );
    });

    const handleEditTab = () => {
      setEditoMode(true);
    };

    const handleRename = (tabi, updatedName) => {
      setProp({
        tabs: tabs.map((tab, tabIndex) => {
          if (tab.id !== tabi) return tab;
          return {
            ...tabs[tabIndex],
            name: updatedName,
          };
        }),
      });
      setEditoMode(false)
    }

    return (
      <>
        <ul className="nav nav-tabs">{allTabs}</ul>
        {editMode === false && (
          <button onClick={handleEditTab}>Edit Current Tab Name</button>
        )}
        {editMode && (
          <>
            <input
              type="text"
              value={tabName}
              onChange={(e) => {
                setTabName(e.target.value);
              }}
              placeholder="enter tab rename"
            />
            <button
              onClick={() => {
                handleRename(tabs[currTabIndex].id, tabName);
              }}
            >
              Done
            </button>
          </>
        )}
      </>
    );
  };

    //add a component inside of each tab
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
    //serialize the data set in each component added to tab
  const setTabProps =
    (selectedTabIndex, selectedContentIndex) => (stateUpdate) => {
      // More performant alternative, all the ack still?
      console.log(tabs);
      const newTabState = JSON.parse(JSON.stringify(tabs)); // Makes a deep unlinked copy of the object
      const previousContentState =
        newTabState[selectedTabIndex].content[selectedContentIndex];
      
      newTabState[selectedTabIndex].content.splice(selectedContentIndex, 1, {
        ...previousContentState,
        ...stateUpdate,
      });
      setProp({
        tabs: newTabState,
      });
    };
    //delete a component from tab
  const handleDeleteContent = (selectedTabIndex, selectedContentIndex) => {
    const newTabState = JSON.parse(JSON.stringify(tabs)); // Makes a deep unlinked copy of the object
    newTabState[selectedTabIndex].content.splice(selectedContentIndex, 1);//removes the selected component

    setProp({
      tabs: newTabState //resets the tabs data
    })
    
  }

  return (
    <div className="container" data-testid="tab">
      <div className="well">
        <Button data-testid="add-tab-btn"  variant="outlined" startIcon={<Add />} onClick={handleAddTab}>
          Add Tab
        </Button>
        {/* list of tabs */}
        {createTabs()}
        <div className="tab-content">
          {/* maps through the component index and provides a button for each component that can be added inside a tab */}
            {Object.keys(componentIndex)
              .filter((key) => {
                const regex = /formatted|image/i; //you can add more component options here
                return key.match(regex);
              })
              .map((componentKey) => (
                <Button
                  data-testid={`add-${componentIndex[componentKey].readableName.slice(0,3)}`}
                  onClick={addTabContent(componentKey)}
                  variant="outlined"
                >
                  Add {componentIndex[componentKey].readableName}
                </Button>
              ))}
            {/* maps each tab and provides components added to that specific tab */}
            {tabs[currTabIndex].content.map((widget, widgetIndex) => {
              return (
                <div key={`${widget}-${widgetIndex}`}> 
                  {widget.tabType === "FormattedText" ? (
                    <FormattedText
                      {...widget}
                      setProp={setTabProps(currTabIndex, widgetIndex)} //function sets the data in formattedText component
                    />
                  ) : (
                    <Image
                      {...widget}
                      setProp={setTabProps(currTabIndex, widgetIndex)}//function sets the data in Image component
                    />
                  )}
                  <Button 
                    variant="contained" 
                    startIcon={<Delete />}
                    onClick={() => handleDeleteContent(currTabIndex, widgetIndex)}>
                    {`Delete ${widget.tabType}`}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tab;
