import React, { createContext, useState, useReducer } from "react";
//import components
import TabsWidget from "./subcomponents/TabsWidget";
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
//state for the active tab index
export const LayoutProvider = ({ children }) => {

  const { layout } = defaultProps

  const [state, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.func) {
        case "ADD_TAB":
          console.log(`added tab`);
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

  console.log("state:", state)
  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  );
};
export const TabContext = createContext();

const TabPrep = ({ layout }) => {
  
  const [activeTab, setActiveTab] = useState(0);
  
  
  return (
    <LayoutProvider>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        <TabsWidget/>
      </TabContext.Provider>
    </LayoutProvider>
  );
};

export default TabPrep;
