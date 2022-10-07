import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of infoBox data stored in InfoBoxContext
export const InfoBoxContext = createContext();

export const infoBoxConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "CHANGE_BODY":
      draft.body = action.body;
      return draft;
    case "CHANGE_LABEL":
      draft.infoBoxLabel = action.label;
      return draft;
    case "CHANGE_HEADER":
      draft.infoBoxHeader = { heading: action.header, headingLevel: "H3" };
      return draft;
    case "CHANGE_ICON":
      draft.infoBoxIcon = action.icon;
      return draft;
    default:
      return draft;
  }
};

//InfoBox provider wraps the tab component to access reducer
export const InfoBoxProvider = ({ children, setProp, infoBoxState }) => {
  const [state, dispatch] = useReducer(produce(infoBoxConfig), infoBoxState);

  const diff = JSON.stringify(state) !== JSON.stringify(infoBoxState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: infoBoxState });
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ infoBoxState: state });
  }, [state]);

  useEffect(() => {
    diff && mounted && dispatch({ func: "UPDATE_STATE", data: infoBoxState });
  }, [infoBoxState]);

  return (
    <InfoBoxContext.Provider value={[state, dispatch]}>
      {children}
    </InfoBoxContext.Provider>
  );
};
