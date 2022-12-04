import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  useSetShowMath,
  useShowMath,
  useBoldRef,
  useLinkRef,
  useShowLink,
  useSetShowLink,
  useQuill,
  useSetLinkRange,
  useIsLink,
  useFormat,
} from "../Provider";
import styled from "@emotion/styled";
import Portal from "@mui/base/Portal";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTranslation } from "react-i18next";
// ? InfoBox imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iconDropdownOptions } from "../../InfoBox/icons/infoBoxIcons";

// ? Text Toolbar imports
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import MathDropdownButton from "./popupToolBar/MathDropdownButton";

import icons, { Chevron } from "../assets/icons";

// import "react-quill/dist/quill.snow.css";
import "../styles/Toolbar.scss";

import {
  AppBar,
  Toolbar,
  Paper,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";

const CustomToolBar = (props) => {
  return (
    <>
      {props?.portal?.shouldPortal && props?.portal?.toolbarReference ? (
        <Portal container={props?.portal?.toolbarReference}>
          <ToolBar {...props} />
        </Portal>
      ) : (
        <ToolBar {...props} />
      )}
    </>
  );
};

const ToolBar = ({
  toolbarId,
  activeDropDownListItem,
  setActiveDropDownListItem,
  activeDropDownAlignItem,
  setActiveDropDownAlignItem,
  isInfoBox,
  infoHasFocus,
  selectedIcon,
  setSelectedIcon,
  portal,
}) => {
  const { t } = useTranslation();
  const setShowMath = useSetShowMath();
  const showMath = useShowMath();
  const showLink = useShowLink();
  const setShowLink = useSetShowLink();
  const quill = useQuill();
  const boldRef = useBoldRef();
  const linkRef = useLinkRef();
  const setLinkRange = useSetLinkRange();
  const isLink = useIsLink();
  const format = useFormat();

  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);
  const [mathVisibility, setMathVisibility] = useState(false);

  // Aria Live
  const [ariaLive, setAriaLive] = useState("");
  const [ariaLive2, setAriaLive2] = useState("");

  // IconBox
  const [openIcon, setIconOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);

  const AppBarRef = useRef(null);
  //focus to the list and align. Bold Ref is found in EditorComponent.js
  const listRef = useRef(null);
  const alignRef = useRef(null);
  const mathRef = useRef(null);
  // ? IconBox refs
  const IconDropDown = useRef(null);

  // ? InfoBox Toolbar
  // const handleToggleInfo = (e) => {
  //   e.target.contains(IconDropDown.current) && ;
  // };

  const handleCloseIcon = (event) => {
    if (IconDropDown.current && IconDropDown.current.contains(event.target)) {
      return;
    }
    setIconOpen(false);
  };

  const handleIconMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setSelectedIcon(iconDropdownOptions[index].type);
  };

  // ? Main Toolbar
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIconOpen(false);
    } else if (event.key === "Escape") {
      setIconOpen(false);
    }
  }

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
    if (activeTopMenu === "link" && !isLink) {
      const selection = quill.getSelection();

      if (selection?.length > 0) {
        setLinkRange(selection);
        setShowLink(true);
      }
    }
  }, [activeTopMenu]);

  useEffect(() => {
    if (activeTopMenu === "link" && !showLink) {
      setActiveDropDownItem("");
      setActiveTopMenu("");
    }
    if (activeTopMenu === "" && (showLink || isLink)) {
      setActiveTopMenu("link");
    }
  }, [showLink, isLink]);

  useEffect(() => {
    if (!showMath) {
      setActiveDropDownItem("");
    }
    if (showMath) {
      setActiveDropDownItem("equationKeyboard");
    }
  }, [showMath]);

  // Hndle Aria live region
  const handleAriaLive = (value) => {
    if (ariaLive === value) {
      setAriaLive("");
      setAriaLive2(value);
    } else {
      setAriaLive2("");
      setAriaLive(value);
    }
  };

  useEffect(() => {
    if (infoHasFocus) {
      setActiveTopMenu("");
      setActiveDropDownItem("");
      setBoldVisibility(false);
      setListVisibility(false);
      setAlignVisibility(false);
    }
  }, [infoHasFocus]);

  return (
    <div
      className="ToolbarContainer"

      // onClick={(e) => e.stopPropagation()}
      // onFocus={(e) => e.stopPropagation()}
    >
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive}
      </span>
      <span
        className="sr-only"
        role="status"
        aria-live="assertive"
        aria-relevant="all"
        aria-atomic="true"
      >
        {ariaLive2}
      </span>
      <AppBar
        className="StyledAppbar"
        position="static"
        ref={AppBarRef}
        elevation={0}
        style={{
          "--width": isInfoBox
            ? "306px"
            : portal?.parentComponent === "video"
            ? "auto"
            : "184px",
          "--display": "flex",
          "--direction": "row",
          "--gap": isInfoBox ? "10px" : "none",
          "--boxShadow": "none !important",
        }}
      >
        {/* InfoBox Dropdown, rendered when Text component is inside of infoBox */}
        {isInfoBox && (
          <Toolbar
            position="static"
            className="StyledToolbar"
            style={{
              "--width": "140px",
              "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
              "--borderLeft": "4px solid #1565c0",
              "--position": "static",
            }}
          >
            <Button
              ref={IconDropDown}
              id="iconToolBar"
              aria-controls={openIcon ? t("Infobox Select Icon") : undefined}
              aria-expanded={openIcon ? "true" : undefined}
              variant="contained"
              disableRipple
              disableFocusRipple
              onClick={() => setIconOpen(!openIcon)}
              className="SelectButton"
              style={{
                "--active": openIcon ? "rgba(21, 101, 192, 1)" : "#000",
                "--width": "100%",
                "--height": "100%",
                "--font-size": "16px",
                "--svg": openIcon ? " " : "rotate(180deg)",
                "--grid-template-columns": "1fr 3fr",
                "--hover-background-color": "transparent",
              }}
            >
              <Chevron />
              <span>
                {selectedIcon === null
                  ? t("Select Icon")
                  : t(`${selectedIcon}`)}
              </span>
              <Popper
                open={openIcon}
                anchorEl={IconDropDown.current}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper
                      elevation={0}
                      className="StyledSelectPaper"
                      style={{
                        "--width": "109px",
                        "--height": "196px",
                        "--margin-left": "0px",
                      }}
                    >
                      <ClickAwayListener onClickAway={handleCloseIcon}>
                        <MenuList
                          autoFocusItem={openIcon}
                          data-testid="icon-select-dropdown"
                          aria-labelledby={t("Infobox Icon Drop Down")}
                          onKeyDown={handleListKeyDown}
                          className="StyledMenu"
                          style={{
                            "--gridTemplateRows": "1fr 1fr 1fr 1fr 1fr",
                            "--padding": "8px 0px",
                            "--justifyItems": "start",
                            "--width": "109px",
                          }}
                        >
                          {iconDropdownOptions.map((infoBox, index) => {
                            return (
                              <MenuItem
                                key={infoBox.id}
                                value={infoBox.type}
                                selected={index === selectedIndex}
                                onClick={(e) =>
                                  handleIconMenuItemClick(e, index)
                                }
                                className="StyledMenuItem"
                                data-testid={`${infoBox.type} icon`}
                                aria-labelledby={`${t(infoBox.type)} ${t(
                                  "Icon"
                                )}`}
                              >
                                {t(infoBox.type)}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Button>
          </Toolbar>
        )}
        {/* <div> */}
        <Toolbar
          id={toolbarId}
          isInfoBox={isInfoBox}
          isVideo={portal?.parentComponent === "video"}
          position="static"
          className="StyledToolbar"
          style={{
            "--width": `${
              isInfoBox
                ? "156px"
                : portal?.parentComponent === "video"
                ? "196px"
                : "184px !important"
            }`,

            "--borderLeft": `${
              isInfoBox || portal?.parentComponent === "video"
                ? "none"
                : "4px solid #1565c0"
            }`,
            "--grid-template-columns": `${
              isInfoBox
                ? "1fr 1fr 1fr 8px 1fr"
                : portal?.parentComponent === "video"
                ? "1fr 1fr 1fr 8px 1fr 8px 1fr"
                : "1fr 1fr 1fr 1fr 8px 1fr"
            }`,
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
            "--justify-items": "center",
            "--position": "static",
          }}
          test-id="infoBox-toolbar"
        >
          <Tooltip
            aria-label="font styles"
            title="font styles"
            placement="top"
            arrow
          >
            <IconButton
              ref={boldRef}
              className="StyledIconButton"
              style={{
                "--active":
                  activeTopMenu === "bold" ? "rgba(21, 101, 192, 1)" : "#000",
                "--background":
                  activeTopMenu === "bold"
                    ? "rgba(21, 101, 192, 0.12)"
                    : "#fff",
              }}
              disabled={
                infoHasFocus || portal?.disabledButtons?.includes("bold")
              }
              disableRipple
              color="inherit"
              onClick={() => {
                setBoldVisibility(!boldVisibility);
                setAlignVisibility(false);
                setListVisibility(false);
                setMathVisibility(false);
                if (activeTopMenu === "bold") {
                  setActiveTopMenu("");
                } else {
                  setActiveTopMenu("bold");
                }
                setActiveDropDownItem("");
                boldVisibility === false
                  ? handleAriaLive(
                      "Text formatting dropdown selected, 6 available options"
                    )
                  : handleAriaLive("Text formatting dropdown closed");
              }}
              onKeyDown={(e) => {
                onKeyDropDown(e, boldRef);
              }}
              id={`bold-${toolbarId}`}
              aria-label="formatting dropdown"
            >
              {icons["customBold"]}
            </IconButton>
          </Tooltip>
          <BoldDropdownButton
            show={boldVisibility}
            onKeyDropDown={(e) => {
              onKeyDropDown(e, boldRef);
            }}
            isVideo={portal?.parentComponent === "video"}
            isInfoBox={isInfoBox}
          ></BoldDropdownButton>

          {!isInfoBox && portal?.parentComponent !== "video" && (
            <>
              <Tooltip
                aria-label="equation"
                title="equation"
                placement="top"
                arrow
              >
                <IconButton
                  ref={mathRef}
                  className="StyledIconButton"
                  style={{
                    "--active":
                      activeTopMenu === "math"
                        ? "rgba(21, 101, 192, 1)"
                        : "#000",
                    "--background":
                      activeTopMenu === "math"
                        ? "rgba(21, 101, 192, 0.12)"
                        : "#fff",
                  }}
                  aria-label="math equation dropdown"
                  disableRipple
                  color="inherit"
                  disabled={infoHasFocus}
                  onClick={() => {
                    setAlignVisibility(false);
                    setBoldVisibility(false);
                    setListVisibility(false);
                    setMathVisibility(!mathVisibility);
                    if (activeTopMenu === "math") {
                      setActiveTopMenu("");
                    } else {
                      setActiveTopMenu("math");
                    }
                    mathVisibility === false
                      ? handleAriaLive(
                          "Math equation dropdown selected, 3 available options"
                        )
                      : handleAriaLive("Math equation dropdown closed");
                  }}
                >
                  {icons["formula"]}
                </IconButton>
              </Tooltip>
              <MathDropdownButton
                show={mathVisibility}
                aria-label="math buttons options"
                setActiveDropDownItem={setActiveDropDownItem}
                activeDropDownItem={activeDropDownItem}
                onKeyDropDown={(e) => {
                  onKeyDropDown(e, mathRef);
                }}
              />
            </>
          )}

          {/* alignment dropdown */}
          <Tooltip
            aria-label="alignment"
            title="alignment"
            placement="top"
            arrow
          >
            <IconButton
              ref={alignRef}
              disabled={
                infoHasFocus || portal?.disabledButtons?.includes("align")
              }
              disableRipple
              color="inherit"
              onClick={() => {
                setAlignVisibility(!alignVisibility);
                setBoldVisibility(false);
                setListVisibility(false);
                setMathVisibility(false);
                if (activeTopMenu === "align") {
                  setActiveTopMenu("");
                } else {
                  setActiveTopMenu("align");
                }
                setActiveDropDownItem("");
                alignVisibility === false
                  ? handleAriaLive(
                      "Alignment formatting dropdown selected, 3 available options"
                    )
                  : handleAriaLive("Allignment formatting dropdown closed");
              }}
              className="StyledIconButton"
              style={{
                "--active":
                  activeTopMenu === "align" ? "rgba(21, 101, 192, 1)" : "#000",
                "--background":
                  activeTopMenu === "align"
                    ? "rgba(21, 101, 192, 0.12)"
                    : "#fff",
              }}
              aria-label="alignment dropdown"
              value={visibleAlignIcon}
              data-alignid="alignment-dropdown"
              onKeyDown={(e) => {
                onKeyDropDown(e, alignRef);
              }}
            >
              {visibleAlignIcon}
            </IconButton>
          </Tooltip>
          <AlignDropdownButton
            show={alignVisibility}
            isInfoBox={isInfoBox}
            isVideo={portal?.parentComponent === "video"}
            // className="dropdown-content"
            aria-label="alignment buttons options"
            activeDropDownItem={activeDropDownAlignItem}
            setActiveDropDownItem={setActiveDropDownAlignItem}
            setVisibleAlignIcon={setVisibleAlignIcon}
            onKeyDropDown={(e) => {
              onKeyDropDown(e, alignRef);
            }}
          />

          {/* bullets drowdown starts */}
          <Tooltip aria-label="add list" title="add list" placement="top" arrow>
            <IconButton
              ref={listRef}
              disabled={
                infoHasFocus || portal?.disabledButtons?.includes("list")
              }
              disableRipple
              color="inherit"
              onClick={() => {
                setListVisibility(!listVisibility);
                setAlignVisibility(false);
                setBoldVisibility(false);
                setMathVisibility(false);
                if (activeTopMenu === "lists") {
                  setActiveTopMenu("");
                } else {
                  setActiveTopMenu("lists");
                }
                alignVisibility === false
                  ? handleAriaLive(
                      "List formatting dropdown selected, 2 available options"
                    )
                  : handleAriaLive("List formatting dropdown closed");
              }}
              className="StyledIconButton"
              style={{
                "--active":
                  activeTopMenu === "lists" ? "rgba(21, 101, 192, 1)" : "#000",
                "--background":
                  activeTopMenu === "lists"
                    ? "rgba(21, 101, 192, 0.12)"
                    : "#fff",
              }}
              value="bullet"
              aria-label="list options"
              onKeyDown={(e) => {
                onKeyDropDown(e, listRef);
              }}
            >
              {icons["bullet"]}
            </IconButton>
          </Tooltip>
          <ListDropdownButton
            show={listVisibility}
            isInfoBox={isInfoBox}
            isVideo={portal?.parentComponent === "video"}
            // className="dropdown-content"
            aria-label="list buttons dropdown"
            onKeyDropDown={(e) => {
              onKeyDropDown(e, listRef);
            }}
          ></ListDropdownButton>

          {/* link btn and divider */}
          <div className="StyledDivider" />
          <Tooltip aria-label="link" title="link" placement="top" arrow>
            <IconButton
              ref={linkRef}
              disabled={infoHasFocus}
              disableRipple
              color="inherit"
              aria-label="add hyperlink"
              className="StyledIconButton"
              style={{
                "--active":
                  activeTopMenu === "link" ? "rgba(21, 101, 192, 1)" : "#000",
                "--background":
                  activeTopMenu === "link"
                    ? "rgba(21, 101, 192, 0.12)"
                    : "#fff",
              }}
              onClick={() => {
                setAlignVisibility(false);
                setBoldVisibility(false);
                setListVisibility(false);

                if (format?.link && activeTopMenu === "link") {
                  const selection = quill.getSelection();
                  quill.formatText(selection, "link", false);
                  setActiveTopMenu("");
                  return;
                }

                setActiveTopMenu(activeTopMenu === "link" ? "" : "link");
              }}
              sx={{ paddingLeft: "12px", paddingRight: "12px" }}
              isVideo={portal?.parentComponent === "video"}
            >
              {icons["link"]}
            </IconButton>
          </Tooltip>
        </Toolbar>
        {/* </div> */}
      </AppBar>
    </div>
  );
};

export default CustomToolBar;
