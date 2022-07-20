import React, { useState } from "react";
import { Divider } from "@mui/material/";
import { Tooltip } from "@material-ui/core/";
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";

const CustomToolBar = ({ toolbarId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeAlignIcon, setActiveAlignIcon] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");

  // If we can access/add className(s) to p tags in editor, use those to assign a value to the icon supposed to show in toolbar

  // document.getElementsByClassName("ql-right-align") with an onClick() to trigger icon change

  // ql-editor is the className of containing div around p tags in editor
  // if we can access p tags can use onClicks on them
  const centeredPTag = document.getElementsByClassName("ql-align-center");
  // console.log(centeredPTag);
  // centeredPTag.onClick()

  const editorDiv = document.getElementsByClassName("ql-editor");
  if (editorDiv[0]) {
    console.log("hello world");
    for (let i; i < editorDiv[0].length; i++) {
      console.log(editorDiv[0][i].children);
    }
  }

  let visibleAlignIcon;
  if (toolbarId) {
    const currentAlignIcon = document.getElementsByClassName(
      "ql-align ql-active ql-selected"
    );
    // console.log(currentAlignIcon[0].value);
    // const alignIconArray = Array.prototype.slice.call(currentAlignIcon);
    // console.log(alignIconArray[0]);
    let alignIconValue;
    if (currentAlignIcon[0]) {
      alignIconValue = currentAlignIcon[0].value;
      // console.log(alignIconValue);
    }

    if (alignIconValue === "") {
      visibleAlignIcon = icons["align"];
    } else if (alignIconValue === "center") {
      visibleAlignIcon = icons["center"];
    } else if (alignIconValue === "right") {
      visibleAlignIcon = icons["right"];
    } else {
      visibleAlignIcon = icons["align"];
    }
  }

  return (
    <div id={toolbarId} className="toolbarContainer">
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
          className={
            activeTopMenu === "bold"
              ? "bold-dropdown-button ql-selected ql-active"
              : "bold-dropdown-button"
          }
        >
          {icons["customBold"]}
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
          className={
            activeTopMenu === "align"
              ? "align-button ql-selected ql-active"
              : "align-button"
          }
          aria-label="alignment buttons dropdown"
          value={activeAlignIcon}
          id="alignment-dropdown"
        >
          {visibleAlignIcon}
        </button>
      </Tooltip>
      <AlignDropdownButton
        show={alignVisibility}
        className="dropdown-content"
        aria-label="alignment buttons options"
        activeDropDownItem={activeDropDownItem}
        setActiveDropDownItem={setActiveDropDownItem}
        setActiveAlignIcon={setActiveAlignIcon}
      />

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
          className={activeTopMenu === "lists" ? "ql-selected ql-active" : null}
          value="bullet"
          aria-label="list options select group"
        >
          {icons["bullet"]}
        </button>
      </Tooltip>
      <ListDropdownButton
        show={listVisibility}
        className="dropdown-content"
        aria-label="list buttons dropdown"
        activeDropDownItem={activeDropDownItem}
        setActiveDropDownItem={setActiveDropDownItem}
      ></ListDropdownButton>

      {/* link btn and divider */}
      <Divider orientation="vertical" />
      <Tooltip arrow title="insert link" placement="top">
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
      </Tooltip>
    </div>
  );
};

export default CustomToolBar;
