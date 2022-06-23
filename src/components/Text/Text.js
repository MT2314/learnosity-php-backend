import React, { useRef, useReducer, useEffect } from "react";
import { Grid } from "@mui/material";
import ReactQuill from "react-quill";
import styles from "./styles/Quill.module.scss";
import "react-quill/dist/quill.snow.css";

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

const Quill = () => {
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
              className={styles.mainContainer}
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
          <div
            className={
              defaultState.focus ? styles.showToolBar : styles.hideToolBar
            }
          >
            <div id="toolbar">
              <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
              </span>
              <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
              </span>
              <span className="ql-formats">
                <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" />
                <button className="ql-blockquote" />
              </span>
              <span className="ql-formats">
                <select className="ql-align" />
              </span>
              <span className="ql-formats">
                <button className="ql-link" />
              </span>
            </div>
          </div>

          <ReactQuill
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat."
            formats={formats}
            modules={modules}
            ref={editorRef}
            className={styles.hi}
            onBlur={() => {
              dispatch({ type: "BLURR_EDITOR" });
            }}
            onFocus={() => {
              dispatch({ type: "SHOW_EDITOR" });
            }}
          />
        </>
      )}
    </>
  );
};

export default Quill;
