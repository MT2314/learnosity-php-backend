import React, { useRef } from "react";
import {
  useSetEditState,
  useEditState,
  useSetShowMath,
  useSetEditFormula,
} from "../Provider";
import { Tooltip } from "@material-ui/core";
import "../styles/EditMath.scss";

import icons from "../assets/icons";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
const EditMath = () => {
  const containerRef = useRef(null);
  const setEditState = useSetEditState();
  const editState = useEditState();
  const setShowMath = useSetShowMath();
  const setEditFormula = useSetEditFormula();

  useOnClickOutside(containerRef, () => {
    setEditState({
      value: null,
      id: null,
      clientX: null,
      clientY: null,
    });
  });

  const container = {
    display: editState?.value ? "flex" : "none",
    position: "fixed",
    top: editState?.clientY ? `${editState.clientY}px` : "0",
    left: editState?.clientX ? `${editState.clientX}px` : "0",
    width: "80px",
    zIndex: "4",
    borderRadius: "4px",
    backgroundColor: "white",
    padding: "4px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handlePencilClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMath(true);
    setEditFormula({ value: editState.value, id: editState.id });
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
            PopperProps={{
              disablePortal: true,
              popperOptions: {
                positionFixed: true,
                modifiers: {
                  preventOverflow: {
                    enabled: true,
                    boundariesElement: "window",
                  },
                },
              },
            }}
          >
            <button aria-label="delete formula" className="trashcan">
              {icons["trashcan"]}
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default EditMath;
