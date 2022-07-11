import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import "quill-paste-smart";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorComponent = () => {
  const toolbarId = `unique-id-${Math.floor(Math.random() * 100000000)}`;

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["ql-formula"] =
    '<i class="fa-regular fa-pi fa-9x" style="color:#9b479f"></i>';

  const formats = [
    "bold",
    "italic",
    "underline",
    "script",
    "strike",
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

  return (
    <div className="text-editor">
      <div className="showtool">
        <CustomToolBar toolbarId={toolbarId} />
      </div>

      <ReactQuill
        ref={focusRef}
        modules={modules}
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
