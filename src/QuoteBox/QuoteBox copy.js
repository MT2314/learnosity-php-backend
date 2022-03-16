
import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
// import "./style.css";
import { useNode } from "@craftjs/core";
import { ComponentControl } from "components/Control";
import { useConfigContext } from "context";
import TextEditable from "../TextEditable";
import styles from './QuoteBox.module.scss';

const QuoteBox = (props) => {
  const { config } = useConfigContext();
  const {body, citation, url} = props;
  const { id, connectors: {connect, drag}, selected, dragged, actions: {setProp, setCustom} } = useNode();
  useEffect(() => {
    setCustom(custom => Object.assign(custom, {type: "quotebox"}));
  }, []);
  return (
    <Paper aria-label="Quote Box" className={`${styles.component} ${styles.quotebox}`} ref={ref => connect(drag(ref))}>  
      <div className={styles.quote_container}>
      <div className={styles.quote_box_body} role="presentation">
        {/* decorative icon */}

        <img alt={""} className={styles.quote_icon} aria-label="Quotebox quotation marks" src="https://dcc.ilc.org/jw-rnd-days/cs-amp-templates/images/quote.svg" />
        
      </div>
          
        <TextEditable style={{minWidth: '80%'}} placeholder="quote text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} className={styles.quote_main} value={body||""} />

        <TextEditable style={{minWidth: '220px'}} placeholder="citation text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { citation: e.target.value }))} className={`${styles.body} ${styles.citation}`} value={citation||""} />

        <TextEditable style={{minWidth: '220px'}} placeholder="citation url goes here"  multiline={true} onChange={e => setProp(props => Object.assign(props, { url: e.target.value }))} className={`${styles.body} ${styles.quote_link}`} value={url||""} />
      </div>
        <ComponentControl nodeId={id} />
    </Paper>
  )
}

export default QuoteBox;