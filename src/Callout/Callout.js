import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import FormattedText from "../FormattedText";
import callout from "./calloutOptions";

const Callout = (props) => {
  console.log(callout);

  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  const { heading, body, calloutType } = props;

  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>
      <label htmlFor={`callout-type`} className={styles.Callout_label}>
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
          onChange={(e) =>
            setProp((props) =>
              Object.assign(props, { heading: e.target.value })
            )
          }
          className={styles.Callout_heading}
          value="Enter Heading"
        />
      </div>
      <FormattedText />
      {/* <TextEditable
        placeholder="Callout body text"
        multiline={true}
        onChange={(e) =>
          setProp((props) => Object.assign(props, { body: e.target.value }))
        }
        className={styles.Callout_body}
        value="Enter Body"
      /> */}
    </Paper>
  );
};

export default Callout;
