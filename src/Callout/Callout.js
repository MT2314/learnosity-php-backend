
import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import styles from "./Callout.module.scss";
// import { useNode } from "@craftjs/core";
// import { ComponentControl } from "components/Control";
// import { useConfigContext } from "context";
import TextEditable from "../TextEditable";

const Callout = (props) => {
  //const { config } = useConfigContext();
  const {heading, body, calloutType} = props;
  //const { id, connectors: {connect, drag}, selected, dragged, actions: {setProp, setCustom} } = useNode();
  // useEffect(() => {
  //   setCustom(custom => Object.assign(custom, {type: "callout"}));
  // }, []);
  return (
    <Paper aria-label="Callout" className="component">  
      <label htmlFor={`callout-type`}>Callout Type</label>&nbsp;
      <NativeSelect autoFocus id={`callout-type`} value={calloutType||""} onChange={e => setProp(props => Object.assign(props, { calloutType: e.target.value }))} className={styles.Callout_type_dropdown}>
        <option value={""}>Select Value</option>
      </NativeSelect>
      <div className={styles.Callout_body_text} role="presentation">
        {/* decorative icon */}
        {calloutType ?
          (<img className={styles.Callout_img} alt={""} aria-label="Callout type icon"/>)
        : (<div className={styles.Callout_icon_placeholder} aria-label="Callout type icon placeholder"></div>)}
        <TextEditable style={{minWidth: '220px'}} placeholder="Callout heading text" onChange={e => setProp(props => Object.assign(props, { heading: e.target.value }))} className={styles.Callout_heading} value={heading||""} />
      </div>
        
        <TextEditable placeholder="Callout body text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} className={styles.Callout_body} value={body||""} />
        {/* <ComponentControl nodeId={id} /> */}
    </Paper>
  )
}

export default Callout;