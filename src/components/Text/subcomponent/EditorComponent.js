import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";

const EditorComponent = ({ body, setProp }) => {
  const toolbarId = `unique-id-${Math.floor(Math.random() * 100000000)}`;

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

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();
    setProp({ body: editorContent });
  };

  return (
    <div className="text-editor" data-testid="text-editor-component">
      <div className="showtool">
        <CustomToolBar toolbarId={toolbarId} />
      </div>
      <ReactQuill
        ref={focusRef}
        modules={{
          toolbar: {
            container: `#${toolbarId}`,
          },
        }}
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
