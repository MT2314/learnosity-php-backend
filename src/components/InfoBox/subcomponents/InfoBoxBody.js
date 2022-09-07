import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import CustomToolBar from './CustomToolBar';
import '../../Text/styles/EditorComponent.scss';
import { v4 as uuid } from 'uuid';
import 'quill-paste-smart';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import ExtendLinkFunctionality from '../../Text/subcomponent/popupToolBar/ExtendLinkFunctionality';
import {
  defaultAnchorState,
  ModifyAnchorText,
  ConvertLinks,
  AddLinkEvents,
  handleSelection,
} from '../../Text/utils/HandleLinks';
import CheckHighlights from '../../Text/utils/CheckHighlights';
import { FormulaEvents } from '../../Text/utils/FormulaEvents';

import MathPixMarkdown from '../../Text/blots/MathPixMarkdown';
import {
  useSetQuill,
  useSetUniqueId,
  useShowMath,
  useKeepEditor,
} from '../../Text/Provider';

import 'katex/dist/katex.css';

Quill.register('formats/mathpix', MathPixMarkdown);

export const InfoBoxBody = ({
  body,
  setProp,
  setShowEditor,
  showEditor,
  setActiveComponent,
  isActiveComponent,
}) => {
  //context hooks
  const setQuill = useSetQuill();
  const setUniqueId = useSetUniqueId();
  const showMath = useShowMath();
  const keepEditor = useKeepEditor();

  //generate a unique id for toolbar and keep it from changing with useMemo
  const toolbarId = useMemo(() => `unique-id-${uuid()}`, []);

  //state to hide toolbar if clicked outside text component
  const [editorIsFocus, setEditorIsFocus] = useState(false);

  //state to modify link text
  const [modifyAnchorText, setModifyAnchorText] = useState(defaultAnchorState);

  //add focus to editor
  const focusRef = useRef(null);

  //track clicks outside text div
  const textRef = useRef(null);

  //focus to the bold
  const boldRef = useRef(null);

  const ConfigBar = {
    display: !isActiveComponent ? (editorIsFocus ? 'flex' : 'none') : 'flex',
    position: 'fixed',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    justifyContent: 'center',
    backgroundColor: '#fff',
  };

  useEffect(() => {
    editorIsFocus ? setActiveComponent(true) : setActiveComponent(false);
  }, [editorIsFocus, setActiveComponent]);

  useOnClickOutside(textRef, () => {
    if (!showMath && !keepEditor) {
      setEditorIsFocus(false);
      setShowEditor(false);
    }
  });

  useEffect(() => {
    //set quill instance
    setQuill(focusRef.current.getEditor());
    //set unique id instance
    setUniqueId(toolbarId);
    //extend default link functionality on mount
    ExtendLinkFunctionality(`toolbar-${toolbarId}`);
    //check for formulas
    FormulaEvents(toolbarId);
    // on render editor is focused
    showEditor && focusRef.current.focus();
    //on render toolbar appears
    showEditor && setEditorIsFocus(true);
  }, []);

  //set the data when the editor content changes
  const handleDataChange = (content, delta, source, editor) => {
    let editorContent = editor.getContents();

    //quill instance
    const quill = focusRef.current;
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
      editorContent.ops[0].insert === '\n' && editorContent.ops.length === 1;
    onPaste && (editorContent.ops[0].insert = '');

    //update setProp with new editorContent
    noHighlights && linksChecked && setProp({ body: editorContent });
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
        .formatText(index - (firstInsert ? 1 : 0), length, 'link', linkText);
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
          .formatText(startLinkIndex, endLinkIndex, 'link', link);
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
    if (e.shiftKey && e.key === 'Tab') {
      e.preventDefault();
      boldRef.current.focus();
    }
  };

  //customization settings for toolbar
  const formats = [
    'bold',
    'italic',
    'underline',
    'script',
    'strike',
    'formula',
    'align',
    'list',
    'bullet',
    'link',
    'background',
    'mathpix',
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
            'a',
            'strong',
            'u',
            's',
            'i',
            'p',
            'br',
            'ul',
            'ol',
            'li',
            'b',
            'sub',
            'sup',
          ],
          attributes: ['href', 'rel', 'target', 'class'],
        },
        keepSelection: true,
        substituteBlockElements: false,
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
      onFocus={() => setEditorIsFocus(true)}
      onBlur={(e) => {
        const relatedTarget = e.relatedTarget || document.activeElement;

        if (relatedTarget.tagName === 'BODY') {
          e.preventDefault();
          return;
        }

        if (
          (!relatedTarget ||
            (!e.currentTarget.contains(relatedTarget) && !keepEditor)) &&
          !showMath
        ) {
          setEditorIsFocus(false);
          setShowEditor(false);
        }
      }}
      className="text-editor"
      id={`toolbar-${toolbarId}`}
      data-testid="text-editor-component"
    >
      <div style={ConfigBar}>
        {/* <CustomToolBar
          toolbarId={toolbarId}
          containerId={`toolbar-${toolbarId}`}
          boldRef={boldRef}
          focusRef={focusRef}
        /> */}
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
        onChangeSelection={(range, source, editor) =>
          handleSelection(
            range,
            source,
            editor,
            `toolbar-${toolbarId}`,
            focusRef.current
          )
        }
        onFocus={() => {
          FormulaEvents(toolbarId);
        }}
        onKeyDown={(e) => {
          onKeyDropDown(e);
        }}
      />
    </div>
  );
};