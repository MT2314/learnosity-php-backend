import React, { useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

const useStore = () => {
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

export const useQuill = () => useContextSelector(StoreContext, (s) => s.quill);
export const useUniqueId = () =>
  useContextSelector(StoreContext, (s) => s.uniqueId);
export const useEditState = () =>
  useContextSelector(StoreContext, (s) => s.editState);
export const useShowMath = () =>
  useContextSelector(StoreContext, (s) => s.showMath);
export const useShowMathRef = () =>
  useContextSelector(StoreContext, (s) => s.showMathRef);
export const useSetQuill = () =>
  useContextSelector(StoreContext, (s) => s.setQuill);
export const useEditFormula = () =>
  useContextSelector(StoreContext, (s) => s.editFormula);
export const useKeepEditor = () =>
  useContextSelector(StoreContext, (s) => s.keepEditor);

export const useSetUniqueId = () =>
  useContextSelector(StoreContext, (s) => s.setUniqueId);
export const useSetEditState = () =>
  useContextSelector(StoreContext, (s) => s.setEditState);
export const useSetShowMath = () =>
  useContextSelector(StoreContext, (s) => s.setShowMath);
export const useSetShowMathRef = () =>
  useContextSelector(StoreContext, (s) => s.setShowMathRef);
export const useSetEditFormula = () =>
  useContextSelector(StoreContext, (s) => s.setEditFormula);
export const useSetKeepEditor = () =>
  useContextSelector(StoreContext, (s) => s.setKeepEditor);