import React, { useState } from "react";
import BoldDropdownButton from "../../Text/toolbar/BoldDropdownButton";
import ListDropdownButton from "../../Text/toolbar/ListDropdownButton";
import AlignDropdownButton from "../../Text/toolbar/AlignDropdownButton";
import "../styles/CustomToolBar.scss";

const CustomToolBar = ({ toolbarId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  return (
    <>
      <div
        id={toolbarId}
        className="toolbarContainer"
        style={{ paddingBottom: "10px" }}
      >
        <span className="ql-formats">
          <button aria-label="add link button" className="ql-link" />
        </span>
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
          aria-label="formatting options select dropdown"
          className="dropdown-content"
        ></BoldDropdownButton>
        <button
          className="ql-formula"
          aria-label="math equation button"
        ></button>
        <button
          onClick={() => {
            setListVisibility(!listVisibility);
          }}
          className="ql-list"
          value="bullet"
          aria-label="list options select group"
        ></button>
        <ListDropdownButton
          show={listVisibility}
          className="dropdown-content"
          aria-label="list buttons dropdown"
        ></ListDropdownButton>
        <button
          onClick={() => {
            setAlignVisibility(!alignVisibility);
          }}
          className="ql-align"
          aria-label="alignment buttons dropdown"
          id="alignment-dropdown"
          value="center"
        ></button>
        <AlignDropdownButton
          show={alignVisibility}
          className="dropdown-content"
          aria-label="alignment buttons options"
        ></AlignDropdownButton>
      </div>
    </>
  );
};

export default CustomToolBar;
