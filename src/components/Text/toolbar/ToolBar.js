import React, { useState } from "react";

import BoldDropdownButton from "./BoldDropdownButton";
import ListDropdownButton from "./ListDropdownButton";
import AlignDropdownButton from "./AlignDropdownButton";

const ToolBar = () => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  return (
    <div id="toolbar" style={{ paddingBottom: "10px" }}>
      <span className="ql-formats">
        <button alt="add link button" className="ql-link" />
      </span>

      {/* bold dropdown starts */}
      <button
        onClick={() => {
          setBoldVisibility(!boldVisibility);
        }}
        className="ql-bold"
        aria-label="formatting button dropdown"
        style={{ position: "relative" }}
      >
        <span className="sr-only">
          Select dropdown menu- formatting buttons
        </span>
      </button>
      <BoldDropdownButton show={boldVisibility} className="dropdown-content">
        <span className="sr-only">formatting options group</span>
      </BoldDropdownButton>

      {/* formula btn */}
      <button className="ql-formula" alt="math equation button">
        <span className="sr-only">Insert Math equation</span>
      </button>

      {/* bullets drowdown starts */}
      <button
        onClick={() => {
          setListVisibility(!listVisibility);
        }}
        className="ql-list"
        value="bullet"
      >
        <span className="sr-only">Select dropdown menu- list options</span>
      </button>
      <ListDropdownButton
        show={listVisibility}
        className="dropdown-content"
        aria-label="list buttons dropdown"
      >
        <span className="sr-only">list options button group</span>
      </ListDropdownButton>

      {/* alignment dropdown */}
      <button
        onClick={() => {
          setAlignVisibility(!alignVisibility);
        }}
        className="ql-align"
        aria-label="alignment buttons dropdown"
      >
        <span className="sr-only">Select dropdown menu- alignment options</span>
      </button>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
        aria-label="alignment buttons options"
      ></AlignDropdownButton>
    </div>
  );
};
export default ToolBar;
