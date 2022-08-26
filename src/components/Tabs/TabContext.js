import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of tabs data stored in LayoutContext
export const LayoutContext = createContext();

export const layoutConfig = (draft, action) => {
    switch (action.func) {
      case "ADD_TAB":
        draft.push({
          type: "TAB",
          id: action.id,
          components: [],
        });
        return draft
      case "REMOVE_TAB":
        draft.splice(action.currentTab, 1);
        return draft
      case "ADD_COMPONENT":
        draft[action.tabIndex].components.push({
          ...action.component,
        });
        return draft
      case "MOVE_TAB_LEFT":
        console.log(draft);
        const elementL = draft[action.tabIndex];
        draft.splice(action.tabIndex, 1);
        draft.splice(action.tabIndex - 1, 0, elementL);
        return draft
      case "MOVE_TAB_RIGHT":
        const elementR = draft[action.tabIndex];
        draft.splice(action.tabIndex, 1);
        draft.splice(action.tabIndex + 1, 0, elementR);
        return draft
      case "UPDATE_COMPONENT":
        draft[action.tabIndex].components[action.compIndex].componentProps = {
          ...action.stateUpdate,
        };
        return draft
      case "DELETE_COMPONENT":
        draft[action.tabIndex].components.splice(action.componentIndex, 1);
        return draft
      case "CHANGE_TITLE":
        const tab = draft.find((tab) => tab.id == action.id);
        tab.title = action.title;
        return draft
      default:
        return draft
    }
  };
  //layout provider wraps the tab component to access reducer
  export const LayoutProvider = ({ children, setProp, layoutState }) => {
    const [state, dispatch] = useReducer(
      produce(layoutConfig),
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




