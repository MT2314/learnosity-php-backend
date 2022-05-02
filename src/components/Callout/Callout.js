import React, { useState } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./styles/Callout.module.scss";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/CalloutConfig";
import calloutOptions from "./utility/CalloutOptions";
// import sampleData from "./utility/SampleDataConfig";


export const defaultProps = { heading: "", body: "", calloutType: "" };

// const Callout = ({ heading = "", body = "", calloutType = "", setProp = () => {} }) => {

const Callout = ({ calloutType, calloutTypeSvg, calloutTitle, calloutBody, setProp = () => {} }) => {
  // const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  // const [calloutTitle, setCalloutTitle] = useState("");
  // const [calloutBody, setCalloutBody] = useState("");

  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>
      <label htmlFor={`callout-type`} aria-label="Callout Type" className={styles.Callout_label}>
        Callout Type:
      </label>
      &nbsp;
      <NativeSelect
        autoFocus
        id={`callout-type`}
        value={calloutType || ""}
        onChange={(e) => {
          setProp({calloutTypeSvg: calloutOptions[e.target.value].iconUrl});
          setProp({calloutTitle: calloutOptions[e.target.value].title});
        }}
        className={styles.Callout_type_dropdown}
      >
        {calloutOptions.map(({ id, title }) => (
          <option key={id} value={calloutOptions[id].id}>
            {title}
          </option>
        ))}
      </NativeSelect>
      <div className={styles.Callout_body_text}>
        {/* decorative icon */}
        {calloutTypeSvg ? (
          <>
            <img className={styles.Callout_img} src={calloutTypeSvg} alt={""} aria-label="Callout type icon" />
            <p placeholder="Callout heading text will appear here" className={styles.Callout_heading}>
              {calloutTitle}
            </p>
          </>
        ) : (
          <div className={styles.Callout_icon_placeholder} aria-label="Callout type icon placeholder"></div>
        )}
      </div>
      <FormattedText
        placeHolderText="Enter callout body text here..."
        toolbar={calloutConfig}
        value={calloutBody}
        className={styles.Callout_body}
        editorClassName="callout_editor_class"
        // onChange={(e) => setCalloutBody(e.target.value)}
        setProp={(stateUpdate) => setProp({calloutBody: stateUpdate.body})}
      />
    </Paper>
  );
};

export default Callout;
