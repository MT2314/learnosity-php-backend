import React, { createContext, useState, useReducer, useEffect } from "react";
//import components
import Tabs from "./subcomponents/Tabs";
import "./styles/Tab.scss";
//import immer
import produce from "immer";

// ? DndProvider Imports
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//tabs default props
export const defaultProps = {
  layoutState: [
    {
      type: "TAB",
      id: 0,
      title: "",
      components: [],
    },
    {
      type: "TAB",
      id: 1,
      title: "",
      components: [],
    },
  ],
};

//state of tabs data stored in LayoutCOntext
export const LayoutContext = createContext();

//layout provider wraps the tab component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [state, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.func) {
        case "ADD_TAB":
          draft.push({
            type: "TAB",
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
        case "UPDATE_COMPONENT":
          console.log(action.compIndex);
          // draft[action.tabIndex].components[action.compIndex]({
          break;

        case "DELETE_COMPONENT":
          draft[action.tabIndex].components.splice(action.componentIndex, 1);
          break;
        case "CHANGE_TITLE":
          const tab = draft.find((tab) => tab.id === action.id);
          tab.title = action.title;
          break;
        case "UPDATE_COMPONENT":
          console.log('updated component')
          break;
        default:
          break;
      }
    }),
    layoutState
  );

  useEffect(() => {
    setProp({ layoutState: state });
  }, [state]);

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  );
};

//state of the active tab
export const TabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={[activeTab, setActiveTab]}>
      {children}
    </TabContext.Provider>
  );
};

const TabsMain = ({ layoutState = [], setProp = () => {} }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider layoutState={layoutState} setProp={setProp}>
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    </DndProvider>
  );
};

export default TabsMain;
