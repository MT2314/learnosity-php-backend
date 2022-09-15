import React, { createContext, useReducer, useEffect, useState } from 'react';
import produce from 'immer';

//state of tabs data stored in LayoutContext
export const LayoutContext = createContext();

export const layoutConfig = (draft, action) => {
  switch (action.func) {
    case 'ADD_TAB':
      draft.push({
        id: action.id,
        title: "",
        placeholderTitle: action.title,
        components: [],
      });
      return draft;
    case 'REMOVE_TAB':
      draft.splice(action.currentTab, 1);
      return draft;
    case 'ADD_COMPONENT':
      draft[action.tabIndex].components.push({
        ...action.component,
      });
      return draft;
    case 'MOVE_TAB_LEFT':
      // eslint-disable-next-line no-case-declarations
      const elementL = draft[action.tabIndex];
      draft.splice(action.tabIndex, 1);
      draft.splice(action.tabIndex - 1, 0, elementL);
      return draft;
    case 'MOVE_TAB_RIGHT':
      // eslint-disable-next-line no-case-declarations
      const elementR = draft[action.tabIndex];
      draft.splice(action.tabIndex, 1);
      draft.splice(action.tabIndex + 1, 0, elementR);
      return draft;
    case 'UPDATE_COMPONENT':
      draft[action.tabIndex].components[action.compIndex].componentProps = {
        ...action.stateUpdate,
      };
      return draft;
    case "DELETE_COMPONENT":
      draft[action.tabIndex].components.splice(action.compIndex, 1);
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
      return draft;
    case "DUPLICATE_COMPONENT":
      draft[action.tabIndex].components.splice(
        action.compIndex + 1,
        0,
        draft[action.tabIndex].components[action.compIndex]
      );
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
      return draft;
    case "DRAG_ADD_NEW_COMPONENT":
      draft[action.tabIndex].components.splice(
        action.hoverIndex,
        0,
        action.component
      );
      return draft;
    case "CHANGE_TITLE":
      // eslint-disable-next-line no-case-declarations
      const tab = draft.find((tab) => tab.id == action.id);
      tab.title = action.title;
      return draft;
    case "TOGGLE_PANE":
      draft[action.paneIndex].expanded === true ? draft[action.paneIndex].expanded = false : draft[action.paneIndex].expanded = true
      console.log(draft[action.paneIndex])
      return draft
    default:
      return draft;
  }
};
//layout provider wraps the tab component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [state, dispatch] = useReducer(produce(layoutConfig), layoutState);

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
