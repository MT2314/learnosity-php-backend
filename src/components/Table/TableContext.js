import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of tabs data stored in LayoutContext
export const LayoutContext = createContext();

export const layoutConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "SET_STATE":
      draft.headers = action.headers;
      draft.data = action.data;
      return draft;
    case "UPDATE_CELL":
      const temp = Object.keys(draft.data[action.row]);
      draft.data[action.row][temp[action.col]].value = action.value;
      return draft;
    case "UPDATE_COLUMN_DATA":
      //update column order
      return draft;
    case "UPDATE_ROW":
      draft.data.splice(
        action.targetRowIndex,
        0,
        draft.data.splice(action.draggedRowIndex, 1)[0]
      );
      return draft;

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
