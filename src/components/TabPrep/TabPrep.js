import React, { createContext, useState, useReducer } from "react";
//import components
import TabEl from "./subcomponents/TabEl";
import "./styles/Tab.scss";
//import immer
import produce from "immer";

export const defaultProps = {
  layout: [
    {
      type: "TAB",
      id: 0,
      title: "Tab 1",
      components: [],
    },
    {
      type: "TAB",
      id: 1,
      title: "Tab 2",
      components: [],
    },
  ],
};

//state of Layout
export const LayoutContext = createContext();
//layout provider wraps the tab component
export const LayoutProvider = ({ children }) => {
  const { layout } = defaultProps;

  const [state, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.func) {
        case "ADD_TAB":
          draft.push({
            id: action.id,
            title: action.title,
            components: [],
          });
          break;
        case "REMOVE_TAB":
          draft.splice(action.tabIndex, 1);
          break;
        case "ADD_COMPONENT":
          console.log("action", action);
          //console.log("here is the dropped item:", action.component)
          draft[action.tabIndex].components.push({
            ...action.component,
          });
          break;
        case "DELETE_COMPONENT":
          draft[action.tabIndex].components.splice(action.componentIndex, 1);
          break;
        default:
          break;
      }
    }),
    layout
  );

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  );
};
//state for the active tab index
export const TabContext = createContext();

const TabPrep = ({ layout, setProp = () => {} }) => {
  const [activeTab, setActiveTab] = useState(0);

  const _tabs = layout.map((tab, tabIndex) => {
    return <TabEl tabIndex={tabIndex} tab={tab} />;
  });

  return (
    <LayoutProvider>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        <div className="tab-container">
          <div className="tab-titles">
            {layout.map((tab, tabIndex) => {
              return (
                <div className="tab-title">
                  <h3 onClick={() => setActiveTab(tabIndex)}>{tab.title}</h3>
                </div>
              );
            })}
          </div>
          {layout.map((tab, tabIndex) => {
            return <TabEl tabIndex={tabIndex} tab={tab} />;
          })}
        </div>
      </TabContext.Provider>
    </LayoutProvider>
  );
};

export default TabPrep;
