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
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const topMenuActiveColor = "rgb(226, 236, 245)";

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
            setActiveTopMenu("bold");
            setActiveDropDownItem("");
          }}
          aria-label="formatting button dropdown"
          style={{
            position: "relative",
            padding: "0px",
            backgroundColor:
              activeTopMenu === "bold" ? "rgb(226, 236, 245)" : "",
          }}
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
            setActiveTopMenu("math");
            setActiveDropDownItem("");
          }}
          style={{
            backgroundColor:
              activeTopMenu === "math" ? "rgb(226, 236, 245)" : "",
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
            setActiveTopMenu("align");
            setActiveDropDownItem("");
          }}
          style={{
            backgroundColor:
              activeTopMenu === "align" ? "rgb(226, 236, 245)" : "",
          }}
          aria-label="alignment buttons dropdown"
          // ariaRole="label"
          value={activeDropDownItem}
          id="alignment-dropdown"
        >
          {activeDropDownItem === "left" ? (
            <img
              src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/left_align.svg"
              alt="text alignment dropdown menu - left align set"
            />
          ) : activeDropDownItem === "center" ? (
            <img
              src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/center_align.svg"
              alt="text alignment dropdown menu - right align set"
            />
          ) : (
            <img
              src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/right_align.svg"
              alt="text alignment dropdown menu"
            />
          )}
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
            setActiveTopMenu("lists");
            setActiveDropDownItem("");
          }}
          className="ql-list"
          style={{
            backgroundColor:
              activeTopMenu === "lists" ? "rgb(226, 236, 245)" : "",
          }}
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
            setActiveTopMenu("link");
            setActiveDropDownItem("");
          }}
          style={{
            backgroundColor:
              activeTopMenu === "link" ? "rgb(226, 236, 245)" : "",
          }}
        />
      </div>
    </ToolBarDropDowns.Provider>
  );
};

export default CustomToolBar;
