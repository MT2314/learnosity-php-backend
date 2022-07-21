import React from "react";
import { Paper, NativeSelect } from "@mui/material";
import styles from "./styles/Callout.module.scss";
import FormattedText from "../FormattedText/FormattedText";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";
import calloutOptions from "./utility/CalloutOptions";
export const defaultProps = { heading: "", body: "" };
import English from "./English.json";
import French from "./French.json";
import Spanish from "./Spanish.json";
import Chinese from "./Chinese.json";

const languages = [English, French, Spanish, Chinese];

const randomItem = languages[Math.floor(Math.random() * languages.length)];

const Callout = ({
  calloutTypeSvg,
  calloutTitle,
  calloutBody,
  setProp = () => {},
}) => {
  let labelId = Math.floor(Math.random() * 100000);

  const calloutToolBar = useToolBarOptions(
    ["inline", "link", "list"],
    ["bold", "italic", "underline", "strikethrough"]
  );

  return (
    <Paper
      aria-label="Callout"
      data-id="callout"
      data-testid="callout"
      className={styles.Callout_container}
    >
      <div className={styles.dropdownContainer}>
        <label id={`callout-${labelId}`} className={styles.Callout_label}>
          {randomItem.language}
          <br />
          {randomItem.callout} &nbsp;
          {/* Callout Type: &nbsp; */}
          <NativeSelect
            role="listbox"
            name="callout-selector"
            aria-labelledby={`callout-${labelId}`}
            data-testid="calloutTitle"
            onChange={(e) => {
              setProp({
                calloutTypeSvg: calloutOptions[e.target.value].iconUrl,
              });
              setProp({
                calloutTitle: randomItem.calloutTitle[0][e.target.value],
              });
            }}
            className={styles.Callout_type_dropdown}
          >
            {/* {calloutOptions.map(({ type_id, title }) => (
              <option key={type_id} value={calloutOptions[type_id].type_id}>
                {title}
              </option>
            ))} */}

            {calloutOptions.map(({ type_id }) => (
              <option key={type_id} value={calloutOptions[type_id].type_id}>
                {randomItem.calloutTitle[0][type_id]}
              </option>
            ))}
          </NativeSelect>
        </label>
      </div>
      &nbsp;
      <div className={styles.Callout_icon_title} data-testid="calloutTypeSvg">
        {/* decorative icon */}
        {calloutTypeSvg ? (
          <>
            <img
              className={styles.Callout_img}
              src={calloutTypeSvg}
              alt={""}
              // aria-label="Callout type icon"
              aria-label={randomItem.calloutImg[0].AriaLabel}
            />
            <p data-testid="calloutTitle" className={styles.Callout_heading}>
              {calloutTitle}
            </p>
          </>
        ) : (
          <div
            className={styles.Callout_icon_placeholder}
            // aria-label="Callout type icon placeholder"
            aria-label={randomItem.calloutImg[0].AriaLabelDiv}
          ></div>
        )}
      </div>
      <div className={styles.Callout_text_area} data-testid="calloutBody">
        <FormattedText
          // placeHolderText="Enter callout body text here..."
          placeHolderText={randomItem.calloutPlaceHolderText}
          toolbar={calloutToolBar}
          body={calloutBody}
          className={styles.Callout_body}
          editorClassName="callout_editor_class"
          setProp={(stateUpdate) => setProp({ calloutBody: stateUpdate.body })}
        />
      </div>
    </Paper>
  );
};

export default Callout;
