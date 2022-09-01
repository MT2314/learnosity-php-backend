import React, { useState, useRef, useEffect } from "react";
import { useSetShowMath, useShowMath } from "../Provider";
import { Divider } from "@mui/material/";
import { Tooltip } from "@material-ui/core";

import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";

import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";

const CustomToolBar = ({ toolbarId, containerId, boldRef }) => {
  const setShowMath = useSetShowMath();
  const showMath = useShowMath();
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);

  //focus to the list and align. Bold Ref is found in EditorComponent.js
  const listRef = useRef(null);
  const alignRef = useRef(null);

  const parentDiv = document.getElementById(containerId);
  const QLformats = parentDiv?.querySelector(`.ql-formats`);
  const QLactive = QLformats?.querySelector(`.ql-active`);
  
  const callback = (mutationList) => {
    mutationList.forEach(function (mutation) {
      if (mutation.target.classList.contains(`ql-active`)) {
        setVisibleAlignIcon(
          icons[mutation.target.value ? mutation.target.value : "align"]
        );
      }
    });
  };

  const observer = new MutationObserver(callback);

  useEffect(() => {
    QLactive ? observer.observe(QLactive, { attributes: true, }) : observer.disconnect();
  }, [QLactive]);

  const onKeyDropDown = (e, currentRef) => {
    if (e.key === "Escape") {
      currentRef.current.focus();
      setAlignVisibility(false);
      setListVisibility(false);
      setBoldVisibility(false);
      setActiveTopMenu(false);
    }
  };

  useEffect(() => {
    if (activeTopMenu === "math") {
      setShowMath(true);
    }
  }, [activeTopMenu]);

  useEffect(() => {
    if (activeTopMenu === "math" && !showMath) {
      setActiveDropDownItem("");
      setActiveTopMenu("");
    }
    if (activeTopMenu === "" && showMath) {
      setActiveTopMenu("math");
    }
  }, [showMath]);

  return (
    <div id={toolbarId} className="toolbarContainer">
      {/* bold dropdown starts */}
      <Tooltip
        aria-label="font styles"
        title="font styles"
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
          popperOptions: {
            positionFixed: true,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: "window", // where "window" is the boundary
              },
            },
          },
        }}
      >
        <button
          ref={boldRef}
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
          onKeyDown={(e) => {
            onKeyDropDown(e, boldRef);
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
        onKeyDropDown={(e) => {
          onKeyDropDown(e, boldRef);
        }}
      ></BoldDropdownButton>

      {/* formula btn */}
      <Tooltip
        aria-label="equation"
        title="equation"
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
          popperOptions: {
            positionFixed: true,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: "window", // where "window" is the boundary
              },
            },
          },
        }}
      >
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

      {/* {activeTopMenu === "math" && (
        <MathPopup toolbarId={toolbarId} closeMath={closeMath} />
      )} */}

      {/* alignment dropdown */}
      <Tooltip
        aria-label="alignment"
        title="alignment"
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
          popperOptions: {
            positionFixed: true,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: "window", // where "window" is the boundary
              },
            },
          },
        }}
      >
        <button
          ref={alignRef}
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
          value={visibleAlignIcon}
          id="alignment-dropdown"
          onKeyDown={(e) => {
            onKeyDropDown(e, alignRef);
          }}
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
        setVisibleAlignIcon={setVisibleAlignIcon}
        onKeyDropDown={(e) => {
          onKeyDropDown(e, alignRef);
        }}
      />

      {/* bullets drowdown starts */}
      <Tooltip
        aria-label="add list"
        title="add list"
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
          popperOptions: {
            positionFixed: true,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: "window", // where "window" is the boundary
              },
            },
          },
        }}
      >
        <button
          ref={listRef}
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
          onKeyDown={(e) => {
            onKeyDropDown(e, listRef);
          }}
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
        onKeyDropDown={(e) => {
          onKeyDropDown(e, listRef);
        }}
      ></ListDropdownButton>

      {/* link btn and divider */}
      <Divider orientation="vertical" />
      <HiddenQuillLinkButton />
      <Tooltip
        aria-label="link"
        title="link"
        placement="top"
        arrow
        PopperProps={{
          disablePortal: true,
          popperOptions: {
            positionFixed: true,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: "window", // where "window" is the boundary
              },
            },
          },
        }}
      >
        <button
          aria-label="add link button"
          className="al-link"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);

            setActiveTopMenu(activeTopMenu === "link" ? "" : "link");
          }}
        >
          {icons["link"]}
        </button>
      </Tooltip>
      <HiddenQuillBackgroundColorSelector />
    </div>
  );
};

const HiddenQuillBackgroundColorSelector = () => {
  return (
    <span className="ql-formats" style={{ display: "none" }}>
      <select className="ql-background" style={{ display: "none" }}></select>
    </span>
  );
};

const HiddenQuillLinkButton = () => {
  return <button className="ql-link" style={{ display: "none" }}></button>;
};

export default CustomToolBar;
