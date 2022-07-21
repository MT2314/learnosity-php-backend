import React, { useState } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

export const defaultProps = { body: null };

const Text = ({ body = { ops: [{ insert: "\n" }] }, setProp = () => {} }) => {
  const [showEditor, setShowEditor] = useState(false);

  const handleOnClick = () => {
    setShowEditor(true);
  };

  return (
    <>
      {!showEditor && body === null ? (
        <div
          onClick={() => {
            handleOnClick();
          }}
          className="mainContainer"
          data-testid="text-component"
        >
          <DefaultText />
        </div>
      ) : (
        <EditorComponent body={body} setProp={setProp} />
      )}
    </>
  );
};

export default Text;
