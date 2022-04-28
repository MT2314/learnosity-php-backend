import React, { useState, useReducer } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/calloutConfig";
import callout from "./calloutOptions";

const Callout = ({ body, heading, url, calloutType }) => {
  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  // const { heading, calloutType } = props;

  const calloutReducer = (state, { type, payload }) => {
    switch (type) {
      case "body":
        return { ...state, body: payload };
      case "heading":
        return { ...state, heading: payload };
      case "url":
        return { ...state, url: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(calloutReducer, {
    body: "",
    heading: "",
    url: "",
  });

  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>
      <label
        htmlFor={`callout-type`}
        aria-label="Callout Type"
        className={styles.Callout_label}
      >
        Callout Type:
      </label>
      &nbsp;
      <NativeSelect
        autoFocus
        id={`callout-type`}
        value={calloutType || ""}
        onChange={(e) => setCalloutTypeSvg(e.target.value)}
        className={styles.Callout_type_dropdown}
      >
        {callout.map(({ id, title, iconUrl }) => (
          <option key={id} value={iconUrl}>
            {title}
          </option>
        ))}
      </NativeSelect>
      <div className={styles.Callout_body_text} role="presentation">
        {/* decorative icon */}
        {calloutTypeSvg ? (
          <img
            className={styles.Callout_img}
            src={calloutTypeSvg}
            alt={""}
            aria-label="Callout type icon"
          />
        ) : (
          <div
            className={styles.Callout_icon_placeholder}
            aria-label="Callout type icon placeholder"
          ></div>
        )}
        <TextEditable
          placeholder="Callout heading text"
          value={state.heading}
          onChange={(e) =>
            dispatch({ type: "heading", payload: e.target.value })
          }
          className={styles.Callout_heading}
        />
      </div>
      <FormattedText
        placeHolderText="Enter callout body text here..."
        toolbar={calloutConfig}
        value={state.body}
        className={styles.Callout_body}
        editorClassName="callout_editor_class"
        onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
      />
    </Paper>
  );
};

export default Callout;
