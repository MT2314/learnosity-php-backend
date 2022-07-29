import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { v4 as uuidv4 } from "uuid";
import "quill-paste-smart";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import ExtendLinkFunctionality from "./popupToolBar/ExtendLinkFunctionality";
import ConvertPastedLinks from "../utils/ConvertPastedLinks";

const Delta = Quill.import("delta");

const EditorComponent = ({ body, setProp, setShowEditor }) => {
  //generate a unique id for toolbar and keep it from changing with useMemo

  const toolbarId = useMemo(() => `unique-id-${uuidv4()}`, []);

  //state to hide toolbar if clicked outside text component
  const [editorIsFocus, setEditorIsFocus] = useState(false);

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  useOnClickOutside(textRef, () => {
    setEditorIsFocus(false);
    setShowEditor(false);
  });

  // const reFocus = (link) => {
  //   if (link) {
  //     const editor = document.querySelector(".ql-editor");
  //     const p = editor.querySelector("p");
  //     console.log(p);
  //     const a = p.querySelector("a");
  //     console.log(a);
  //     const range = document.createRange();
  //     const selection = window.getSelection();

  //     range.selectNode(a);

  //     console.log("Range ", range);
  //     editor.click();
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // };

  useEffect(() => {
    //extend default link functionality on mount
    ExtendLinkFunctionality(`toolbar-${toolbarId}`);
    // focusRef.current.editor.clipboard.addMatcher("A", CustomMatcher);
    // focusRef.current.editor.clipboard.addMatcher(Node.TEXT_NODE, pasteLink);
    focusRef.current.editor.setContents(body);
    //on render set focus on the editor
    focusRef.current.focus();
    //on render toolbar appears
    setEditorIsFocus(true);
  }, []);

  useEffect(() => {
    console.log(body);
    // focusRef.current.editor.setContents(body);
  }, [body]);

  // const len = focusRef.current.unprivilegedEditor.getLength();
  // console.log(len);
  // const selection = { index: 0, length: len };
  // focusRef.current.setEditorSelection(focusRef.current.editor, selection);

  //set the data when the editor content changes
  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();
    let link;

    [editorContent, link] = ConvertPastedLinks(Delta, editorContent);

    // link && focusRef.current.editor.setContents(editorContent);

    // link && setValue(editorContent);
    // const len = focusRef.current.unprivilegedEditor.getLength();
    // console.log("Lenght: " + len);
    // const selection = { index: len - 1, length: len };
    // console.log(selection);
    // focusRef.current.setEditorSelection(focusRef.current.editor, selection);

    // const ed = document.querySelector(".ql-editor");
    // console.log(ed);
    // const p = ed.querySelector("p");
    // console.log(p);
    // link && p.focus();

    // console.log(focusRef.current.getEditor());

    if (
      editorContent.ops[0].insert === "\n" &&
      editorContent.ops.length === 1
    ) {
      editorContent.ops[0].insert = "";
      setProp({ body: editorContent });
    } else {
      setProp({ body: editorContent });
    }
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
    "background",
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${toolbarId}`,
      },
      clipboard: {
        // matchers: [[Node.TEXT_NODE, pasteLink]],
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
            "span",
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
    }),
    []
  );

  return (
    <div
      ref={textRef}
      onClick={() => setEditorIsFocus(true)}
      className="text-editor"
      id={`toolbar-${toolbarId}`}
      data-testid="text-editor-component"
    >
      <div className={editorIsFocus ? "showtool" : "hidetool"}>
        <CustomToolBar
          toolbarId={toolbarId}
          containerId={`toolbar-${toolbarId}`}
        />
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
