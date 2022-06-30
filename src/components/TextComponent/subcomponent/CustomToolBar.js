import React, { useState, createContext } from "react";
import { Divider } from "@mui/material/";
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import "../styles/CustomToolBar.scss";

//context to save state of active drop down items
export const ToolBarDropDowns = createContext();

const CustomToolBar = ({ toolbarId }) => {
  
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");

  console.log(`====>`, activeDropDownItem);

  return (
    <ToolBarDropDowns.Provider
      value={[activeDropDownItem, setActiveDropDownItem]}
    >
      <div
        id={toolbarId}
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
          // className="ql-bold"
          aria-label="formatting button dropdown"
          style={{ position: "relative", padding: "0px" }}
        >
          <img
            src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/bold.svg"
            alt="font formatting dropdown menu"
          />
        </button>
        <BoldDropdownButton
          show={boldVisibility}
          aria-label="formatting options select dropdown"
          className="dropdown-content"
        ></BoldDropdownButton>

        {/* formula btn */}
        <button
          className="ql-formula"
          aria-label="math equation button"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
          }}
        >
          <img
            src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/pi.svg"
            alt="mathematical pi button for inserting equation"
          />
        </button>

        {/* alignment dropdown */}
        <button
          onClick={() => {
            setAlignVisibility(!alignVisibility);
            setBoldVisibility(false);
            setListVisibility(false);
          }}
          // className="ql-align"
          aria-label="alignment buttons dropdown"
          // ariaRole="label"
          value={activeDropDownItem}
          id="alignment-dropdown"
        >
          <img
            src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/left_align.svg"
            alt="text alignment dropdown menu"
          />
        </button>
        <AlignDropdownButton
          show={alignVisibility}
          className="dropdown-content"
          aria-label="alignment buttons options"
        ></AlignDropdownButton>

        {/* bullets drowdown starts */}
        <button
          onClick={() => {
            setListVisibility(!listVisibility);
            setAlignVisibility(false);
            setBoldVisibility(false);
          }}
          className="ql-list"
          value="bullet"
          aria-label="list options select group"
        >
          <img
            src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/bullet_list.svg"
            alt="bullet list dropdown button"
          />
        </button>
        <ListDropdownButton
          show={listVisibility}
          className="dropdown-content"
          aria-label="list buttons dropdown"
        ></ListDropdownButton>

        {/* link btn and divider */}
        <Divider orientation="vertical" />
        <button
          aria-label="add link button"
          className="ql-link"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
          }}
        />
      </div>
    </ToolBarDropDowns.Provider>
  );
};

export default CustomToolBar;
