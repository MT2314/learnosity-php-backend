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
      draft.headerType = action.headerType;
      draft.hideTopHeader = action.hideTopHeader;
      draft.hideSideHeader = action.hideSideHeader;
      draft.showStripes = action.showStripes;
      return draft;
    case "UPDATE_CELL":
      const temp = Object.keys(draft.data[action.row]);
      draft.data[action.row][temp[action.col]].value = action.value;
      return draft;
    case "UPDATE_COLUMN_ORDER":
      const targetColumn =
        draft.headers[action.targetColumn.replace(/column/, "") - 1];
      const draggedColumn =
        draft.headers[action.draggedColumn.replace(/column/, "") - 1];

      draft.headers[action.targetColumn.replace(/column/, "") - 1] =
        draggedColumn;
      draft.headers[action.draggedColumn.replace(/column/, "") - 1] =
        targetColumn;
      return draft;
    case "UPDATE_ROW":
      draft.data.splice(
        action.targetRowIndex,
        0,
        draft.data.splice(action.draggedRowIndex, 1)[0]
      );
      return draft;
    case "ADD_ROW":
      draft.data = action.data;
      return draft;
    case "ADD_COL":
      draft.headers = action.headers;
      draft.data = action.data;
      return draft;
    case "DELETE_COLUMN":
      draft.headers = action.headers;
      draft.data = action.data;
      return draft;
    case "DELETE_ROW":
      draft.headers = action.headers;
      draft.data = action.data;
      return draft;
    case "UPDATE_STRIP":
      draft.showStripes = action.showStripes;
      return draft;
    case "UPDATE_TOPHEADER":
      draft.hideTopHeader = action.hideTopHeader;
      return draft;
    case "UPDATE_SIDEHEADER":
      draft.hideSideHeader = action.hideSideHeader;
      return draft;
    case "CHANGE_ALIGNMENT":
      draft.data[action.selectedCell.row][
        `column${action.selectedCell.col + 1}`
      ].horizontalAlignment = action.activeHorizontalAlignment;
      draft.data[action.selectedCell.row][
        `column${action.selectedCell.col + 1}`
      ].verticalAlignment = action.activeVerticalAlignment;
      return draft;
    default:
      return draft;
  }
};

//layout provider wraps the tab component to access reducer
export const LayoutProvider = ({ children, setProp, layoutState }) => {
  const [state, dispatch] = useReducer(produce(layoutConfig), layoutState);

  const diff = JSON.stringify(state) !== JSON.stringify(layoutState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: layoutState });
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ layoutState: state });
  }, [state]);

  useEffect(() => {
    diff && mounted && dispatch({ func: "UPDATE_STATE", data: layoutState });
  }, [layoutState]);

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  );
};
