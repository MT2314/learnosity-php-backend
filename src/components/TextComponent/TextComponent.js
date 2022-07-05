import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/TextComponent.scss";

export const defaultProps = { body: 'testing' };

const TextComponent = ({body, setProp = () => {} }) => {
  
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    setShowEditor(true);
  };

  return (
    <>
      {!showEditor ? (
        <div
          onClick={() => {
            handleOnClick();
          }}
          className="mainContainer"
        >
          
          <DefaultText />
        </div>
      ) : (
        <EditorComponent body={body} setProp={setProp}/>
      )}
    </>
  );
};

export default TextComponent;
