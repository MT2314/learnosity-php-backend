import React, { createContext, useState, useReducer, useEffect } from "react";
//import components
import TabsWidget from "./subcomponents/Tabs";
import "./styles/Tab.scss";
//import immer
import produce from "immer";

//tabs default props
export const defaultProps = {
  layoutState: [
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

//state of tabs data stored in LayoutCOntext
export const LayoutContext = createContext();

//layout provider wraps the tab component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [state, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.func) {
        case "ADD_TAB":
          console.log(`added tab`);
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
        case "DELETE_COMPONENT":
          draft[action.tabIndex].components.splice(action.componentIndex, 1);
          break;
        case "CHANGED_TITLE":
          console.log("action:", action);
          console.log("draft:", draft);

          console.log("layoutState", layoutState);

          const todo = draft.find((todo) => todo.id == action.id);
          console.log(todo);
          todo.title = action.title;
          break;
        default:
          break;
      }
    }),
    layoutState
  );

  useEffect(() => {
    console.log("state", state);
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

const TabsMain = ({ layoutState = [], setProp = () => {} }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <LayoutProvider layoutState={layoutState} setProp={setProp}>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        <TabsWidget />
      </TabContext.Provider>
    </LayoutProvider>
  );
};

export default TabsMain;
