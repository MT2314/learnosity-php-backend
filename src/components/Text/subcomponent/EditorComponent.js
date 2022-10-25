import React, { useEffect, useRef, useState, useMemo } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import ExtendLinkFunctionality from "./popupToolBar/ExtendLinkFunctionality";
import CustomToolBar from "./CustomToolBar";
import "../styles/EditorComponent.scss";

import { v4 as uuidv4 } from "uuid";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { checkTextForUrl } from "../utils/HandleLinks";
import CheckHighlights from "../utils/CheckHighlights";
import { FormulaEvents, linkClickEvent } from "../utils/FormulaEvents";
import setAlignment from "../utils/setAlignment";

import MathPixMarkdown from "../blots/MathPixMarkdown";

import {
  useMathId,
  useSetQuill,
  useSetUniqueId,
  useShowMath,
  useKeepEditor,
  useBoldRef,
  useSetEditorPos,
  useShowLink,
  useSetShowLink,
  useIsLink,
  useSetIsLink,
} from "../Provider";

import { matchMsWordList, maybeMatchMsWordList } from "../matchers/pasteLists";
import { matchSpan } from "../matchers/pasteSpan";
import { matchText } from "../matchers/pasteText";

import "katex/dist/katex.css";

import styled from "@emotion/styled";

const Delta = Quill.import("delta");

Quill.register("formats/mathpix", MathPixMarkdown);

const StyledConfigBar = styled("div")(
  ({
    editorIsFocus,
    isInfoBox,
    isVideo,
    infoAreaFocused,
    videoAreaFocused,
  }) => {
    const display =
      isInfoBox || isVideo
        ? infoAreaFocused || videoAreaFocused
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
  isVideo,
  videoAreaFocused,
  videoHasFocus,
  selectedIcon,
  setSelectedIcon,
  setInfoHasFocus,
  setVideoHasFocus,
  setTextRef,
  setTabActive,
  setVideoAPI,
  videoAPI,
  videoTextSettings,
  setVideoTextSettings,
  closeToolBar,
  setCloseToolBar,
}) => {
  //context hooks
  const mathId = useMathId();
  const boldRef = useBoldRef();
  const setQuill = useSetQuill();
  const showMath = useShowMath();
  const showLink = useShowLink();
  const setShowLink = useSetShowLink();
  const keepEditor = useKeepEditor();
  const setUniqueId = useSetUniqueId();
  const setEditorPos = useSetEditorPos();
  const isLink = useIsLink();
  const setIsLink = useSetIsLink();

  //generate a unique id for toolbar and keep it from changing with useMemo
  const toolbarId = useMemo(() => `unique-id-${uuidv4()}`, []);

  //state to hide toolbar if clicked outside text component
  const [editorIsFocus, setEditorIsFocus] = useState(false);

  //alignment observer
  const [alignmentObserver, setAlignmentObserver] = useState(null);

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  // state for Align & List toolbar selection
  const [activeDropDownAlignItem, setActiveDropDownAlignItem] = useState("");
  const [activeDropDownListItem, setActiveDropDownListItem] = useState("");

  useEffect(() => {
    editorIsFocus && setActiveComponent(true);
  }, [editorIsFocus]);

  // useOnClickOutside(textRef, () => {
  //   if (!showMath && !keepEditor && !isInfoBox && !isVideo) {
  //     alignmentObserver?.disconnect();
  //     setEditorIsFocus(false);
  //     setShowEditor(false);
  //     setTabActive(false);
  //   }
  // });

  useEffect(() => {
    // const tb =
    //   textFocused &&
    //   toolbar?.current?.querySelector(`#custom-toolbar-${toolbarId}`);

    // if (tb) return;
    if (infoHasFocus) return;
    if ((showLink || showMath || keepEditor) && !closeToolBar) return;
    if (!closeToolBar) return;

    console.log("CLOSING");

    alignmentObserver?.disconnect();
    setEditorIsFocus(false);
    setShowEditor(false);
    setTabActive(false);
    setCloseToolBar(false);
    setTabActive(false);
  }, [
    showMath,
    keepEditor,
    showLink,
    infoHasFocus,
    closeToolBar,
    editorIsFocus,
  ]);

  useEffect(() => {
    //set quill instance
    setQuill(focusRef?.current?.getEditor());
    //set unique id instance
    setUniqueId(toolbarId);
    //extend default link functionality on mount
    ExtendLinkFunctionality(toolbarId);
    //check for formulas
    FormulaEvents(toolbarId);
    // on render editor is focused
    showEditor && !isInfoBox && !isVideo && focusRef.current.focus();
    //on render toolbar appears
    showEditor && !isInfoBox && !isVideo && setEditorIsFocus(true);
    //on mount pass back focusRef
    (isInfoBox || isVideo) &&
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
  const formatSelection = (range, quillRef) => {
    if (quillRef !== null && editorIsFocus) {
      const quill = quillRef.getEditor();
      if (quill.hasFocus()) {
        const currentFormat = quill.getFormat();
        const nexFormat = quill.getFormat(range.index, range.length + 1);
        currentFormat?.list
          ? setActiveDropDownListItem(currentFormat.list)
          : setActiveDropDownListItem("");
        currentFormat?.align
          ? setActiveDropDownAlignItem(currentFormat.align)
          : setActiveDropDownAlignItem("left");

        if ((currentFormat?.link || nexFormat?.link) && range.length < 1) {
          const [blot, offset] = quill.getLeaf(range.index);
          const index = quill.getIndex(blot);
          const delta = quill.getContents(index);

          const opIndex = Object.keys(currentFormat).length !== 0 ? 0 : 1;

          const link = delta.ops[opIndex].attributes.link;
          const text = delta.ops[opIndex].insert;

          text.length !== offset
            ? linkClickEvent(toolbarId, index, text, link)
            : showLink && setShowLink(false);
        } else {
          showLink && setShowLink(false);
        }

        if (currentFormat?.link && range.length > 0) {
          setIsLink(true);
        } else {
          isLink && setIsLink(false);
        }
      }
    }
  };

  //set the data when the editor content changes
  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();

    //quill instance
    const quill = focusRef?.current?.getEditor();

    //check for links
    let checkLinks = null;
    const ops = delta.ops;
    const lastOp = ops[ops.length - 1];
    if (
      lastOp.insert &&
      typeof lastOp.insert === "string" &&
      lastOp.insert.match(/\s/)
    ) {
      checkLinks = checkTextForUrl(quill);
    }

    // add eventListeners to editor
    // AddLinkEvents(`toolbar-${toolbarId}`);

    //check for selection with highlights
    const noHighlights = CheckHighlights(editorContent);

    //check for formulas
    FormulaEvents(toolbarId);

    //edit ops on paste
    const onPaste =
      editorContent.ops[0].insert === "\n" && editorContent.ops.length === 1;
    onPaste && (editorContent.ops[0].insert = "");

    checkLinks && quill.updateContents(checkLinks);

    //update setProp with new editorContent
    noHighlights &&
      source !== "silent" &&
      !checkLinks &&
      setProp({ body: editorContent });
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
    "indent",
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
        matchers: [
          ["p.MsoListParagraphCxSpFirst", matchMsWordList],
          ["p.MsoListParagraphCxSpMiddle", matchMsWordList],
          ["p.MsoListParagraphCxSpLast", matchMsWordList],
          ["p.MsoListParagraph", matchMsWordList],
          ["p.msolistparagraph", matchMsWordList],
          ["p.MsoNormal", maybeMatchMsWordList],
          [Node.TEXT_NODE, matchText],
          ["SPAN", matchSpan],
        ],
      },
    }),
    []
  );

  return (
    <div
      ref={textRef}
      onClick={(e) => {
        setEditorIsFocus(true);
        setTabActive(true);
      }}
      onFocus={(e) => {
        setEditorIsFocus(true);
        setTabActive(true);
      }}
      onBlur={(e) => {
        // const tb =
        //   textFocused &&
        //   toolbar?.current?.querySelector(`#custom-toolbar-${toolbarId}`);

        const relatedTarget = e.relatedTarget || document.activeElement;
        if (relatedTarget.tagName === "BODY") {
          e.preventDefault();
          return;
        }

        if (toolbar?.current?.contains(relatedTarget)) {
          e.preventDefault();
          return;
        }

        if (
          (!relatedTarget ||
            (!e.currentTarget.contains(relatedTarget) && !keepEditor)) &&
          !showMath &&
          !showLink &&
          !infoHasFocus
        ) {
          alignmentObserver?.disconnect();
          setEditorIsFocus(false);
          setShowEditor(false);
          setActiveComponent(false);
          setTabActive(false);
          setCloseToolBar(false);
        }
      }}
      className="text-editor"
      id={`toolbar-${toolbarId}`}
      data-testid="text-editor-component"
    >
      <StyledConfigBar
        editorIsFocus={editorIsFocus}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        infoAreaFocused={infoAreaFocused}
        videoAreaFocused={videoAreaFocused}
      >
        <CustomToolBar
          toolbarId={toolbarId}
          focusRef={focusRef}
          activeDropDownListItem={activeDropDownListItem}
          setActiveDropDownListItem={setActiveDropDownListItem}
          activeDropDownAlignItem={activeDropDownAlignItem}
          setActiveDropDownAlignItem={setActiveDropDownAlignItem}
          isInfoBox={isInfoBox}
          isVideo={isVideo}
          infoHasFocus={infoHasFocus}
          videoHasFocus={videoHasFocus}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          setVideoAPI={setVideoAPI}
          videoAPI={videoAPI}
          videoTextSettings={videoTextSettings}
          setVideoTextSettings={setVideoTextSettings}
        />
      </StyledConfigBar>

      <ReactQuill
        ref={focusRef}
        modules={modules}
        scrollingContainer="html"
        formats={formats}
        theme="snow"
        placeholder={
          isVideo
            ? "Video description"
            : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.`
        }
        className="quillEditor"
        onChange={handleDataChange}
        defaultValue={body}
        onChangeSelection={(range, source, editor) => {
          // handleSelection(range, `toolbar-${toolbarId}`, focusRef.current);
          formatSelection(range, focusRef.current);
        }}
        onFocus={() => {
          setAlignmentObserver(new setAlignment(toolbarId));
          FormulaEvents(toolbarId);
          if (infoHasFocus || videoHasFocus) {
            setInfoHasFocus(false);
            setVideoHasFocus(false);
          }
        }}
        onKeyDown={(e) => {
          onKeyDropDown(e);
        }}
      />
    </div>
  );
};

export default EditorComponent;
