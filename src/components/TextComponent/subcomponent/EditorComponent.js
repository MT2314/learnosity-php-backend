import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import Delta from 'quill-delta';
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorComponent = ({ body, setProp }) => {
  
  const toolbarId = `unique-id-${Math.floor(Math.random() * 100000000)}`;

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

  // const handleChange = (content, delta, source, editor) => {
  //   //console.log("Content:", content);
  //   //console.log("Delta:", delta);
  //   //console.log("Source:", source);
  //   console.log("Editor.getContents():", editor.getContents());
  //   const userInput = editor.getContents();
  //   //console.log(userInput.ops[0].insert);
  //   setState(userInput);
  //   setProp({ body: state });
  // };


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
      />
    </div>
  );
};

export default EditorComponent;
