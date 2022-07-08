import React, { useState, createContext } from "react";
import { Divider } from "@mui/material/";
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";

//context to save state of active drop down items
export const ToolBarDropDowns = createContext();

const CustomToolBar = ({ toolbarId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeAlignIcon, setActiveAlignIcon] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");

  console.log(`====>`, activeDropDownItem);

  return (
    <ToolBarDropDowns.Provider
      value={[activeDropDownItem, setActiveDropDownItem]}
    >
      <div id={toolbarId} className="toolbarContainer">
        {/* bold dropdown starts */}
        <button
          onClick={() => {
            setBoldVisibility(!boldVisibility);
            setAlignVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "bold") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("bold");
            }
            setActiveDropDownItem("");
          }}
          aria-label="formatting button dropdown"
          className={
            activeTopMenu === "bold"
              ? "bold-dropdown-button ql-selected ql-active"
              : "bold-dropdown-button"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.2 10.2637C16.2377 9.54698 16.9651 8.37023 16.9651 7.27907C16.9651 4.8614 15.093 3 12.686 3H6V17.9767H13.5312C15.767 17.9767 17.5 16.1581 17.5 13.9223C17.5 12.2963 16.58 10.9056 15.2 10.2637ZM9.2093 5.67442H12.4186C13.3065 5.67442 14.0233 6.39116 14.0233 7.27907C14.0233 8.16698 13.3065 8.88372 12.4186 8.88372H9.2093V5.67442ZM12.9535 15.3023H9.2093V12.093H12.9535C13.8414 12.093 14.5581 12.8098 14.5581 13.6977C14.5581 14.5856 13.8414 15.3023 12.9535 15.3023Z"
              fill={activeTopMenu === "bold" ? "#1565c0" : "#232323"}
            />
            <rect
              x="6"
              y="19"
              width="11"
              height="2"
              fill={activeTopMenu === "bold" ? "#1565c0" : "#232323"}
            />
          </svg>
        </button>
        <BoldDropdownButton
          show={boldVisibility}
          aria-label="formatting options select dropdown"
          className="dropdown-content"
        ></BoldDropdownButton>

        {/* formula btn */}
        <button
          className={
            activeTopMenu === "math"
              ? "ql-formula ql-selected ql-active"
              : "ql-formula"
          }
          aria-label="math equation button"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "math") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("math");
            }
            setActiveDropDownItem("");
          }}
        >
          {icons["formula"]}
        </button>

        {/* alignment dropdown */}
        <button
          onClick={() => {
            setAlignVisibility(!alignVisibility);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "align") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("align");
            }
            setActiveDropDownItem("");
          }}
          className={
            activeTopMenu === "align"
              ? "align-button ql-selected ql-active"
              : "align-button"
          }
          aria-label="alignment buttons dropdown"
          value={activeAlignIcon}
          id="alignment-dropdown"
        >
          {activeAlignIcon === "left"
            ? icons["align"]
            : activeAlignIcon === "center"
            ? icons["center"]
            : activeAlignIcon === "right"
            ? icons["right"]
            : icons["align"]}
        </button>
        <AlignDropdownButton
          show={alignVisibility}
          className="dropdown-content"
          aria-label="alignment buttons options"
          setActiveAlignIcon={setActiveAlignIcon}
        />

        {/* bullets drowdown starts */}
        <button
          onClick={() => {
            setListVisibility(!listVisibility);
            setAlignVisibility(false);
            setBoldVisibility(false);
            if (activeTopMenu === "lists") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("lists");
            }
            setActiveDropDownItem("");
          }}
          className={activeTopMenu === "lists" ? "ql-selected ql-active" : null}
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
          className={
            activeTopMenu === "link"
              ? "ql-link ql-selected ql-active"
              : "ql-link"
          }
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "link") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("link");
            }
            setActiveDropDownItem("link");
          }}
        >
          {icons["link"]}
        </button>
      </div>
    </ToolBarDropDowns.Provider>
  );
};

export default CustomToolBar;
