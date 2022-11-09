import React, { useEffect } from "react";
import {
  useUniqueId,
  useSetEditState,
  useShowMath,
  useSetKeepEditor,
  useEditLink,
  useSetEditLink,
} from "../Provider";
import MathPopup from "../subcomponent/popupToolBar/math/MathPopup";
import EditMath from "./EditMath";
import LinkDialog from "./LinkDialog";

const PopupDialogs = (props) => {
  return (
    <>
      <MathEditDialog />
      <MathPopupDialog {...props} />
      <LinkDialog {...props} />
      <LinkEditDialog />
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

const LinkEditDialog = () => {
  const uniqueId = useUniqueId();

  const setEditLink = useSetEditLink();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.attributes.getNamedItem("data-text").value &&
      setEditLink({
        index: e.target.attributes.getNamedItem("data-index").value,
        text: e.target.attributes.getNamedItem("data-text").value,
        link: e.target.attributes.getNamedItem("data-link").value,
      });
  };

  return (
    <>
      {uniqueId && (
        <>
          <div id={`link-placeholder-${uniqueId}`} onClick={handleClick} />
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
