import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of tabs data stored in LayoutContext
export const LayoutContext = createContext();
//state of the active tab
export const TabContext = createContext();

const activeTabFunc = (draft, active, test) => {
  // Uncomment below to see which reducer is being called
  // console.log("activeTabFunc", active, test);
  draft.map((tab, index) => {
    index == active ? (tab.activeTab = true) : (tab.activeTab = false);
  });
};
export const layoutConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "ADD_TAB":
      draft.push({
        id: action.id,
        placeholder: action.placeholder,
        title: "",
        components: [],
        activeTab: false,
      });
      activeTabFunc(draft, action.activeTab, "ADD_TAB");
      return draft;
    case "REMOVE_TAB":
      draft.splice(action.tabIndex, 1);
      activeTabFunc(draft, action.nextTab, "REMOVE_TAB");
      return draft;
    case "MOVE_TAB_LEFT":
      // eslint-disable-next-line no-case-declarations
      const elementL = draft[action.tabIndex];
      draft.splice(action.tabIndex, 1);
      draft.splice(action.tabIndex - 1, 0, elementL);
      activeTabFunc(draft, action.nextTab, "MOVE_TAB_LEFT");
      return draft;
    case "MOVE_TAB_RIGHT":
      // eslint-disable-next-line no-case-declarations
      const elementR = draft[action.tabIndex];
      draft.splice(action.tabIndex, 1);
      draft.splice(action.tabIndex + 1, 0, elementR);
      activeTabFunc(draft, action.nextTab, "MOVE_TAB_RIGHT");
      return draft;
    case "ADD_COMPONENT":
      draft[action.tabIndex].components.push({
        ...action.component,
      });
      activeTabFunc(draft, action.tabIndex, "ADD_COMPONENT");
      return draft;
    case "DELETE_COMPONENT":
      draft[action.tabIndex].components.splice(action.compIndex, 1);
      !action.add && activeTabFunc(draft, action.tabIndex, "DELETE_COMPONENT");
      return draft;
    case "UPDATE_COMPONENT":
      draft[action.tabIndex].components[action.compIndex].componentProps = {
        ...action.stateUpdate,
      };
      activeTabFunc(draft, action.tabIndex, "UPDATE_COMPONENT");
      return draft;

    case "MOVE_COMPONENT_DOWN":
      // eslint-disable-next-line no-case-declarations
      const elementCR = draft[action.tabIndex].components[action.compIndex];
      draft[action.tabIndex].components.splice(action.compIndex, 1);
      draft[action.tabIndex].components.splice(
        action.compIndex + 1,
        0,
        elementCR
      );
      activeTabFunc(draft, action.tabIndex, "MOVE_COMPONENT_DOWN");
      return draft;
    case "MOVE_COMPONENT_UP":
      // eslint-disable-next-line no-case-declarations
      const elementCL = draft[action.tabIndex].components[action.compIndex];
      draft[action.tabIndex].components.splice(action.compIndex, 1);
      draft[action.tabIndex].components.splice(
        action.compIndex - 1,
        0,
        elementCL
      );
      activeTabFunc(draft, action.tabIndex, "MOVE_COMPONENT_UP");
      return draft;
    case "DUPLICATE_COMPONENT":
      draft[action.tabIndex].components.splice(
        action.compIndex + 1,
        0,
        draft[action.tabIndex].components[action.compIndex]
      );
      activeTabFunc(draft, action.tabIndex, "DUPLICATE_COMPONENT");
      return draft;
    case "DRAG_COMPONENT":
      // eslint-disable-next-line no-case-declarations
      const dragElement = draft[action.tabIndex].components[action.dragIndex];
      draft[action.tabIndex].components.splice(action.dragIndex, 1);
      draft[action.tabIndex].components.splice(
        action.hoverIndex,
        0,
        dragElement
      );
      activeTabFunc(draft, action.tabIndex, "DRAG_COMPONENT");
      return draft;
    case "DRAG_ADD_NEW_COMPONENT":
      draft[action.tabIndex].components.splice(
        action.hoverIndex,
        0,
        action.component
      );
      activeTabFunc(draft, action.tabIndex, "DRAG_ADD_NEW_COMPONENT");
      return draft;
    case "CHANGE_TITLE":
      const tab = draft.find((tab) => tab.id == action.id);
      tab.title = action.title;
      activeTabFunc(draft, action.tabIndex, "CHANGE_TITLE");
      return draft;
    case "TOGGLE_PANE":
      draft[action.paneIndex].expanded === true
        ? (draft[action.paneIndex].expanded = false)
        : (draft[action.paneIndex].expanded = true);
      return draft;
    default:
      return draft;
  }
};

//layout provider wraps the tab component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [state, dispatch] = useReducer(produce(layoutConfig), layoutState);

  const diff = JSON.stringify(state) !== JSON.stringify(layoutState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: layoutState });
    state.forEach(
      (tab, index) => tab.activeTab === true && setActiveTab(index)
    );
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ layoutState: state });
    state.forEach(
      (tab, index) => tab.activeTab === true && setActiveTab(index)
    );
  }, [state]);

  useEffect(() => {
    diff && mounted && dispatch({ func: "UPDATE_STATE", data: layoutState });
  }, [layoutState]);

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <TabContext.Provider value={[activeTab, setActiveTab]}>
        {children}
      </TabContext.Provider>
    </LayoutContext.Provider>
  );
};
