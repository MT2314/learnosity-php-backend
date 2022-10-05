import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of tabs & accordion data stored in LayoutContext
export const LayoutContext = createContext();
export const ActivePaneContext = createContext();

export const layoutConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "ADD_LAYER":
      draft.push({
        id: action.id,
        title: "",
        placeholderTitle: action.title,
        components: [],
        expanded: action.expanded,
      });
      return draft;
    case "REMOVE_LAYER":
      draft.splice(action.paneIndex, 1);
      return draft;
    case "ADD_COMPONENT":
      draft[action.tabIndex].components.push({
        ...action.component,
      });
      return draft;
    case "MOVE_PANE_UP":
      // eslint-disable-next-line no-case-declarations
      if (action.paneIndex !== 0) {
        const elementL = draft[action.paneIndex];
        draft.splice(action.paneIndex, 1);
        draft.splice(action.paneIndex - 1, 0, elementL);
      } else {
        const elementL = draft[action.paneIndex];
        draft.splice(0, 1);
        draft.splice(draft.length, 0, elementL);
      }
      return draft;
    case "MOVE_PANE_DOWN":
      // eslint-disable-next-line no-case-declarations
      const elementR = draft[action.paneIndex];
      draft.splice(action.paneIndex, 1);
      draft.splice(action.paneIndex + 1, 0, elementR);
      return draft;
    case "UPDATE_COMPONENT":
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
      draft[action.layerIndex].title = action.title;
      return draft;
    case "TOGGLE_PANE":
      draft[action.paneIndex].expanded === true
        ? (draft[action.paneIndex].expanded = false)
        : (draft[action.paneIndex].expanded = true);
      return draft;
    case "EXPAND_ALL_PANE":
      draft.forEach((item) => (item.expanded = true));
      return draft;
    case "COLLAPSE_ALL_PANE":
      draft.forEach((item) => (item.expanded = false));
      return draft;

    default:
      return draft;
  }
};

export const paneConfig = (draft, action) => {
  switch (action.func) {
    case "TOGGLE_PANE":
      draft[action.paneIndex].expanded === true
        ? (draft[action.paneIndex].expanded = false)
        : (draft[action.paneIndex].expanded = true);
      return draft;
    case "UPDATE_STATE":
      return action.state;
    default:
      return draft;
  }
};

//layout provider wraps the tab & accordion component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [state, dispatch] = useReducer(produce(layoutConfig), layoutState);
  const [activePane, setActivePane] = useReducer(
    produce(paneConfig),
    layoutState.map((item) => {
      return { expanded: item.expanded };
    })
  );

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
    setActivePane({
      func: "UPDATE_STATE",
      state: layoutState.map((item) => {
        return { expanded: item.expanded };
      }),
    });

    diff && mounted && dispatch({ func: "UPDATE_STATE", data: layoutState });
  }, [layoutState]);

  useEffect(() => {
    const copyState = state.map((item) => ({ expanded: item.expanded }));
    const diff = JSON.stringify(copyState) !== JSON.stringify(activePane);
    const updatedLength = copyState.length && state.length;

    const updateState =
      diff & !updatedLength
        ? state.map((item, index) => ({
          ...item,
          expanded: activePane[index].expanded,
        }))
        : state;
    setProp({ layoutState: updateState });
  }, [state]);

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <ActivePaneContext.Provider value={[activePane, setActivePane]}>
        {children}
      </ActivePaneContext.Provider>
    </LayoutContext.Provider>
  );
};
