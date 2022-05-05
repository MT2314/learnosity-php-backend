import React from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./styles/Callout.module.scss";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/CalloutConfig";
import calloutOptions from "./utility/CalloutOptions";
export const defaultProps = { heading: "", body: "", calloutType: "" };

const Callout = ({
  calloutType,
  calloutTypeSvg,
  calloutTitle,
  calloutBody,
  setProp = () => {},
}) => {
  let labelId = Math.floor(Math.random() * 100000);

  return (
    <Paper
      aria-label="Callout"
      data-id="callout"
      className={styles.Callout_main}
    >
      <label id={`callout-${labelId}`} className={styles.Callout_label}>
        Callout Type: &nbsp;
        <NativeSelect
          role="listbox"
          autoFocus
          name="callout-selector"
          aria-labelledby={`callout-${labelId}`}
          onChange={(e) => {
            setProp({ calloutTypeSvg: calloutOptions[e.target.value].iconUrl });
            setProp({ calloutTitle: calloutOptions[e.target.value].title });
          }}
          className={styles.Callout_type_dropdown}
        >
          {calloutOptions.map(({ type_id, title }) => (
            <option key={type_id} value={calloutOptions[type_id].type_id}>
              {title}
            </option>
          ))}
        </NativeSelect>
      </label>
      &nbsp;
      <div className={styles.Callout_body_text}>
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
      </div>
      <FormattedText
        placeHolderText="Enter callout body text here..."
        toolbar={calloutConfig}
        body={calloutBody}
        className={styles.Callout_body}
        editorClassName="callout_editor_class"
        setProp={(stateUpdate) => setProp({ calloutBody: stateUpdate.body })}
      />
    </Paper>
  );
};

export default Callout;
