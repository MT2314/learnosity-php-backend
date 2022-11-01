import React, { useState, useRef } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const useStore = () => {
  const [focused, setFocused] = useState(null);
  const [descriptionRef, setDescriptionRef] = useState(null);
  const [creditRef, setCreditRef] = useState(null);

  return {
    descriptionRef,
    creditRef,
    focused,
    setFocused,
    setCreditRef,
    setDescriptionRef,
  };
};

const StoreContext = createContext(null);

export const TabProvider = ({ children }) => (
  <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const getState = (state) => useContextSelector(StoreContext, (s) => s[state]);

//Get States
export const useFocused = () => getState("focused");
export const useDescriptionRef = () => getState("descriptionRef");
export const useCreditRef = () => getState("creditRef");


//Set States
export const useSetFocused = () => getState("setFocused");
export const useSetDescriptionRef = () => getState("setDescriptionRef");
export const useSetCreditRef = () => getState("setCreditRef");
