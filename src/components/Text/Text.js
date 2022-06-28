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
    container: ".toolbar",
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
          editor: true,
          focus: true,
          editorFocus: true,
        };
      case "BLUR_EDITOR":
        return {
          editor: true,
          focus: true,
          editorFocus: false,
        };
      case "SHOW_TOOLBAR":
        return {
          editor: true,
          focus: true,
          editorFocus: true,
        };
      default:
        return;
    }
  };

  const [defaultState, dispatch] = useReducer(switchFunction, {
    editor: false,
    focus: false,
    editorFocus: false,
  });

  const editorRef = useRef(null);

  useEffect(() => {
    if (defaultState.editor) {
      editorRef.current.focus();
    }
  }, [defaultState.editorFocus]);

  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <div className={styles.mainContainer}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div>
            <div className="toolbar" style={{ paddingBottom: "10px" }}>
              <span className="ql-formats" style={{}}>
                <button className="ql-link" />
              </span>
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
              <button className="ql-formula"></button>
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
              <button
                onClick={() => {
                  setAlignVisibility(!alignVisibility);
                }}
                className="ql-align"
                value="center"
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
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Text;
