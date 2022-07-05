import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorComponent = ({ body, setProp }) => {
  const toolbarId = `unique-id-${Math.floor(Math.random() * 100000000)}`;

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["ql-formula"] =
    '<i class="fa-regular fa-pi fa-9x" style="color:#9b479f"></i>';

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "script",
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

  const [state, setState] = useState(null);

  const handleChange = (content, delta, source, editor) => {
    console.log("Content:", content);
    console.log("Delta:", delta);
    console.log("Source:", source);
    console.log("Editor.getContents():", editor.getContents());
    const userInput = editor.getContents();
    console.log(userInput.ops[0].insert);
    setState(userInput.ops[0].insert);
    setProp({ body: state });
  };

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
        defaultValue={state}
        onChange={handleChange}
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
