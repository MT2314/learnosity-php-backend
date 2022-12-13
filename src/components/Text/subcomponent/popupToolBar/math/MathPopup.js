import React, { useRef, useState, useEffect } from "react";
import {
  useQuill,
  useSetShowMath,
  useUniqueId,
  useEditFormula,
  useSetEditFormula,
} from "../../../Provider";

import { useDrag, useDragDropManager, useDrop } from "react-dnd";

import { getEmptyImage } from "react-dnd-html5-backend";

import { InlineMath } from "react-katex";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CloseIcon from "@mui/icons-material/Close";

import { useOnClickOutside } from "../../../../../hooks/useOnClickOutside";

import MathLiveEditor from "./MathLiveEditor";
import "../../../styles/MathEquation.scss";

import Basic from "./keys/Basic";
import Operator from "./keys/Operator";
import Greek from "./keys/Greek";
import Sets from "./keys/Sets";
import Trig from "./keys/Trig";
import { TopSideKeys, BottomLeftKeys } from "./keys/SideKeys";

const MathPopup = () => {
  const quill = useQuill();
  const setMathShow = useSetShowMath();
  const uniqueId = useUniqueId();
  const editFormula = useEditFormula();
  const setEditFormula = useSetEditFormula();

  const isEdit = Boolean(editFormula.value);

  const [value, setValue] = useState("1");
  const [formula, setFormula] = useState(null);
  const [ariaLive, setAriaLive] = useState("");
  const [ariaLive2, setAriaLive2] = useState("");
  const [coords, setCoords] = useState(null);

  const mathfield = useRef(null);
  const containerRef = useRef(null);

  const tabs = [
    { label: "Basic", render: Basic },
    { label: "Operator", render: Operator },
    { label: "Greek", render: Greek },
    { label: "Sets", render: Sets },
    { label: "Trig", render: Trig },
  ];

  const closeMath = () => {
    setEditFormula({ value: null, id: null });
    setMathShow(false);
  };

  useOnClickOutside(containerRef, closeMath);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const [{ isDragging }, drag, preview] = useDrag({
    type: "math",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      offset: monitor.getSourceClientOffset(),
    }),
  });

  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  useEffect(
    () =>
      monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getClientOffset();
        offset && setCoords(offset);
      }),
    [monitor]
  );

  const handleClick = () => {
    const range = quill.getSelection(true);
    quill.removeFormat(range.index, isEdit ? range.length + 1 : range.length);
    quill.insertEmbed(
      range.index,
      "mathpix",
      mathfield.current.getValue("latex-expanded")
    );
    quill.insertText(range.index + range.length + 1, " ");
    quill.setSelection(range.index + range.length + 1);

    closeMath();
  };

  // Aria Live Handler
  const handleAriaLive = (value) => {
    if (ariaLive === value) {
      setAriaLive("");
      setAriaLive2(value);
    } else {
      setAriaLive2("");
      setAriaLive(value);
    }
  };

  useEffect(() => {
    containerRef.current?.focus();
    document.body.style.setProperty("--selection-background-color", "#A1CAF1");
    document.body.style.setProperty("--placeholder-color", "#000000");
    document.body.style.setProperty("--selection-color", "#000000");
    mathfield.current.setValue("");

    isEdit && mathfield.current.setValue(editFormula.value);

    preview(getEmptyImage(), { captureDraggingState: true });

    mathfield.current.setOptions({
      mathModeSpace: "\\:",
      plonkSound: false,
      keypressSound: false,
      virtualKeyboardMode: "onfocus",
    });
    mathfield.current.focus();
  }, []);

  // Manual Keystroke for keyboard
  const KeyStroke = (event) => {
    if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    ) {
      mathfield.current.insert(event.key);
    } else if (
      event.key == "Backspace" ||
      event.key == "Delete" ||
      event.code === 8
    ) {
      mathfield.current.executeCommand("deleteBackward");
    } else if (event.key === ".") {
      mathfield.current.insert(".");
    } else if (event.key === "+") {
      mathfield.current.insert("+");
    } else if (event.key === "-") {
      mathfield.current.insert("-");
    } else if (event.key === "*") {
      mathfield.current.insert("\\times");
    } else if (event.key === "/") {
      mathfield.current.insert("\\div");
    } else if (event.key === "%") {
      mathfield.current.insert("%");
    } else if (event.key === "^") {
      mathfield.current.insert("^");
    } else if (event.key === "(") {
      mathfield.current.insert("(");
    } else if (event.key === ")") {
      mathfield.current.insert(")");
    } else if (event.key === "=") {
      mathfield.current.insert("=");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "600px",
        height: "577px",
        top: coords ? `${coords.y}px` : "165px",
        left: coords ? `${coords.x}px` : "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        borderTop: "4px solid #1565C0",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
      }}
      ref={drag(containerRef)}
      tabIndex={0}
      autoFocus
      aria-label="virtual keyboard"
      id={`mathpopup-${uniqueId}`}
      role="math"
      className="MathEquationKeyboard"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeMath();
        }
      }}
    >
      {/* Aria Live */}
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive}
      </span>
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive2}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: "1px solid #E0E0E0",
          marginBottom: "16px",
          "& span": {
            marginTop: "4px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "157%",
            color: "#232323",
          },
        }}
      >
        <span>Write equation using keyboard</span>
        <button
          aria-label="close math popup"
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "0px",
          }}
          onClick={closeMath}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              closeMath();
            }
          }}
          tabIndex={0}
        >
          {" "}
          <CloseIcon />
        </button>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <MathLiveEditor
          style={{
            border: "0.5px solid #E0E0E0",
            height: "65px",
            padding: "0 8px",
            borderRadius: "4px",
            zIndex: 2010,
            color: "rgba(35, 35, 35, 1)",
          }}
          ref={mathfield}
          onEditorInput={(value) => setFormula(value)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "406px",
            marginLeft: "16px",
          }}
        >
          <TabContext value={value}>
            <TabList onChange={handleChange}>
              {tabs.map((tab, index) => (
                <Tab
                  aria-label={tab.label}
                  key={index}
                  label={tab.label}
                  value={`${index + 1}`}
                  style={{
                    minWidth: "76.5px",
                    textTransform: "none",
                    color:
                      value == index + 1
                        ? "rgba(21, 101, 192, 1)"
                        : "rgba(99, 99, 99, 1)",
                  }}
                  onKeyDown={(e) => {
                    KeyStroke(e);
                  }}
                  disableRipple
                  disableFocusRipple
                />
              ))}
            </TabList>
            {tabs.map((tab, index) => (
              <TabPanel
                key={index}
                value={`${index + 1}`}
                style={{
                  border: "0.5px solid #E0E0E0",
                  height: "342px",
                  borderRadius: "0px 0px 4px 4px",
                  padding: "16px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "5.5px",
                  }}
                >
                  {/* Advanced Function */}
                  {tab.render.map((btn, index) => (
                    <button
                      aria-label={
                        btn.aria ? `${btn.aria} sign` : `${btn.text} sign`
                      }
                      className="MathButton"
                      style={{
                        "--width": btn?.width ? btn.width : "32px",
                        "--background": "#eeeeee",
                        "--hoverBackground": "#e0e0e0",
                        "--height": "32px",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        mathfield.current.insert(
                          btn?.insert ? btn.insert : btn.text
                        );
                        handleAriaLive(btn.aria);
                        // setAriaLive(`${btn.aria}`);
                        // mathfield.current.executeCommand("moveAfterParent");
                        // mathfield.current.focus();
                      }}
                      onKeyDown={(e) => {
                        KeyStroke(e);
                      }}
                    >
                      <InlineMath math={btn.text} />
                    </button>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabContext>
        </div>
        {/* Basic Functions and Numbers */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "200px",
              width: "90%",
              margin: "48px 16px 0 16px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            {TopSideKeys.map((key, index) => (
              <button
                aria-label={key.aria ? `${key.aria} sign` : `${key.text} sign`}
                className="MathButton"
                style={{
                  "--width": key?.width ? key.width : "32px",
                  "--background": key?.color ? key.color : "#EEEEEE",
                  "--hoverBackground": key?.hover ? key?.hover : "#E0E0E0",
                  "--height": "32px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  key?.insert
                    ? mathfield.current.insert(key.insert)
                    : mathfield.current.executeCommand(key.command);
                  handleAriaLive(key.aria);
                  // key?.insert &&
                  // mathfield.current.executeCommand("moveAfterParent");
                  // mathfield.current.focus();
                }}
                onKeyDown={(e) => {
                  KeyStroke(e);
                }}
              >
                {key?.svg ? key?.svg : key.text}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "16px",
            }}
          >
            <div
              style={{
                height: "68px",
                width: "106px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {/* Arrow Keys and 2 undefined keys */}
              {BottomLeftKeys.map((key, index) => (
                <button
                  aria-label={
                    key.aria ? `${key.aria} sign` : `${key.text} sign`
                  }
                  className="MathButton"
                  style={{
                    "--width": key?.width ? key.width : "32px",
                    "--background": key?.color ? key.color : "#EEEEEE",
                    "--hoverBackground": key?.hover ? key?.hover : "#E0E0E0",
                    "--height": "32px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    key?.insert
                      ? mathfield.current.insert(key.insert)
                      : mathfield.current.executeCommand(key.command);
                    handleAriaLive(key.aria);
                    // key?.insert &&
                    // mathfield.current.executeCommand("moveAfterParent");
                    // mathfield.current.focus();
                  }}
                  onKeyDown={(e) => {
                    KeyStroke(e);
                  }}
                >
                  {key?.svg ? key?.svg : key.text}
                </button>
              ))}
            </div>
            {/* All Clear Button */}
            <div>
              <button
                aria-label={"All clear"}
                className="MathButton"
                style={{
                  "--width": "32px",
                  "--height": "68px",
                  "--margin": "0 0 0 5px",
                  "--background": "rgba(21, 101, 192, 0.12)",
                  "--hoverBackground": "rgba(21, 101, 192, 0.3)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  mathfield.current.setValue("");
                  setAriaLive("All clear");
                  // mathfield.current.focus();
                }}
                onKeyDown={(e) => {
                  KeyStroke(e);
                }}
              >
                AC
              </button>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              padding: "16px",
              justifyContent: "flex-end",
            }}
          >
            <button
              aria-label={isEdit ? "Update" : "Insert"}
              style={{
                background: "none",
                border: "none",
                color: formula ? "#1565C0" : "rgba(0, 0, 0, 0.38)",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                cursor: formula ? "pointer" : "default",
              }}
              onClick={(e) => handleClick(e)}
              disabled={!formula}
            >
              {isEdit ? "Update" : "Insert"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathPopup;
