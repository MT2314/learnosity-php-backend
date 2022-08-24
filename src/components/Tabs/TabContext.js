import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of tabs data stored in LayoutContext
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
            title: "",
            components: [],
          });
          break;
        case "REMOVE_TAB":
          draft.splice(action.currentTab, 1);
          break;
        case "ADD_COMPONENT":
          draft[action.tabIndex].components.push({
            ...action.component,
          });
          break;
        case "MOVE_TAB_LEFT":
          console.log(draft);
          const elementL = draft[action.tabIndex];
          draft.splice(action.tabIndex, 1);
          draft.splice(action.tabIndex - 1, 0, elementL);
          break;
        case "MOVE_TAB_RIGHT":
          const elementR = draft[action.tabIndex];
          draft.splice(action.tabIndex, 1);
          draft.splice(action.tabIndex + 1, 0, elementR);
          break;
        case "UPDATE_COMPONENT":
          draft[action.tabIndex].components[action.compIndex].componentProps = {
            ...action.stateUpdate,
          };
          break;
        case "DELETE_COMPONENT":
          draft[action.tabIndex].components.splice(action.componentIndex, 1);
          break;
        case "CHANGE_TITLE":
          const tab = draft.find((tab) => tab.id == action.id);
          tab.title = action.title;
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
