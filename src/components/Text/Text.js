import React, { useState, useRef } from "react";
import DefaultText from "./subcomponent/DefaultText";
import EditorComponent from "./subcomponent/EditorComponent";
import "./styles/Text.scss";

export const defaultProps = { body: null };

const Text = ({ body = { ops: [{ insert: "" }] }, setProp = () => {} }) => {
  const [showEditor, setShowEditor] = useState(false);
  const focusOutofText = useRef(null);

  return (
    <>
      {(!showEditor && body === null) ||
        (!showEditor && !body.ops) ||
        (!showEditor && body.ops[0].insert === "") ? (
        <div
          onClick={() => {
            setShowEditor(true);
          }}
          className="mainContainer"
          data-testid="text-component"
          tabIndex="0"
          role="button"
          aria-label={"Hit Enter to edit the Text Component. Hit Escape to exit."}
          onKeyDown={(e) => {
            e.key === "Enter" && setShowEditor(true);
          }}
        >
          <DefaultText />
        </div>
      ) : (
        <EditorComponent
          body={body}
          setProp={setProp}
          setShowEditor={setShowEditor}
          focusOutofText={focusOutofText.current}
        />
      )}
      <div tabIndex="-1" ref={focusOutofText} />
    </>
  );
};

export default Text;
