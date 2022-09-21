import React, { useEffect, useRef, useState, useMemo } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-paste-smart";

import ExtendLinkFunctionality from "./popupToolBar/ExtendLinkFunctionality";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";

import { v4 as uuidv4 } from "uuid";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import {
  defaultAnchorState,
  ModifyAnchorText,
  ConvertLinks,
  AddLinkEvents,
  handleSelection,
} from "../utils/HandleLinks";
import CheckHighlights from "../utils/CheckHighlights";
import { FormulaEvents } from "../utils/FormulaEvents";
import setAlignment from "../utils/setAlignment";

import MathPixMarkdown from "../blots/MathPixMarkdown";

import {
  useSetQuill,
  useSetUniqueId,
  useShowMath,
  useKeepEditor,
  useBoldRef,
} from "../Provider";

import "katex/dist/katex.css";

import styled from "@emotion/styled";

const Delta = Quill.import("delta");

Quill.register("formats/mathpix", MathPixMarkdown);

const StyledConfigBar = styled("div")(
  ({ editorIsFocus, isInfoBox, infoAreaFocused }) => {
    const display = isInfoBox
      ? infoAreaFocused
        ? "flex"
        : "none"
      : editorIsFocus
      ? "flex"
      : "none";

    const configBarStyles = {
      display: display,
      position: "fixed",
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      justifyContent: "center",
      backgroundColor: "#fff",
    };
    return configBarStyles;
  }
);

const EditorComponent = ({
  body,
  setProp,
  setShowEditor,
  showEditor,
  setActiveComponent,
  isActiveComponent,
  isInfoBox,
  infoAreaFocused,
  infoHasFocus,
  selectedIcon,
  setSelectedIcon,
  setInfoHasFocus,
  setTextRef,
}) => {
  //context hooks
  const setQuill = useSetQuill();
  const setUniqueId = useSetUniqueId();
  const showMath = useShowMath();
  const keepEditor = useKeepEditor();
  const boldRef = useBoldRef();

  //generate a unique id for toolbar and keep it from changing with useMemo
  const toolbarId = useMemo(() => `unique-id-${uuidv4()}`, []);

  //state to hide toolbar if clicked outside text component
  const [editorIsFocus, setEditorIsFocus] = useState(false);

  //alignment observer
  const [alignmentObserver, setAlignmentObserver] = useState(null);

  //state to modify link text
  const [modifyAnchorText, setModifyAnchorText] = useState(defaultAnchorState);

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  // state for Align & List toolbar selection
  const [activeDropDownAlignItem, setActiveDropDownAlignItem] = useState("");
  const [activeDropDownListItem, setActiveDropDownListItem] = useState("");

  useEffect(() => {
    editorIsFocus ? setActiveComponent(true) : setActiveComponent(false);
  }, [editorIsFocus, setActiveComponent]);

  useOnClickOutside(textRef, () => {
    if (!showMath && !keepEditor && !isInfoBox) {
      alignmentObserver?.disconnect();
      setEditorIsFocus(false);
      setShowEditor(false);
    }
  });

  useEffect(() => {
    //set quill instance
    setQuill(focusRef?.current?.getEditor());
    //set unique id instance
    setUniqueId(toolbarId);
    //extend default link functionality on mount
    ExtendLinkFunctionality(
      `toolbar-${toolbarId}`,
      focusRef?.current?.getEditor()
    );
    //check for formulas
    FormulaEvents(toolbarId);
    // on render editor is focused
    showEditor && !isInfoBox && focusRef.current.focus();
    //on render toolbar appears
    showEditor && !isInfoBox && setEditorIsFocus(true);
    //on mount pass back focusRef
    isInfoBox &&
      setTextRef({ text: textRef.current, quill: focusRef?.current });
  }, []);

  useEffect(() => {
    if (focusRef?.current && body) {
      //quill instance
      const quill = focusRef?.current?.getEditor();
      //convert body to delta
      const deltaBody = new Delta(body);
      //get currentContents
      const currentContents = quill.getContents();
      //check if currentContents is equal to deltaBody
      const diff = currentContents.diff(deltaBody);
      //if not equal set quill to body
      //check if deltas first insert is empty and attributes is align
      const alignment =
        deltaBody.ops[0]?.attributes?.align && deltaBody?.ops[0]?.insert === "";
      //check if deltas first insert is empty and attributes is list
      const list =
        deltaBody.ops[0]?.attributes?.list && deltaBody?.ops[0]?.insert === "";
      //if difference and not alignment or list set quill to body
      diff.ops.length > 0 &&
        !alignment &&
        !list &&
        quill.setContents(body, "silent");
    }
  }, [body]);

  // Set formating - align & list  @ current focus
  const formatSelection = (quillRef) => {
    if (quillRef !== null && editorIsFocus) {
      const quill = quillRef.getEditor();
      if (quill.hasFocus()) {
        const currentFormat = quill.getFormat();
        currentFormat?.list
          ? setActiveDropDownListItem(currentFormat.list)
          : setActiveDropDownListItem("");
        currentFormat?.align
          ? setActiveDropDownAlignItem(currentFormat.align)
          : setActiveDropDownAlignItem("left");
      }
    }
  };

  //set the data when the editor content changes
  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();

    //quill instance
    const quill = focusRef?.current;
    const quillText = quill?.getEditor().getText();

    //check for links
    const linksChecked = checkForLinks(quill, quillText, editorContent);

    // add eventListeners to editor
    AddLinkEvents(`toolbar-${toolbarId}`);

    //check for selection with highlights
    const noHighlights = CheckHighlights(editorContent);

    //check for formulas
    FormulaEvents(toolbarId);

    //edit ops on paste
    const onPaste =
      editorContent.ops[0].insert === "\n" && editorContent.ops.length === 1;
    onPaste && (editorContent.ops[0].insert = "");

    //update setProp with new editorContent
    noHighlights &&
      linksChecked &&
      source !== "silent" &&
      setProp({ body: editorContent });
  };

  //check and modify links
  const checkForLinks = (quill, quillText, editorContent) => {
    //a flag to check if the change is coming from the API.
    let changeFromAPI = false;

    //destructuring modifyAnchorText state
    const {
      anchorTextEqualToLink,
      insertRange,
      linkText,
      placeSelectionRight,
      firstInsert,
    } = modifyAnchorText;

    //check to see if the link text is equal to the anchor text
    if (anchorTextEqualToLink) {
      //destructuring insertRange
      const { index, length } = insertRange;

      //resetting setModifyAnchorText with default state
      setModifyAnchorText(defaultAnchorState);

      //set cursor position at the end of the link
      placeSelectionRight &&
        quill.setEditorSelection(quill.editor, {
          index: index + length,
          length: 0,
        });

      //change coming from API
      changeFromAPI = true;

      // format text to link
      quill
        .getEditor()
        .formatText(index - (firstInsert ? 1 : 0), length, "link", linkText);
    }

    //check if anchor text and link text are not the same
    if (!anchorTextEqualToLink) {
      //returns the link, the start index and the end index of the link
      const { link, startLinkIndex, endLinkIndex } = ConvertLinks(
        editorContent,
        quillText
      );

      //if the link is valid format the text to be a link
      if (link) {
        //set cursor position to the end of the link
        quill.setEditorSelection(quill.editor, {
          index: startLinkIndex + endLinkIndex,
          length: 0,
        });

        //change coming from API
        changeFromAPI = true;

        //format the text to be a link
        quill
          .getEditor()
          .formatText(startLinkIndex, endLinkIndex, "link", link);
      }

      //destructuring modifyAnchorText state
      const {
        removeRange,
        insertRange,
        linkText,
        anchorTextEqualToLink,
        removeFormat,
        placeSelectionRight,
        firstInsert,
      } = ModifyAnchorText(editorContent, quillText);

      //check if link is valid, and if linkText or removeFormat is true
      if (!link && (linkText || removeFormat)) {
        //destructuring removeRange state
        const { index, length } = removeRange;

        //if removeFormat is false, then set setModifyAnchorText
        !removeFormat &&
          setModifyAnchorText({
            anchorTextEqualToLink,
            insertRange,
            linkText,
            placeSelectionRight,
            firstInsert,
          });

        //removing link format from quill instance
        quill.getEditor().removeFormat(index, length);

        //change coming from API
        changeFromAPI = true;
      }
    }
    //return true if change is not from API
    return !changeFromAPI;
  };

  // focus to the bold
  const onKeyDropDown = (e) => {
    if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      boldRef?.current.focus();
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
    "mathpix",
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#${toolbarId}`,
      },
      keyboard: { bindings: { tab: false } },
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
        substituteBlockElements: false,
        magicPasteLinks: true,
      },
    }),
    []
  );

  return (
    <div
      ref={textRef}
      onClick={(e) => {
        setEditorIsFocus(true);
      }}
      onFocus={(e) => {
        setEditorIsFocus(true);
      }}
      onBlur={(e) => {
        const relatedTarget = e.relatedTarget || document.activeElement;
        if (relatedTarget.tagName === "BODY") {
          e.preventDefault();
          return;
        }
        if (
          (!relatedTarget ||
            (!e.currentTarget.contains(relatedTarget) && !keepEditor)) &&
          !showMath &&
          !isInfoBox
        ) {
          alignmentObserver?.disconnect();
          setEditorIsFocus(false);
          setShowEditor(false);
        }
      }}
      className="text-editor"
      id={`toolbar-${toolbarId}`}
      data-testid="text-editor-component"
    >
      <StyledConfigBar
        editorIsFocus={editorIsFocus}
        isInfoBox={isInfoBox}
        infoAreaFocused={infoAreaFocused}
      >
        <CustomToolBar
          toolbarId={toolbarId}
          focusRef={focusRef}
          activeDropDownListItem={activeDropDownListItem}
          setActiveDropDownListItem={setActiveDropDownListItem}
          activeDropDownAlignItem={activeDropDownAlignItem}
          setActiveDropDownAlignItem={setActiveDropDownAlignItem}
          isInfoBox={isInfoBox}
          infoHasFocus={infoHasFocus}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </StyledConfigBar>

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
        onChangeSelection={(range, source, editor) => {
          handleSelection(range, `toolbar-${toolbarId}`, focusRef.current);
          formatSelection(focusRef.current);
        }}
        onFocus={() => {
          setAlignmentObserver(new setAlignment(toolbarId));
          FormulaEvents(toolbarId);
          infoHasFocus && setInfoHasFocus(false);
        }}
        onKeyDown={(e) => {
          onKeyDropDown(e);
        }}
      />
    </div>
  );
};

export default EditorComponent;
