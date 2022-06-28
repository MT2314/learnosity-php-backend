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
        <button className="ql-link" />
      </span>

      {/* bold dropdown starts */}
      <button
        onClick={() => {
          setBoldVisibility(!boldVisibility);
        }}
        className="ql-bold"
        style={{ position: "relative" }}
      ></button>
      <BoldDropdownButton
        show={boldVisibility}
        className="dropdown-content"
      ></BoldDropdownButton>

      {/* formula btn */}
      <button className="ql-formula"></button>

      {/* bullets drowdown starts */}
      <button
        onClick={() => {
          setListVisibility(!listVisibility);
        }}
        className="ql-list"
        value="bullet"
      ></button>
      <ListDropdownButton
        show={listVisibility}
        className="dropdown-content"
      ></ListDropdownButton>

      {/* alignment dropdown */}
      <button
        onClick={() => {
          setAlignVisibility(!alignVisibility);
        }}
        className="ql-align"
      ></button>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
      ></AlignDropdownButton>
    </div>
  );
};
export default ToolBar;
