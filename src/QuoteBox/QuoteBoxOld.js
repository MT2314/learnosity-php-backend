
import React, { useState } from "react";
import { Paper } from "@mui/material";
import TextEditable from "../TextEditable";
import styles from './QuoteBox.module.scss';

const QuoteBox = ({ body, citation, url }) => {

  return (
    <Paper aria-label="Quote Box" className={styles.quotebox}>
      <div className={styles.quote_container}>
      <div className={styles.quote_box_body} role="presentation">

        <img alt={""} className={styles.quote_icon} aria-label="Quotebox quotation marks" src="https://dcc.ilc.org/jw-rnd-days/cs-amp-templates/images/quote.svg" />
        
      </div>
          
        <TextEditable style={{minWidth: '80%'}} placeholder="quote text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} className={styles.quote_main} value={body||""} />

        <TextEditable style={{minWidth: '220px'}} placeholder="citation text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { citation: e.target.value }))} className={`${styles.body} ${styles.citation}`} value={citation||""} />

        <TextEditable style={{minWidth: '220px'}} placeholder="citation url goes here"  multiline={true} onChange={e => setProp(props => Object.assign(props, { url: e.target.value }))} className={`${styles.body} ${styles.quote_link}`} value={url||""} />
      </div>
    </Paper>
  )
}

export default QuoteBox;