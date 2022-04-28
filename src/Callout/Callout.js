import React, { useState, useReducer } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import FormattedText from "../FormattedText/FormattedText";
import { inlineWithLinkConfig, linkConfig } from "./utility/inlineConfig";
import callout from "./calloutOptions";

const Callout = ({ body, citation, url, calloutType }) => {
  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  // const { heading, calloutType } = props;

  const quoteReducer = (state, { type, payload }) => {
    switch (type) {
      case "body":
        return { ...state, body: payload };
      case "citation":
        return { ...state, citation: payload };
      case "url":
        return { ...state, url: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(quoteReducer, {
    body: "",
    citation: "",
    url: "",
  });

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
          toolbar={inlineWithLinkConfig}
          value={state.body}
          // onChange={(e) =>
          //   setProp((props) =>
          //     Object.assign(props, { heading: e.target.value })
          //   )
          // }
          className={styles.Callout_heading}
        />
      </div>
      <FormattedText
        placeHolderText="Enter callout body text here..."
        toolbar={inlineWithLinkConfig}
        value={state.body}
        onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
      />
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
