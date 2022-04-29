import React, { useReducer } from "react";
import { Paper } from "@mui/material";

// import TextEditable from "../TextEditable/TextEditable";
import FormattedText from "../FormattedText/FormattedText";
import { inlineWithLinkConfig, linkConfig } from "./utility/inlineConfig";

import styles from "./styles/QuoteBox.module.scss";

const QuoteBox = ({ body, citation, url }) => {
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
    <Paper aria-label="Quote Box" className={styles.quoteBoxContainer}>
      <div className={styles.quoteBodyContainer}>
        <div className={styles.quoteIcon}></div>
        <FormattedText
          placeHolderText="Type quote body here..."
          required
          toolbar={inlineWithLinkConfig}
          value={state.body}
          onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
        />
      </div>
      <FormattedText
        className={styles.quoteCitation}
        placeHolderText="Type citation here..."
        value={citation}
        toolbar={linkConfig}
      />
    </Paper>
  );
};

export default QuoteBox;
