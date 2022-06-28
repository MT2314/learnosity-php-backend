import React, { useState } from "react";

import "../styles/Toolbar.scss";

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
      <span className="ql-formats">
        <button aria-label="add link button" className="ql-link" />
      </span>

      {/* bold dropdown starts */}
      <button
        onClick={() => {
          setBoldVisibility(!boldVisibility);
        }}
        className="ql-bold"
        aria-label="formatting button dropdown"
        ariaRole="select"
        style={{ position: "relative" }}
      ></button>
      <BoldDropdownButton
        show={boldVisibility}
        ariaRole="select"
        aria-label="formatting options select dropdown"
        className="dropdown-content"
      ></BoldDropdownButton>

      {/* formula btn */}
      <button className="ql-formula" aria-label="math equation button"></button>

      {/* bullets drowdown starts */}
      <button
        onClick={() => {
          setListVisibility(!listVisibility);
        }}
        className="ql-list"
        value="bullet"
        ariaRole="select"
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
        }}
        className="ql-align"
        aria-label="alignment buttons dropdown"
      ></button>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
        aria-label="alignment buttons options"
      ></AlignDropdownButton>
    </div>
  );
};
export default ToolBar;
