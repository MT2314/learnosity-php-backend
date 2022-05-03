import React from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/calloutConfig";
//import callout from "./calloutOptions";
import sampleData from "./sampleDataConfig";

export const defaultProps = { heading: "", body: "", calloutType: "" };

const Callout = ({ heading = "", body = "", calloutType = "", setProp = () => {} }) => {
  
  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>
      <label htmlFor="callout-type" className={styles.Callout_label}>
        Callout Type
      </label>
      &nbsp;
      <NativeSelect
        id="callout-type"
        value={calloutType || ""}
        onChange={(e) => {
          setProp({ calloutType: e.target.value });
        }}
        className={styles.Callout_type_dropdown}
      >
        <option value="">Select Value</option>
        <option value="https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/challenge_icon.svg">
          Challenge
        </option>
        <option value="https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/notebook_icon.svg">
          Notebook
        </option>
        <option value="https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/tryit_icon.svg">
          Try It
        </option>
        <option value="https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/definition_icon.svg">
          Definition
        </option>
      </NativeSelect>
      <div className={styles.Callout_body_text}>
        {/* decorative icon */}
        {calloutType ? (
          <img className={styles.Callout_img} src={calloutType} alt="Callout type icon" />
        ) : (
          <div className={styles.Callout_icon_placeholder} aria-label="Callout type icon placeholder" />
        )}
        <TextEditable
          placeholder="Callout heading text"
          onChange={(e) => setProp({ heading: e.target.value })}
          className={styles.Callout_heading}
          value={heading}
        />
      </div>
      <TextEditable
        placeholder="Callout body text"
        multiline={true}
        onChange={(e) => setProp({ body: e.target.value })}
        className={styles.Callout_body}
        value={body}
      />
    </Paper>
  );
};

export default Callout;
