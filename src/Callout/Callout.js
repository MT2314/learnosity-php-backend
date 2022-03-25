
import React from "react";
import { Paper } from "@mui/material";
import NativeSelect from '@mui/material/NativeSelect';
import TextEditable from "../TextEditable";
import styled from 'styled-components';

const Callout = (props) => {

  const {heading, body, calloutType} = props;

  const Dropdown = styled(NativeSelect)`
    margin-bottom: 10px;
    background: red;

    &:hover {
      border: 5px solid rebeccapurple;
    }
  `;

  const HeadingText = styled(TextEditable)`
    font-size: 20px;
    font-weight: 700;
    line-height: 43px;
    font-family: "SuisseIntl";
  `;

  // What used to be "Callout_body_text"
  const Container = styled.div` 
    display: flex;
  `;

  const CalloutBody = styled(TextEditable)`
    margin-left: 53px;
    font-family: "SuisseIntl";
  `;

  const CallOutImg = styled.img`
    margin-right: 10px;
  `;

  const IconPlaceholder = styled.div`
    border: 1px dashed silver;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  `;

  return (
    <Paper aria-label="Callout" className="component">  
      <label htmlFor={`callout-type`}>Callout Type</label>&nbsp;
      <Dropdown autoFocus id={`callout-type`} value={calloutType||""} onChange={e => setProp(props => Object.assign(props, { calloutType: e.target.value }))}>
        <option value={""}>Select Value</option>
      </Dropdown>
      <Container role="presentation">
        {/* decorative icon */}
        {calloutType ?
          (<CallOutImg alt={""} aria-label="Callout type icon"/>)
        : (<IconPlaceholder aria-label="Callout type icon placeholder"></IconPlaceholder>)}
        <HeadingText style={{minWidth: '220px'}} placeholder="Callout heading text" onChange={e => setProp(props => Object.assign(props, { heading: e.target.value }))} value={heading||""} />
      </Container>
        
        <CalloutBody placeholder="Callout body text"  multiline={true} onChange={e => setProp(props => Object.assign(props, { body: e.target.value }))} value={body||""} />
    </Paper>
  )
}

export default Callout;