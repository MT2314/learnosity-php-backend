import React from "react";
import { Paper } from "@mui/material";

import FormattedText from "../FormattedText/FormattedText";
import { inlineWithLinkConfig, linkConfig } from "./utility/inlineConfig";

import styles from "./styles/QuoteBox.module.scss";

export const defaultProps = { quoteBoxBody: null, quoteBoxCitation: null, quoteBoxUrl: null };

const QuoteBox = ({
  quoteBoxBody,
  quoteBoxCitation,
  quoteBoxUrl,
  setProp = () => {}
}) => {

  return (
    <Paper
      data-id="quoteBox"
      data-testid="quoteBox"
      aria-label="Quote Box"
      className={styles.quoteBoxContainer}
    >
      <div className={styles.quoteBodyContainer}>
        <div data-testid="quotes" className={styles.quoteIcon}></div>
        <div
          className={styles.formattedTextBodyContainer}
          data-testid="quoteBoxBody"
        >
          <FormattedText
            placeHolderText="Type quote body here..."
            toolbar={inlineWithLinkConfig}
            body={quoteBoxBody}
            setProp={(stateUpdate) => setProp({quoteBoxBody: stateUpdate.body})}
          />
        </div>
      </div>
      <div
        className={styles.formattedTextCitationContainer}
        data-testid="quoteBoxCitation"
      >
        <FormattedText
          body={quoteBoxCitation}
          placeHolderText="Type citation here (optional) ..."
          toolbar={linkConfig}
          setProp={(stateUpdate) => setProp({quoteBoxCitation: stateUpdate.body})}
        />
      </div>
    </Paper>
  );
};

export default QuoteBox;
