import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import toolbarOptions from "./Utility/toolbarOptions.js";
import "./FormattedText.style.css";

const FormattedText = ({ placeHolderText }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div className="App">
      <Editor
        editorState={editorState}
        spellCheck="true"
        onEditorStateChange={(state) => {
          setEditorState(state);
        }}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbarOptions}
        placeholder={placeHolderText}
      />
    </div>
  );
};

export default FormattedText;
