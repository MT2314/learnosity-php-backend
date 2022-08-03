import React, { useState } from "react";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  // convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import toolbarOptions from "./Utility/toolbarOptions.js";
// import KeysLink from "./KeysLink.js";
import "./FormattedText.style.css";

export const defaultProps = { placeHolderText: "", body: null };

const FormattedText = ({
  placeHolderText,
  editorRef,
  body = null,
  toolbar = toolbarOptions,
  setProp = () => console.warn("No state change function provided"),
}) => {
  /*
  Body contains what will be saved to the database.  For now it's a DraftJS raw state
  Once the component is rendered, it'll maintain its state using _bodyState, while keeping body up to date for saving
  */

  const [_editorState, setEditorState] = useState(() => {
    return body
      ? EditorState.createWithContent(convertFromRaw(body))
      : EditorState.createEmpty();
  });

  return (
    <div
      className="formattedTextContainer"
      data-id="formatted text"
      data-testid="formatted-text"
    >
      <Editor
        editorState={_editorState}
        spellCheck="true"
        handlePastedText={(text, html, editorState) =>
          console.log(text, html, editorState)
        }
        onEditorStateChange={(newState) => {
          setProp({ body: convertToRaw(newState.getCurrentContent()) });
          setEditorState(newState);
        }}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={toolbar}
        // toolbarCustomButtons={[<KeysLink />]}
        placeholder={placeHolderText}
        editorRef={editorRef}
      />
    </div>
  );
};

export default FormattedText;
