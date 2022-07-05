import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import Delta from 'quill-delta';
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorComponent = ({ body, setProp }) => {

  const toolbarId = `unique-id`;

  var icons = Quill.import("ui/icons");
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
  
    useEffect(() => {
      focusRef.current.focus();
    }, []);

  const ops = [{insert:'this is a test'}]
  const [state, setState] = useState(new Delta(ops));

  const handleDataChange = (content, delta, source, editor) => {
    let userInput = editor.getContents()
    console.log("eidtor:",userInput)
  };


  return (
    <div className="text-editor" data-testid='text-editor-component'>

      <div className="showtool">
        <CustomToolBar toolbarId={toolbarId} />
      </div>
      <button onClick={() => setProp({body: 'please work'})}>click me</button>

      <ReactQuill
        ref={focusRef}
        modules={{
          toolbar: {
            container: `#${toolbarId}`,
          },
        }}
        value={state}
        onChange={( editor ) => {
            setState(editor.getContents());
            console.log(`state:`, state);
        }}
        formats={formats}
        theme={"snow"}
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
