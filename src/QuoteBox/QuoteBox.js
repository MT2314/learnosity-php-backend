import React from 'react';
import { Paper } from "@mui/material";

import TextEditable from "../TextEditable/TextEditable";
import FormattedText from '../FormattedText/FormattedText';

import styles from './styles/QuoteBox.module.scss';

const QuoteBox = ({ uuid, uuidClean, type, body, citation, url }) => {
   return (
      <Paper aria-label="Quote Box" className={styles.quoteBoxContainer}>
         <div className={styles.quoteBodyContainer}>
            <div className={styles.quoteIcon}></div>
            <FormattedText
               placeHolderText='Type quote body here...'
               required
            />
         </div>
         <TextEditable
            className={styles.quoteCitation}
            placeholder='Type citation here...'
            value={citation}
            multiline={false}
         />
      </Paper>
   );
};

export default QuoteBox;
