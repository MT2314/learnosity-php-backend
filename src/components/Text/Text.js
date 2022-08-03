import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

export const defaultProps = { body: null };

const Text = ({ body = { ops: [{ insert: "" }] }, setProp = () => {} }) => {
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    setShowEditor(true);
  };

  const focusFunction = () => {
    console.log(document.activeElement)
  }

  return (
    <>
      {(!showEditor && body === null) ||
      (!showEditor && !body.ops) ||
      (!showEditor && body.ops[0].insert === "") ? (
        <div
          onClick={() => {
            handleOnClick();
          }}
          className="mainContainer"
          data-testid="text-component"
          tabIndex="0"
          onKeyDown={() => {
            setShowEditor(true);
          }}
        >
          <DefaultText />
        </div>
      ) : (
        <EditorComponent
          body={body}
          setProp={setProp}
          setShowEditor={setShowEditor}
        />
      )}
    </>
  );
};

export default Text;
