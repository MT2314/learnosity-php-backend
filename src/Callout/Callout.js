import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import callout from "./calloutOptions";

const Callout = (props) => {
  console.log(callout);

  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  const { heading, body, calloutType } = props;

  return (
    <Paper aria-label="Callout" className={styles.Callout_main}>
      <label htmlFor={`callout-type`} className={styles.Callout_label}>
        Callout Type
      </label>
      &nbsp;
      {callout.map(({ title, iconUrl }) => (
        <NativeSelect
          autoFocus
          id={`callout-type`}
          value={calloutType || ""}
          onChange={(e) => setCalloutTypeSvg(e.target.value)}
          className={styles.Callout_type_dropdown}
        >
          <option value={""}>Select Value</option>
          <option
            value={
              "https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/challenge_icon.svg"
            }
          >
            {callout[0].title}
          </option>
          <option
            value={
              "https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/notebook_icon.svg"
            }
          >
            {callout[1].title}
          </option>
          <option
            value={
              "https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/tryit_icon.svg"
            }
          >
            {callout[2].title}
          </option>
          <option
            value={
              "https://s3.ca-central-1.amazonaws.com/ilc.tvo.org/ets4u/assets/img/definition_icon.svg"
            }
          >
            {callout[3].title}
          </option>
        </NativeSelect>
      ))}
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
      <TextEditable
        placeholder="Callout body text"
        multiline={true}
        onChange={(e) =>
          setProp((props) => Object.assign(props, { body: e.target.value }))
        }
        className={styles.Callout_body}
        value="Enter Body"
      />
      <>
        {callout.map(({ title, iconUrl }) => (
          <NativeSelect
            autoFocus
            id={`callout-type`}
            value={calloutType || ""}
            onChange={(e) => setCalloutTypeSvg(e.target.value)}
            className={styles.Callout_type_dropdown}
          >
            {/* <option value={""}>Select Value</option> */}
            <option value={iconUrl} title>
              {title}
            </option>
            {/* {callout.map((callouts) => (
              <option key={callout.title} value={callout.iconUrl}>
                {callout.title}
              </option>
            ))}
            ; */}
          </NativeSelect>
        ))}
      </>
    </Paper>
  );
};

export default Callout;
