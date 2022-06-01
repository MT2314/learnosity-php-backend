import React, { useState } from "react";
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
  const[tabName, setTabName] = useState("")

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
      id: Math.floor(Math.random() * 100000),
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
      setTabName("")
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

  const setTabProps =
    (selectedTabIndex, selectedContentIndex) => (stateUpdate) => {
      console.log(
        "currTabIndex:",
        selectedTabIndex,
        "selectedContentIndex:",
        selectedContentIndex
      );
      console.log("stateUpdate:", stateUpdate);
      // Downside, probably not performant, also ack.
      setProp({
        tabs: tabs.map((tab, tabIndex) => {
          if (tabIndex !== selectedTabIndex) return tab;
          return {
            ...tab,
            content: tab.content.map((contentItem, contentIndex) => {
              if (contentIndex !== selectedContentIndex) return contentItem;
              return {
                ...contentItem,
                ...stateUpdate,
              };
            }),
          };
        }),
      });
      // More performant alternative, all the ack still?
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

  // const setTabProps = (widgetIndex) => (stateUpdate) => {
  //   //console.log({ tabIndex, stateUpdate });
  //   console.log(widgetIndex)

  //   //  setProp({
  //   //   tabs: tabs.map((tab, tabIndex) => {
  //   //     if (tab.id - 1 !== currTabIndex) return tab;
  //   //     return {
  //   //       ...tabs[tabIndex],
  //   //       content: [...tabs[tabIndex].content, newContent],
  //   //     };
  //   //   }),
  //   // });
  //   const newTabsState = JSON.parse(JSON.stringify(tabs));
  //    newTabsState.map((x, index) => {
  //      if(x.id - 1 !== currTabIndex) return x;
  //      x.content.map((y, index) => {
  //       if(index === widgetIndex ){
  //         console.log(y.id)
  //       }
  //      })

  //    })
  //   //newTabsState.splice(currTabIndex, 1, { ...tabs[widgetIndex], ...stateUpdate });
  //   //setProp({ tabs: newTabsState });
  // };

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
                return (
                  <div
                    onClick={() => {
                      setCurrContentIndex(widgetIndex);
                    }}
                  >
                    {widget.tabType === "FormattedText" ? (
                      <FormattedText
                        setProp={setTabProps(currTabIndex, currContentIndex)}
                      />
                    ) : (
                      <Image />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
