import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of video data stored in VideoContext
export const HeaderContext = createContext();

// Reducers
export const headerConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return draft.action;
    case "CHANGE_SIZE":
      draft.size = action.size;
      return draft;
    case "CHANGE_ALIGNMENT":
      draft.alignment = action.alignment;
      return draft;
    case "CHANGE_HEADING":
      draft.heading = action.heading;
      return draft;
    default:
      return draft;
  }
};

//video provider wraps the tab component to access reducer
export const HeaderProvider = ({ children, setProp, headerState }) => {
  const [state, dispatch] = useReducer(produce(headerConfig), headerState);
  const diff = JSON.stringify(state) !== JSON.stringify(headerState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: headerState });
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ headerState: state });
  }, [state]);

  useEffect(() => {
    diff && mounted && dispatch({ func: "UPDATE_STATE", data: headerState });
  }, [headerState]);

  return (
    <HeaderContext.Provider value={[state, dispatch]}>
      {children}
    </HeaderContext.Provider>
  );
};
