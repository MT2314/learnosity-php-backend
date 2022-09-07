import React, { useState, useRef } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const useStore = () => {
  const boldRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [showMath, setShowMath] = useState(false);
  const [showMathRef, setShowMathRef] = useState(null);
  const [keepEditor, setKeepEditor] = useState(false);

  const [editFormula, setEditFormula] = useState({
    value: null,
    id: null,
  });

  const [editState, setEditState] = useState({
    value: null,
    id: null,
    clientX: null,
    clientY: null,
  });

  return {
    quill,
    uniqueId,
    editState,
    showMath,
    showMathRef,
    editFormula,
    keepEditor,
    boldRef,
    setQuill,
    setUniqueId,
    setEditState,
    setShowMath,
    setShowMathRef,
    setEditFormula,
    setKeepEditor,
  };
};

const StoreContext = createContext(null);

export const Provider = ({ children }) => (
  <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const getState = (state) => useContextSelector(StoreContext, (s) => s[state]);

//Refs
export const useBoldRef = () => getState("boldRef");

//Get States
export const useQuill = () => getState("quill");
export const useUniqueId = () => getState("uniqueId");
export const useEditState = () => getState("editState");
export const useShowMath = () => getState("showMath");
export const useShowMathRef = () => getState("showMathRef");
export const useEditFormula = () => getState("editFormula");
export const useKeepEditor = () => getState("keepEditor");

//Set States
export const useSetQuill = () => getState("setQuill");
export const useSetUniqueId = () => getState("setUniqueId");
export const useSetEditState = () => getState("setEditState");
export const useSetShowMath = () => getState("setShowMath");
export const useSetShowMathRef = () => getState("setShowMathRef");
export const useSetEditFormula = () => getState("setEditFormula");
export const useSetKeepEditor = () => getState("setKeepEditor");
