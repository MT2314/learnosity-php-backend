import React, { useState, useRef } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const useStore = () => {
  const boldRef = useRef(null);
  const linkRef = useRef(null);


  const [quill, setQuill] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [showMath, setShowMath] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [linkRange, setLinkRange] = useState(null);
  const [editorPos, setEditorPos] = useState(null);
  const [keepEditor, setKeepEditor] = useState(false);
  const [showMathRef, setShowMathRef] = useState(null);
  const [isLink, setIsLink] = useState(false);
  const [mathId, setMathId] = useState(null);
  const [format, setFormat] = useState(null);

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

  const [editLink, setEditLink] = useState({
    index: null,
    text: null,
    link: null,
  });

  return {
    quill,
    uniqueId,
    editState,
    showMath,
    showMathRef,
    editFormula,
    keepEditor,
    showLink,
    linkRange,
    editorPos,
    editLink,
    isLink,
    mathId,
    format,
    boldRef,
    linkRef,
    setQuill,
    setUniqueId,
    setEditState,
    setShowMath,
    setShowMathRef,
    setEditFormula,
    setKeepEditor,
    setShowLink,
    setLinkRange,
    setEditorPos,
    setEditLink,
    setIsLink,
    setMathId,
    setFormat,
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
export const useLinkRef = () => getState("linkRef");

//Get States
export const useQuill = () => getState("quill");
export const useUniqueId = () => getState("uniqueId");
export const useEditState = () => getState("editState");
export const useShowMath = () => getState("showMath");
export const useShowMathRef = () => getState("showMathRef");
export const useEditFormula = () => getState("editFormula");
export const useKeepEditor = () => getState("keepEditor");
export const useShowLink = () => getState("showLink");
export const useEditorPos = () => getState("editorPos");
export const useLinkRange = () => getState("linkRange");
export const useEditLink = () => getState("editLink");
export const useIsLink = () => getState("isLink");
export const useMathId = () => getState("mathId");
export const useFormat = () => getState("format");

//Set States
export const useSetQuill = () => getState("setQuill");
export const useSetUniqueId = () => getState("setUniqueId");
export const useSetEditState = () => getState("setEditState");
export const useSetShowMath = () => getState("setShowMath");
export const useSetShowMathRef = () => getState("setShowMathRef");
export const useSetEditFormula = () => getState("setEditFormula");
export const useSetKeepEditor = () => getState("setKeepEditor");
export const useSetShowLink = () => getState("setShowLink");
export const useSetEditorPos = () => getState("setEditorPos");
export const useSetLinkRange = () => getState("setLinkRange");
export const useSetEditLink = () => getState("setEditLink");
export const useSetIsLink = () => getState("setIsLink");
export const useSetMathId = () => getState("setMathId");
export const useSetFormat = () => getState("setFormat");
