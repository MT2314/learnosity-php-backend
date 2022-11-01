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
  useSetIsLink,
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

import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/Toolbar.scss";

import {
  Popper,
  Grow,
  Paper,
  AppBar,
  Toolbar,
  MenuItem,
  MenuList,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";

// * Styled Components

// ? Styled Container
// const Container = styled("div")({
//   display: "block !important",
//   position: "fixed !important",
//   top: "80px !important",
//   left: "50% !important",
//   transform: "translateX(-50%) !important",
//   zIndex: 1000,
//   "& .MuiPaper-root": {
//     backgroundColor: "transparent",
//   },
// });
// ? Styled Appbar
const StyledAppbar = styled(AppBar)({
  display: "flex",
  flexDirection: "row",
  minHeight: "40px !important",
  gap: "10px",
  boxShadow: "none !important",
});

// ? Styled Text Toolbar (Possibly Temp)
const StyledToolbar = styled(Toolbar)(({ isInfoBox, isVideo }) => ({
  display: "flex",
  justifyContent: "space-between",

  ...(isInfoBox || isVideo
    ? { borderLeft: "none !important" }
    : { borderLeft: "4px solid #1565c0 !important" }),

  height: "40px !important",
  minHeight: "40px !important",
  width: isInfoBox || isVideo ? "160px" : "184px !important",
  margin: "10px, 8px",
  paddingRight: "0px !important",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiPaper-root ": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px !important",
    backgroundColor: "#FFF !important",
  },
}));

// Info Box
const StyledIconDropdownButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  alignContent: "space-between",
  borderLeft: "4px solid #1565C0",
  width: "140px",
  padding: "8px 22px 8px 14.5px",
  backgroundColor: "#FFF",
  color: "#232323",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  fontFamily: `"Inter", sans-serif`,
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  whiteSpace: "nowrap",
  textTransform: "none",
  paddingLeft: "10px!important",
  paddingRight: "10px!important",
  "&:hover": {
    background: "#FFF",
    color: "#1565C0",
  },
});

const StyledMenu = styled(MenuList)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  marginLeft: "0px",
  marginTop: "2px",
});
const StyledMenuItem = styled(MenuItem)({
  width: "109px",
  padding: "6px 16px",
  height: "36px",
  "&:hover": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
  "&:active": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
});

const StyledIconButton = styled(IconButton)(({ disabled }) => ({
  display: "flex !important",
  width: "30px",
  height: "30px",
  padding: "7px",
  color: "#232323",
  background: "#FFFFFF",
  borderRadius: "4px !important",

  "& svg": {
    color: "#000",
    ...(disabled && { opacity: 0.3 }),
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      color: "rgba(21, 101, 192, 1)",
    },
  },
  "&:active": {
    cursor: "pointer",
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      color: "rgba(21, 101, 192, 1)",
    },
  },
  "&:focus-visible": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  },
  "& .MuiPaper-root": {
    backgroundColor: "rgba(255,255,255,1) !important",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px !important",
  },
  "& .MuiPaper-root ": {
    backgroundColor: "rgba(255,255,255,1) !important",
  },
}));

const Divider = styled("div")(({}) => ({
  width: "1px",
  height: "25px",
  backgroundColor: "#E0E0E0 !important",
}));

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

  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  // IconBox
  const [openIcon, setIconOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);

  const AppBar = useRef(null);
  //focus to the list and align. Bold Ref is found in EditorComponent.js
  const listRef = useRef(null);
  const alignRef = useRef(null);
  // ? IconBox refs
  const IconDropDown = useRef(null);

  // ? InfoBox Toolbar
  const handleToggleInfo = (e) => {
    e.target.contains(IconDropDown.current) && setIconOpen(!openIcon);
  };

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
    if (activeTopMenu === "math") {
      setShowMath(true);
    }
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
    if (activeTopMenu === "math" && !showMath) {
      setActiveDropDownItem("");
      setActiveTopMenu("");
    }
    if (activeTopMenu === "" && showMath) {
      setActiveTopMenu("math");
    }
  }, [showMath]);

  // useEffect(() => {
  //   if (infoHasFocus ) {
  //     toggleCloseToolbar(["Video", "Kebab"]);
  //   }
  // }, [infoHasFocus, ]);
  // useEffect(() => {
  //   console.table({ activeDropDownItem });
  // }, [activeDropDownItem, activeTopMenu]);

  return (
    <div
      className="Toolbar-Container"
      // onClick={(e) => e.stopPropagation()}
      // onFocus={(e) => e.stopPropagation()}
    >
      <StyledAppbar className="Style-Appbar" position="static" ref={AppBar}>
        {/* InfoBox Dropdown, rendered when Text component is inside of infoBox */}
        {isInfoBox && (
          <StyledIconDropdownButton
            ref={IconDropDown}
            id="iconToolBar"
            aria-controls={openIcon ? t("Infobox Select Icon") : undefined}
            aria-expanded={openIcon ? "true" : undefined}
            variant="contained"
            disableRipple
            disableFocusRipple
            onClick={handleToggleInfo}
          >
            {openIcon ? (
              <ExpandMoreIcon
                sx={{
                  marginRight: "9.5px",
                  transform: "rotate(180deg)",
                  pointerEvents: "none",
                }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{
                  marginRight: "9.5px",
                  pointerEvents: "none",
                }}
              />
            )}
            {selectedIcon === null
              ? t("Infobox Select Icon")
              : t(`${selectedIcon}`)}
            <Popper
              open={openIcon}
              anchorEl={IconDropDown.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseIcon}>
                      <StyledMenu
                        autoFocusItem={openIcon}
                        data-testid="icon-select-dropdown"
                        aria-labelledby={t("Infobox Icon Drop Down")}
                        onKeyDown={handleListKeyDown}
                      >
                        {iconDropdownOptions.map((infoBox, index) => {
                          return (
                            <StyledMenuItem
                              key={infoBox.id}
                              value={infoBox.type}
                              selected={index === selectedIndex}
                              onClick={(e) => handleIconMenuItemClick(e, index)}
                              data-testid={`${infoBox.type} icon`}
                              aria-labelledby={`${t(infoBox.type)} ${t(
                                "Icon"
                              )}`}
                            >
                              {t(infoBox.type)}
                            </StyledMenuItem>
                          );
                        })}
                      </StyledMenu>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </StyledIconDropdownButton>
        )}
        <div>
          <StyledToolbar
            id={toolbarId}
            isInfoBox={isInfoBox}
            isVideo={portal?.parentComponent === "video"}
            className="ql-toolbar ql-snow"
            variant="dense"
            disableGutters
            test-id="infoBox-toolbar"
          >
            <Tooltip
              aria-label="font styles"
              title="font styles"
              placement="top"
              arrow
            >
              <StyledIconButton
                ref={boldRef}
                disabled={
                  infoHasFocus || portal?.disabledButtons?.includes("bold")
                }
                disableRipple
                color="inherit"
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
                id={`bold-${toolbarId}`}
                aria-label="formatting button dropdown"
                className={
                  activeTopMenu === "bold"
                    ? "bold-dropdown-button ql-selected ql-active"
                    : "bold-dropdown-button"
                }
              >
                {icons["customBold"]}
              </StyledIconButton>
            </Tooltip>
            <BoldDropdownButton
              show={boldVisibility}
              aria-label="formatting options select dropdown"
              className="dropdown-content"
              onKeyDropDown={(e) => {
                onKeyDropDown(e, boldRef);
              }}
              isVideo={portal?.parentComponent === "video"}
              isInfoBox={isInfoBox}
            ></BoldDropdownButton>

            {!isInfoBox && portal?.parentComponent !== "video" && (
              <Tooltip
                aria-label="equation"
                title="equation"
                placement="top"
                arrow
              >
                <StyledIconButton
                  className={
                    activeTopMenu === "math"
                      ? "ql-formula ql-selected ql-active"
                      : "ql-formula"
                  }
                  // style={{ display: isInfoBox ? "none" : "block" }}
                  aria-label="math equation button"
                  disableRipple
                  color="inherit"
                  disabled={infoHasFocus}
                  onClick={() => {
                    setAlignVisibility(false);
                    setBoldVisibility(false);
                    setListVisibility(false);
                    if (activeTopMenu === "math") {
                      setActiveTopMenu("");
                    } else {
                      setActiveTopMenu("math");
                    }
                  }}
                >
                  {icons["formula"]}
                </StyledIconButton>
              </Tooltip>
            )}

            {/* alignment dropdown */}
            <Tooltip
              aria-label="alignment"
              title="alignment"
              placement="top"
              arrow
            >
              <StyledIconButton
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
                data-alignid="alignment-dropdown"
                onKeyDown={(e) => {
                  onKeyDropDown(e, alignRef);
                }}
              >
                {visibleAlignIcon}
              </StyledIconButton>
            </Tooltip>
            <AlignDropdownButton
              show={alignVisibility}
              isInfoBox={isInfoBox}
              isVideo={portal?.parentComponent === "video"}
              className="dropdown-content"
              aria-label="alignment buttons options"
              activeDropDownItem={activeDropDownAlignItem}
              setActiveDropDownItem={setActiveDropDownAlignItem}
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
            >
              <StyledIconButton
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
                  if (activeTopMenu === "lists") {
                    setActiveTopMenu("");
                  } else {
                    setActiveTopMenu("lists");
                  }
                }}
                className={
                  activeTopMenu === "lists" ? "ql-selected ql-active" : null
                }
                value="bullet"
                aria-label="list options select group"
                onKeyDown={(e) => {
                  onKeyDropDown(e, listRef);
                }}
              >
                {icons["bullet"]}
              </StyledIconButton>
            </Tooltip>
            <ListDropdownButton
              show={listVisibility}
              isInfoBox={isInfoBox}
              isVideo={portal?.parentComponent === "video"}
              className="dropdown-content"
              aria-label="list buttons dropdown"
              onKeyDropDown={(e) => {
                onKeyDropDown(e, listRef);
              }}
            ></ListDropdownButton>

            {/* link btn and divider */}
            <Divider />
            <Tooltip aria-label="link" title="link" placement="top" arrow>
              <StyledIconButton
                ref={linkRef}
                disabled={infoHasFocus}
                disableRipple
                color="inherit"
                aria-label="add link button"
                className="al-link"
                onClick={() => {
                  setAlignVisibility(false);
                  setBoldVisibility(false);
                  setListVisibility(false);

                  setActiveTopMenu(activeTopMenu === "link" ? "" : "link");
                }}
                sx={{ paddingLeft: "12px", paddingRight: "12px" }}
                isVideo={portal?.parentComponent === "video"}
              >
                {icons["link"]}
              </StyledIconButton>
            </Tooltip>
          </StyledToolbar>
        </div>
      </StyledAppbar>
    </div>
  );
};

export default CustomToolBar;
