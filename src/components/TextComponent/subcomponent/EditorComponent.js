import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";

const EditorComponent = () => {
  const toolbarId = `unique-id-${Math.floor(Math.random() * 100000000)}`;
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div className="text-editor">
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
        theme={"snow"}
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat."
        className="quillEditor"
      />
    </div>
  );
};

export default EditorComponent;
