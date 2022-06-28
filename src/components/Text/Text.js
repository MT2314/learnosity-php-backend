import React, { useRef, useReducer, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ReactQuill from "react-quill";
import "./styles/Text.scss";
import "react-quill/dist/quill.snow.css";

import ToolBar from "./toolbar/ToolBar";

export const formats = [
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

export const modules = {
  toolbar: {
    container: "#toolbar",
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};
export const defaultProps = { body: null };

const Text = () => {
  const switchFunction = (state, action) => {
    switch (action.type) {
      case "SHOW_EDITOR":
        return {
          defaultBox: false,
          editor: true,
          focus: true,
        };
      case "BLURR_EDITOR":
        return {
          defaultBox: false,
          editor: true,
          focus: false,
        };
      default:
        return state;
    }
  };
  const [defaultState, dispatch] = useReducer(switchFunction, {
    editor: false,
    defaultBox: true,
    focus: false,
  });

  const editorRef = useRef(null);

  useEffect(() => {
    if (defaultState.editor) {
      editorRef.current.focus();
    }
  }, [defaultState.editor]);

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          {defaultState.defaultBox && (
            <div
              className="mainContainer"
              onClick={() => {
                dispatch({ type: "SHOW_EDITOR" });
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          )}
        </Grid>
      </Grid>
      {defaultState.editor && (
        <>
          <div className={defaultState.focus ? "showToolBar" : "hideToolBar"}>
            <ToolBar />
          </div>
          <div className="quillContainer">
            <ReactQuill
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat."
              formats={formats}
              modules={modules}
              ref={editorRef}
              className="quillEditor"
              onBlur={() => {
                dispatch({ type: "BLURR_EDITOR" });
              }}
              onFocus={() => {
                dispatch({ type: "SHOW_EDITOR" });
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Text;
