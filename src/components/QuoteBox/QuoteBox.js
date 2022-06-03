import React from "react";
import { Paper } from "@mui/material";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";

import FormattedText from "../FormattedText/FormattedText";

import styles from "./styles/QuoteBox.module.scss";

export const defaultProps = {
  quoteBoxBody: null,
  quoteBoxCitation: null,
  quoteBoxUrl: null,
};

const QuoteBox = ({
  quoteBoxBody,
  quoteBoxCitation,
  quoteBoxUrl,
  setProp = () => {},
}) => {

  const quoteBoxToolBar = useToolBarOptions(
    ["inline", "link"],
    ["bold", "italic", "underline", "strikethrough"]
  );

  const linkToolBar = useToolBarOptions(["link"])

  return (
    <Paper
      data-id="quoteBox"
      data-testid="quoteBox"
      aria-label="Quote Box"
      className={styles.quoteBoxContainer}
    >
      <div className={styles.quoteBodyContainer}>
        <div data-testid="quotes" className={styles.quoteIcon}></div>
        <div className={styles.quoteBody} data-testid="quoteBoxBody">
          <FormattedText
            placeHolderText="Type quote body here..."
            toolbar={quoteBoxToolBar}
            body={quoteBoxBody}
            setProp={(stateUpdate) =>
              setProp({ quoteBoxBody: stateUpdate.body })
            }
          />
        </div>
      </div>
      <div className={styles.quoteCitation} data-testid="quoteBoxCitation">
        <FormattedText
          body={quoteBoxCitation}
          placeHolderText="Type citation here (optional) ..."
          toolbar={linkToolBar}
          setProp={(stateUpdate) =>
            setProp({ quoteBoxCitation: stateUpdate.body })
          }
        />
      </div>
    </Paper>
  );
};

export default QuoteBox;
