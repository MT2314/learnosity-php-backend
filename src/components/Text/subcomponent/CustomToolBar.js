import React, { useState } from "react";
import { Divider } from "@mui/material/";
import { Tooltip } from "@material-ui/core/";
import { DeleteOutline, EditOutlined } from "@mui/icons-material/"
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//context to save state of active drop down items

const CustomToolBar = ({ toolbarId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");

  return (
      <div
        id={toolbarId}
        className="toolbarContainer"
        style={{ paddingBottom: "10px" }}
      >
        <DeleteOutline/>
        <EditOutlined/>
        {/* bold dropdown starts */}
        <Tooltip arrow title="font styles" placement="top">
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
        </Tooltip>

        <BoldDropdownButton
          show={boldVisibility}
          aria-label="formatting options select dropdown"
          className="dropdown-content"
        ></BoldDropdownButton>

        {/* formula btn */}
        <Tooltip arrow title="equation" placement="top">
          <button
            className="ql-formula"
            icon={faCoffee}
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
            style={{
              backgroundColor:
                activeTopMenu === "math" ? "rgb(226, 236, 245)" : "",
            }}
          >
            <FontAwesomeIcon icon={faCoffee} className="ql-formula" />
          </button>
        </Tooltip>

        {/* alignment dropdown */}
        <Tooltip arrow title="alignment" placement="top">
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
        </Tooltip>
        <AlignDropdownButton
          show={alignVisibility}
          className="dropdown-content"
          aria-label="alignment buttons options"
        ></AlignDropdownButton>

        {/* bullets drowdown starts */}
        <Tooltip arrow title="add list" placement="top">
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
        </Tooltip>
        <ListDropdownButton
          show={listVisibility}
          className="dropdown-content"
          aria-label="list buttons dropdown"
        ></ListDropdownButton>

        {/* link btn and divider */}
        <Divider orientation="vertical" />
        <Tooltip arrow title="insert link" placement="top">
          <button
            aria-label="add link button"
            className="ql-link"
            onClick={() => {
              setAlignVisibility(false);
              setBoldVisibility(false);
              setListVisibility(false);
              if (activeTopMenu === "link") {
                setActiveTopMenu("");
              } else {
                setActiveTopMenu("link");
              }
              setActiveDropDownItem("");
            }}
            style={{
              backgroundColor:
                activeTopMenu === "link" ? "rgb(226, 236, 245)" : "",
            }}
          />
        </Tooltip>
      </div>
  );
};

export default CustomToolBar;
