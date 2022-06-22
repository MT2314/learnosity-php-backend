import React, { useState } from "react";
import { Grid } from "@mui/material";
import ReactQuill from "react-quill";
import styles from "./styles/Quill.module.scss";
import "react-quill/dist/quill.snow.css";
import clsx from "clsx";
import { convertToRaw } from "draft-js";

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

const Quill = ({
  body = null,
  setProp = () => console.warn("No state change function provided"),
}) => {
  const [showDefault, setShowDefault] = useState(true);
  const [state, setState] = useState(null);
  const handleChange = (content, delta, source, editor) => {
    setState(editor.getContents());
  };
  const hideDefaultTextBox = () => {
    setShowDefault(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          {showDefault && (
            <div className={styles.mainContainer} onClick={hideDefaultTextBox}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          )}
        </Grid>
      </Grid>
      <div id="toolbar">
        <span className="ql-formats">
          <button>Custom Button</button>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"/>
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

      <ReactQuill
        theme="snow"
        value={state}
        onChange={handleChange}
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat."
        formats={formats}
        modules={modules}
      />

      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

export default Quill;
