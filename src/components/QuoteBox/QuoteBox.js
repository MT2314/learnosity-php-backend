import React from "react";
import { Paper } from "@mui/material";

import FormattedText from "../FormattedText/FormattedText";
import { inlineWithLinkConfig, linkConfig } from "./utility/inlineConfig";

import styles from "./styles/QuoteBox.module.scss";

export const defaultProps = { quoteBoxBody: "", quoteBoxCitation: "", quoteBoxUrl: "" };

const QuoteBox = ({
  quoteBoxBody,
  quoteBoxCitation,
  quoteBoxUrl,
  setProp = () => {}
}) => {

  return (
    <Paper aria-label="Quote Box" className={styles.quoteBoxContainer}>
      <div className={styles.quoteBodyContainer}>
        <div className={styles.quoteIcon}></div>
        <FormattedText
          placeHolderText="Type quote body here..."
          toolbar={inlineWithLinkConfig}
          setProp={(stateUpdate) => setProp({quoteBoxBody: stateUpdate.body})}
        />
      </div>
      <FormattedText
        className={styles.quoteCitation}
        placeHolderText="Type citation here..."
        toolbar={linkConfig}
        setProp={(stateUpdate) => setProp({quoteBoxCitation: stateUpdate.body})}
      />
    </Paper>
  );
};

export default QuoteBox;
