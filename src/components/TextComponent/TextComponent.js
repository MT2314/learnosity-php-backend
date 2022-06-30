import React, { useState, useRef } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/TextComponent.scss";

export const defaultProps = { body: null };

const TextComponent = () => {
  const [showEditor, setShowEditor] = useState(false);

  const focusRef = useRef(null)
  
  const handleOnClick = () => {
    focusRef.current.focus()
    setShowEditor(true);
  };


  return (
    <div
      onClick={() => {
        handleOnClick();
      }}
      className="mainContainer"
    >
      {!showEditor ? <DefaultText /> : <EditorComponent focusRef={focusRef}/>}
    </div>
  );
};

export default TextComponent;
