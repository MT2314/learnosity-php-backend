import React, { useRef } from "react";
import "./EditMath.scss";

import {
  useSetEditState,
  useEditState,
  useSetShowMath,
  useSetEditFormula,
  useSetKeepEditor,
  useQuill,
  useSetMathpixOption
} from "../Provider";
import { Tooltip } from "@material-ui/core";
import "../styles/EditMath.scss";

import icons from "../assets/icons";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
const EditMath = () => {
  const containerRef = useRef(null);

  //context hooks
  const quill = useQuill();
  const setEditState = useSetEditState();
  const editState = useEditState();
  const setShowMath = useSetShowMath();
  const setEditFormula = useSetEditFormula();
  const setKeepEditor = useSetKeepEditor();
  const setMathpixOption = useSetMathpixOption()

  useOnClickOutside(containerRef, () => {
    setEditState({
      value: null,
      id: null,
      clientX: null,
      clientY: null,
    });
    setKeepEditor(false);
  });

  const container = {
    display: editState?.value ? "flex" : "none",
    position: "fixed",
    top: editState?.clientY ? `${editState.clientY - 5}px` : "0",
    left: editState?.clientX ? `${editState.clientX}px` : "0",
    width: "80px",
    zIndex: "4",
    borderRadius: "4px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    padding: "4px",
    boxShadow: "0 5px 10px rgba(0,0,0,.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handlePencilClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowMath(true);
    setMathpixOption("equationKeyboard")
    setEditFormula({ value: editState.value, id: editState.id });
    setEditState({
      value: null,
      id: null,
      clientX: null,
      clientY: null,
    });
  };

  const handleTrashCanClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const range = quill.getSelection(true);

    quill.deleteText(range.index, range.length + 1);
    quill.setSelection(range.index, range.length);

    setEditState({
      value: null,
      id: null,
      clientX: null,
      clientY: null,
    });
  };

  return (
    <div style={container} ref={containerRef}>
      {editState?.id !== null && (
        <>
          <Tooltip arrow title="edit formula" placement="top">
            <button
              aria-label="edit formula"
              className="pencil"
              onClick={handlePencilClick}
            >
              {icons["pencil"]}
            </button>
          </Tooltip>
          <Tooltip
            aria-label="delete formula"
            title="delete formula"
            placement="top"
            arrow
          >
            <button
              aria-label="delete formula"
              className="trashcan"
              onClick={handleTrashCanClick}
            >
              {icons["trashcan"]}
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default EditMath;
