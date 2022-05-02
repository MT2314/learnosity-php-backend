import React, { useState, useReducer, useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import styles from "./Callout.module.scss";
import TextEditable from "../TextEditable";
import FormattedText from "../FormattedText/FormattedText";
import { calloutConfig } from "./utility/calloutConfig";
//import callout from "./calloutOptions";
import sampleData from "./sampleDataConfig";
import ErrorHandler from "../ErrorHandler";

const Callout = ({ body, heading, calloutType }) => {
  const [calloutTypeSvg, setCalloutTypeSvg] = useState("");
  const [calloutBody, setCalloutBody] = useState("");

  // useEffect((sampleData) => {
  //   setCalloutBody(body);
  // }, []);

  // const { heading, calloutType } = props;

  const [state, dispatch] = useReducer(calloutReducer, {
    body: "",
    heading: "",
  });
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
try{

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
        {console.log("here is svgtype ", calloutTypeSvg)}
        <TextEditable
          placeholder="Callout heading text"
          value={sampleData[0].heading}
          onChange={(e) =>
            dispatch({ type: "heading", payload: e.target.value })
          }
          className={styles.Callout_heading}
          />
      </div>
      {console.log("here is heading ", sampleData[0].heading)}
      <FormattedText
        // placeHolderText="Enter callout body text here..."
        placeHolderText={sampleData[1].body}
        toolbar={calloutConfig}
        value={sampleData[0].body}
        className={styles.Callout_body}
        editorClassName="callout_editor_class"
        // onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
        onChange={(e) => setCalloutBody(e.target.value)}
        />
      {console.log("here is body ", sampleData[0].body)}
    </Paper>
  );
}catch(error){
  return <ErrorHandler error={error} />
}
};

export default Callout;
