import React from "react";
import {
  useUniqueId,
  useSetEditState,
  useShowMath,
  useSetKeepEditor,
} from "../Provider";
import MathPopup from "../subcomponent/popupToolBar/math/MathPopup";
import EditMath from "./EditMath";

const PopupDialogs = () => {
  return (
    <>
      <MathEditDialog />
      <MathPopupDialog />
    </>
  );
};

const MathEditDialog = () => {
  const setEditState = useSetEditState();
  const uniqueId = useUniqueId();
  const setKeepEditor = useSetKeepEditor();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditState({
      id: e.target.attributes.getNamedItem("data-id").value,
      value: e.target.attributes.getNamedItem("data-value").value,
      clientX: e.target.attributes.getNamedItem("data-clientX").value,
      clientY: e.target.attributes.getNamedItem("data-clientY").value,
    });
    setKeepEditor(true);
  };

  return (
    <>
      {uniqueId && (
        <>
          <div id={`mathpix-placeholder-${uniqueId}`} onClick={handleClick} />
          <EditMath />
        </>
      )}
    </>
  );
};

const MathPopupDialog = () => {
  const showMath = useShowMath();

  return <>{showMath && <MathPopup />}</>;
};

export default PopupDialogs;
