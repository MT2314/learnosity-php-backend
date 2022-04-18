import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./FormattedText.style.css"

const FormattedText = ({placeHolderText}) => {

   const [editorState, setEditorState] = useState(() => EditorState.createEmpty()
   );

   const handleEditorChange = (state) => {
      setEditorState(state);
   };

   const toolBarObject = {
      options: ["inline", "textAlign", "list", "link"],
      inline: {
         options: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
         ],
         bold: { className: "bordered-option-classname" },
         italic: { className: "bordered-option-classname" },
         underline: { className: "bordered-option-classname" },
         strikethrough: { className: "bordered-option-classname" },
         code: { className: "bordered-option-classname" },
      },
      textAlign: {
         options: ["left", 'center', 'right', "justify"],
       },
       link: {
         options: ['link', "unlink"],
       }
   };
   return (
      <div className="App">
         <Editor
            editorState={editorState}
            spellCheck="true"
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={toolBarObject}
            placeholder={placeHolderText}
            />
      </div>
   );
}

export default FormattedText;
