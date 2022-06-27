import React, { useRef, useReducer, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ReactQuill from "react-quill";
import styles from "./styles/Quill.module.scss";
import "react-quill/dist/quill.snow.css";

import BoldDropdownButton from "./BoldDropdownButton";
import ListDropdownButton from "./ListDropdownButton";
import AlignDropdownButton from "./AlignDropdownButton";

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

  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

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
            <div id="toolbar" style={{ paddingBottom: "10px" }}>
              <span className="ql-formats" style={{}}>
                <button className="ql-link" />
              </span>

              {/* bold dropdown starts */}
              <button
                onClick={() => {
                  setBoldVisibility(!boldVisibility);
                }}
                className="ql-bold"
                style={{ position: "relative" }}
              ></button>
              <BoldDropdownButton
                show={boldVisibility}
                className="dropdown-content"
              ></BoldDropdownButton>

              {/* formula btn */}
              <button className="ql-formula"></button>

              {/* bullets drowdown starts */}
              <button
                onClick={() => {
                  setListVisibility(!listVisibility);
                }}
                className="ql-list"
                value="bullet"
              ></button>
              <ListDropdownButton
                show={listVisibility}
                className="dropdown-content"
              ></ListDropdownButton>

              {/* alignment dropdown */}
              <button
                onClick={() => {
                  setAlignVisibility(!alignVisibility);
                }}
                className="ql-align"
              ></button>
              <AlignDropdownButton
                show={alignVisibility}
                className="dropdown-content"
              ></AlignDropdownButton>
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

export default Text;
