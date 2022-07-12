import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { v4 as uuidv4 } from "uuid";
import "quill-paste-smart";

export function useOnClickOutside(ref, handler) {
    
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

const EditorComponent = ({ body, setProp }) => {

  const toolbarId = `unique-id-${uuidv4()}`;
  
  const [ editorIsFocus, setEditorIsFocus ] = useState(false)

  const focusRef = useRef(null);
  const textRef = useRef(null);

  useOnClickOutside(textRef, () => setEditorIsFocus(false))

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

useEffect(() => {
  focusRef.current.focus();
  setEditorIsFocus(true);
}, []);


  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();
    setProp({ body: editorContent });
  };

  return (
    <div className="text-editor" data-testid="text-editor-component">
      <div className="showtool" style={editorIsFocus ? { display: 'flex'} : { display: 'none'}}>
        <CustomToolBar toolbarId={toolbarId} />
      </div>
      <div ref={textRef} onClick={() => setEditorIsFocus(true)}>
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
    </div>
  );
};

export default EditorComponent;
