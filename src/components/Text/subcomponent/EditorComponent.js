import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";
import { v4 as uuidv4 } from "uuid";
import "quill-paste-smart";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import ExtendLinkFunctionality from "./popupToolBar/ExtendLinkFunctionality";
import {
  defaultAnchorState,
  ModifyAnchorText,
  ConvertLinks,
} from "../utils/HandleLinks";
import CheckHighlights from "../utils/CheckHighlights";

const EditorComponent = ({ body, setProp, setShowEditor }) => {
  //generate a unique id for toolbar and keep it from changing with useMemo
  const toolbarId = useMemo(() => `unique-id-${uuidv4()}`, []);

  //state to hide toolbar if clicked outside text component
  const [editorIsFocus, setEditorIsFocus] = useState(false);

  //state to modify link text
  const [modifyAnchorText, setModifyAnchorText] = useState(defaultAnchorState);

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  useOnClickOutside(textRef, () => {
    setEditorIsFocus(false);
    setShowEditor(false);
  });

  useEffect(() => {
    //extend default link functionality on mount
    ExtendLinkFunctionality(`toolbar-${toolbarId}`);
    focusRef.current.editor.setContents(body);
    //on render set focus on the editor
    focusRef.current.focus();
    //on render toolbar appears
    setEditorIsFocus(true);
  }, []);

  //set the data when the editor content changes
  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();

    //quill instance
    const quill = focusRef.current;
    const quillText = quill.getEditor().getText();

    //check for links
    const linksChecked = checkForLinks(quill, quillText, editorContent);

    //check for selection with highlights
    const noHighlights = CheckHighlights(editorContent);

    //edit ops on paste
    const onPaste =
      editorContent.ops[0].insert === "\n" && editorContent.ops.length === 1;
    onPaste && (editorContent.ops[0].insert = "");

    noHighlights && linksChecked && setProp({ body: editorContent });
  };

  //check and modify links
  const checkForLinks = (quill, quillText, editorContent) => {
    let changeFromAPI = false;
    const {
      anchorTextEqualToLink,
      insertRange,
      linkText,
      placeSelectionRight,
    } = modifyAnchorText;

    if (anchorTextEqualToLink) {
      const { index, length } = insertRange;
      const selection = { index: index + length, length: 0 };

      setModifyAnchorText(defaultAnchorState);
      placeSelectionRight && quill.setEditorSelection(quill.editor, selection);

      changeFromAPI = true;
      quill.getEditor().formatText(index, length, "link", linkText);
    }
    if (!anchorTextEqualToLink) {
      const { link, startLinkIndex, endLinkIndex } = ConvertLinks(
        editorContent,
        quillText
      );

      if (link) {
        const selection = { index: startLinkIndex + endLinkIndex, length: 0 };
        quill.setEditorSelection(quill.editor, selection);

        changeFromAPI = true;
        quill
          .getEditor()
          .formatText(startLinkIndex, endLinkIndex, "link", link);
      }

      const {
        removeRange,
        insertRange,
        linkText,
        anchorTextEqualToLink,
        removeFormat,
        placeSelectionRight,
      } = ModifyAnchorText(editorContent, quillText);

      if (!link && (linkText || removeFormat)) {
        const { index, length } = removeRange;

        !removeFormat &&
          setModifyAnchorText({
            anchorTextEqualToLink,
            insertRange,
            linkText,
            placeSelectionRight,
          });

        quill.getEditor().removeFormat(index, length);
        changeFromAPI = true;
      }
    }

    return !changeFromAPI;
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
        matchVisual: false,
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
        defaultValue={body}
      />
    </div>
  );
};

export default EditorComponent;
