import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/TextComponent.scss";

export const defaultProps = { body: null };

const TextComponent = () => {
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    console.log(`showEditor:`, showEditor);
    setShowEditor(true);
  };

  return (
    <div
      onClick={() => {
        handleOnClick();
      }}
      className="mainContainer"
    >
      {!showEditor ? <DefaultText /> : <EditorComponent />}
    </div>
  );
};

export default TextComponent;
