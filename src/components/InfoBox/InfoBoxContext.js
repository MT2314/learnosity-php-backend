import React, { createContext, useReducer, useEffect } from 'react';
import produce from 'immer';

//state of infoBox data stored in InfoBoxContext
export const InfoBoxContext = createContext();

export const infoBoxConfig = (draft, action) => {
  switch (action.func) {
    case 'CHANGE_LABEL':
      infoBoxLabel = action.label;
      return draft;
    default:
      return draft;
  }
};
//InfoBox provider wraps the tab component to access reducer
export const InfoBoxProvider = ({ children, setProp, infoBoxState }) => {
  const [state, dispatch] = useReducer(produce(infoBoxConfig), infoBoxState);
  useEffect(() => {
    setProp({ infoBoxState: state });
  }, [state]);

  return (
    <InfoBoxContext.Provider value={[state, dispatch]}>
      {children}
    </InfoBoxContext.Provider>
  );
};
