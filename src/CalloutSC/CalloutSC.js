
import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
// import styles from "./Callout.module.scss";
// import { useNode } from "@craftjs/core";
// import { ComponentControl } from "components/Control";
// import { useConfigContext } from "context";
import TextEditable from "../TextEditable";
import styled from 'styled-components';

const CalloutSC = (props) => {
  //const { config } = useConfigContext();
  const {heading, body, calloutType} = props;
  //const { id, connectors: {connect, drag}, selected, dragged, actions: {setProp, setCustom} } = useNode();
  // useEffect(() => {
  //   setCustom(custom => Object.assign(custom, {type: "callout"}));
  // }, []);

  const Body = styled(Paper)`
    background: #ececec !important;
    padding: 36px 100px;
  `

  const CalloutLabel = styled.label`
    font: 18px / 22.5px Arial, sans-serif;
  `

  const Dropdown = styled(NativeSelect)`
    margin-bottom: 10px;
  `;

  const HeadingText = styled(TextEditable)`
    font-size: 20px;
    font-weight: 700;
    line-height: 43px;
    font-family: "Arial";
    min-width: 220px;
    width: 230px;
    color: #000 !important;
  `;

  // What used to be "Callout_body_text"
  const Container = styled.div` 
    display: flex;
  `;

  const CalloutBody = styled(TextEditable)`
    margin-left: 53px;
    height: 15px;
    background: transparent;
    border: 1px solid transparent;
    font-family: "Arial";
    color: #000;
  `;

  const CalloutImg = styled.img`
    margin-right: 10px;
  `;

  const IconPlaceholder = styled.div`
    border: 1px dashed silver;
    width: 43px;
    height: 43px;
    margin-right: 10px;
  `;

  return (
    <Body aria-label="CalloutSC">  
      <CalloutLabel htmlFor={`callout-type`}>Callout Type</CalloutLabel>&nbsp;
      <Dropdown autoFocus id={`callout-type`} value={calloutType||""} onChange={e => setProp(props => Object.assign(props, { calloutType: e.target.value }))}>
        <option value={""}>Select Value</option>
        <option value={""}>Challenge</option>
        <option value={""}>Notebook</option>
        <option value={""}>Try It</option>
        <option value={""}>Definition</option>
      </Dropdown>
      <Container role="presentation">
        {/* decorative icon */}
        {calloutType ?
          (<CalloutImg alt={""} aria-label="Callout type icon"/>)
        : (<IconPlaceholder aria-label="Callout type icon placeholder"></IconPlaceholder>)}
        <HeadingText value="Enter Heading" placeholder="Enter Heading" onChange={e => setProp(props => Object.assign(props, { heading: e.target.value }))} />
      </Container>
        
        <CalloutBody placeholder="Enter Body"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} value="Enter Body" />
        {/* <ComponentControl nodeId={id} /> */}
    </Body>
  )
}

export default CalloutSC;