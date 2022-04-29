import React, { useState } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/calloutConfig";
import calloutOptions from "./calloutOptions";
import sampleData from "./sampleDataConfig";

const Callout = ({ calloutBody, calloutType }) => {
  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  const [calloutTitle, setCalloutTitle] = useState("");
  // const [calloutBody, setCalloutBody] = useState("");

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
        onChange={(e) => {
          setCalloutTypeSvg(calloutOptions[e.target.value].iconUrl);
          setCalloutTitle(calloutOptions[e.target.value].title);
        }}
        className={styles.Callout_type_dropdown}
      >
        {calloutOptions.map(({ id, title }) => (
          <option key={id} value={calloutOptions[id].id}>
            {title}
          </option>
        ))}
      </NativeSelect>
      <div className={styles.Callout_body_text} role="presentation">
        {/* decorative icon */}
        {calloutTypeSvg ? (
          <>
            <img
              className={styles.Callout_img}
              src={calloutTypeSvg}
              alt={""}
              aria-label="Callout type icon"
            />
            <p
              placeholder="Callout heading text will appear here"
              className={styles.Callout_heading}
            >
              {calloutTitle}
            </p>
          </>
        ) : (
          <div
            className={styles.Callout_icon_placeholder}
            aria-label="Callout type icon placeholder"
          ></div>
        )}
        <p className={styles.Callout_heading}></p>
      </div>
      <FormattedText
        placeHolderText="Enter callout body text here..."
        toolbar={calloutConfig}
        value={sampleData[0].body}
        className={styles.Callout_body}
        editorClassName="callout_editor_class"
        // onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
        // onChange={(e) => setCalloutBody(e.target.value)}
      />
    </Paper>
  );
};

export default Callout;
