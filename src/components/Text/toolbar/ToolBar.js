import React, { useState } from "react";

import "../styles/Toolbar.scss";
import { Divider } from '@mui/material/';

import BoldDropdownButton from "./BoldDropdownButton";
import ListDropdownButton from "./ListDropdownButton";
import AlignDropdownButton from "./AlignDropdownButton";

const ToolBar = () => {

  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  return (
    <div
      id="toolbar"
      className="toolbarContainer"
      style={{ paddingBottom: "10px" }}
    >
      {/* bold dropdown starts */}
      <button
        onClick={() => {
          setBoldVisibility(!boldVisibility);
          setAlignVisibility(false);
          setListVisibility(false);
        }}
        className="ql-bold"
        aria-label="formatting button dropdown"
        ariaRole="select"
        style={{ position: "relative" }}
      ></button>
      <BoldDropdownButton
        show={boldVisibility}
        // ariaRole="select"
        aria-label="formatting options select dropdown"
        className="dropdown-content"
      ></BoldDropdownButton>

      {/* formula btn */}
      <button className="ql-formula" aria-label="math equation button"></button>

      {/* bullets drowdown starts */}
      <button
        onClick={() => {
          setListVisibility(!listVisibility);
          setAlignVisibility(false);
          setBoldVisibility(false);
        }}
        className="ql-list"
        value="bullet"
        // ariaRole="select"
        aria-label="list options select group"
      ></button>
      <ListDropdownButton
        show={listVisibility}
        className="dropdown-content"
        aria-label="list buttons dropdown"
      ></ListDropdownButton>

      {/* alignment dropdown */}
      <button
        onClick={() => {
          setAlignVisibility(!alignVisibility);
          setBoldVisibility(false);
          setListVisibility(false);
        }}
        className="ql-align"
        aria-label="alignment buttons dropdown"
        // ariaRole="label"
        id="alignment-dropdown"
      ></button>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
        // aria-labelledby="alignment-dropdown"
        // ariaRole="select"
        aria-label="alignment buttons options"
      ></AlignDropdownButton>

      {/* link btn and divider */}
      <Divider orientation="vertical"/>
      <button aria-label="add link button" className="ql-link" />
    </div>
  );
};
export default ToolBar;
