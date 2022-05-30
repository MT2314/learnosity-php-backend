import React, { useState } from "react";
import componentIndex from "../componentIndex";
import FormattedText from "../FormattedText";
import Image from "../Image/Image";
import uuid from "uuid";
import "./Tab.css";

export const defaultProps = {
  tabs: [
    { id: 1, names: "Maths", content: [] },
    {
      id: 2,
      names: "Geography",
      content: [],
    },
  ],
  currentTab: { id: 1, names: "Tab 1", content: "" },
  editTabNameMode: false,
  editMode: false,
};

const Tab = ({ tabs, currentTab, setProp = () => {} }) => {
  const [state, setState] = useState(defaultProps);
  const [tabComponent, setTabComponent] = useState(null)
  const { editMode } = state;

  const handleAddTab = () => {
    const newTabObject = {
      id: uuid(),
      names: `Tab ${tabs.length + 1}`,
      content: [],
    };

    setProp({
      tabs: [...tabs, newTabObject],
      currentTab: newTabObject,
      editTabNameMode: false,
      editMode:false
    });
  };

  // const handleOnBlur = () => {
  //   setState({
  //     ...state,
  //     editTabNameMode: false,
  //   });
  // };

  const setEditMode = () => {
    setState({
      editMode: !state.editMode,
      editTabNameMode: false,
      currentTab:currentTab,
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
        if (tab.id !== currentTab.id) return tab;
        return {
          ...tabs[tabIndex],
          content: [...tabs[currentTab.id - 1].content, newContent],
        };
      }),
    });
    //setTab(tabs.length);

    const currentTabComponents = tabs[currentTab.id - 1].content;

    const _widgets = currentTabComponents.map((widget) => {
      if(widget.tabType === "FormattedText"){
        return <FormattedText/>
      }else if(widget.tabType === "Image"){
        return <Image />
      }
    })

    setTabComponent(_widgets)


  };;

//   const handleContentChange = (stateUpdate) => {

//     setProp({
//       tabs: tabs.map((tab, tabIndex) => {
//         if (tab.id !== currentTab.id) return tab;
// //todo get the type of component added and place the default props into content array
//         return {
//           ...tabs[tabIndex],
//           content: stateUpdate.body,
//         };
//       }),
//     });
//   };

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
    setProp({
      // 
      tabs:tabs,
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
    const { editTabNameMode } = state;

    const allTabs = tabs.map((tab) => {
      return (
        <li>
          {editTabNameMode && currentTab.id === tab.id ? (
            <input
              value={tab.names}
              //onBlur={handleOnBlur}
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
              {Object.keys(componentIndex)
                .filter((key) => {
                  const regex = /formatted|image/i
                return key.match(regex)
                }
                )
                .map((componentKey) => (
                  <button
                    onClick={addTabContent(componentKey)}>
                    Add {componentIndex[componentKey].readableName}
                  </button>
                ))}

                {tabComponent}

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
