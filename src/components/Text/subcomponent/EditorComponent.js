import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { v4 as uuidv4 } from "uuid";
import "quill-paste-smart";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const EditorComponent = ({ body, setProp }) => {

  const toolbarId = `unique-id-${uuidv4()}`;

  //state to hide toolbar if clicked outside text component
  const [ editorIsFocus, setEditorIsFocus ] = useState(false)

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  useOnClickOutside(textRef, () => setEditorIsFocus(false))

  useEffect(() => {
    //on render set focus on the editor
    focusRef.current.focus();
    //on render toolbar appears
    setEditorIsFocus(true);
  }, []);
  
    //set the data when the editor content changes
    const handleDataChange = (content, delta, source, editor) => {
      let editorContent = editor.getContents();
      setProp({ body: editorContent });
    };
  
  //customization settings for toolbar
  const formats = [
    "bold",
    "italic",
    "underline",
    "script",
    "strike",
    "formula",
    "align",
    "list",
    "bullet",
    "link",
  ];

  const modules = {
    toolbar: {
      container: `#${toolbarId}`,
    },
    clipboard: {
      allowed: {
        tags: [
          "a",
          "strong",
          "u",
          "s",
          "i",
          "p",
          "br",
          "ul",
          "ol",
          "li",
          "b",
          "sub",
          "sup",
        ],
        attributes: ["href", "rel", "target", "class"],
      },
      keepSelection: true,
      substituteBlockElements: true,
      magicPasteLinks: true,
      hooks: {
        uponSanitizeElement(node, data, config) {
          console.log(node);
        },
      },
    },
  };

  return (
    <div ref={textRef} onClick={() => setEditorIsFocus(true)} className="text-editor" data-testid="text-editor-component">
      <div className={ editorIsFocus ? "showtool" : "hidetool"}>
        <CustomToolBar toolbarId={toolbarId} />
      </div>
        <ReactQuill
          ref={focusRef}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat."
          className="quillEditor"
          onChange={handleDataChange}
        />
    </div>
  );
};

export default EditorComponent;
