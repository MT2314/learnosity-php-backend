import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { v4 as uuidv4 } from "uuid";
import "quill-paste-smart";

const EditorComponent = ({ body, setProp }) => {
  const toolbarId = `unique-id-${uuidv4()}`;

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
