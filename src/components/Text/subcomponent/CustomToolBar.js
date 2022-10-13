import React, { useState, useRef, useEffect } from "react";
import { useSetShowMath, useShowMath, useBoldRef } from "../Provider";
import styled from "@emotion/styled";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTranslation } from "react-i18next";

// ? InfoBox imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iconDropdownOptions } from "../../InfoBox/icons/infoBoxIcons";

// ? Video imports
import Menu from "@mui/material/Menu";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import BrightspaceSVG from "../../Video/assets/Brightspace";
import YoutubeSVG from "../../Video/assets/Youtube";
// ? Text Toolbar imports
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";

import icons from "../assets/icons";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";

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
const Container = styled("div")({
  display: "block !important",
  position: "fixed !important",
  top: "80px !important",
  left: "50% !important",
  transform: "translateX(-50%) !important",
  zIndex: 1000,
  gap: "10px",
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
  },
});
// ? Styled Appbar
const StyledAppbar = styled(AppBar)({
  display: "flex",
  flexDirection: "row",
  minHeight: "40px !important",
  gap: "10px",
});

// ? Styled Text Toolbar (Possibly Temp)
const StyledToolbar = styled(Toolbar)(({ isInfoBox, isVideo }) => ({
  display: "flex",
  justifyContent: "space-between",
  ...((isInfoBox || isVideo) && { borderLeft: "none !important" }),
  minHeight: "40px !important",
  width: isInfoBox
    ? "160px"
    : isVideo
    ? "196px !important"
    : "184px !important",
  margin: "10px, 8px",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

// Video Styled Components
const StyledVideoToolbar = styled(Toolbar)(({ isVideo }) => ({
  borderLeft: "4px solid #1565C0",
  display: "flex",
  justifyContent: "space-between",
  minHeight: "40px !important",
  width: "200px !important",
  padding: "0",
  // margin: "10px, 8px",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
const StyledVideoButton = styled(Button)(({ isVideo }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#FFF",
  color: "#232323",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  width: "78px",
  padding: "8px 10px",
  whiteSpace: "nowrap",
  textAlign: "center",
  textTransform: "none",

  "&:hover": {
    background: "#FFF",
    color: "#1565C0",
  },
}));

const StyledVideoMenuItem = styled(MenuItem)({
  width: "287px",
  padding: "6px 16px",
  height: "36px",
  "&:hover": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
  "&:active": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
});

const StyledKebabButton = styled(IconButton)(({ disabled }) => ({
  justifyContent: "flex",
  height: "30px",
  padding: "7px",
  color: "#232323",
  backgroundColor: "none",
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
}));

// Info Box
const StyledIconDropdownButton = styled(Button)({
  borderLeft: "4px solid #1565C0",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#FFF",
  color: "#232323",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  width: "100%",
  padding: "8px 22px",
  display: "flex",
  flexDirection: "row",
  whiteSpace: "nowrap",
  textAlign: "center",
  textTransform: "none",

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
  marginTop: "4px",
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
  justifyContent: "flex-start !important",
  width: "30px",
  height: "30px",
  padding: "7px",
  color: "#232323",
  backgroundColor: "none",
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
}));

const Divider = styled("div")(({}) => ({
  width: "1px",
  height: "25px",
  backgroundColor: "#E0E0E0 !important",
}));

const CustomToolBar = ({
  toolbarId,
  activeDropDownListItem,
  setActiveDropDownListItem,
  activeDropDownAlignItem,
  setActiveDropDownAlignItem,
  isInfoBox,
  infoHasFocus,
  isVideo,
  videoHasFocus,
  selectedIcon,
  setSelectedIcon,
}) => {
  const { t } = useTranslation();

  const setShowMath = useSetShowMath();
  const showMath = useShowMath();
  const boldRef = useBoldRef();
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  // IconBox
  const [openIcon, setIconOpen] = useState(false);
  // Video
  const [openVideo, setVideoOpen] = useState(false);
  const [openTranscript, setTranscriptOpen] = useState(false);
  const [openDescriptionKebab, setDescriptionKebabOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);

  const [activeDirection, setActiveDirection] = useState("left");

  //focus to the list and align. Bold Ref is found in EditorComponent.js
  const listRef = useRef(null);
  const alignRef = useRef(null);
  // ? IconBox refs
  const IconDropDown = useRef(null);
  // ? Video refs
  const AddVideo = useRef(null);
  const TranscriptVideo = useRef(null);
  const DescriptionKebab = useRef(null);

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

  // ? Video Toolbar
  const handleToggleVideo = (e) => {
    e.target.contains(AddVideo.current) && setVideoOpen(!openVideo);
  };
  const handleToggleVideoKebab = (e) => {
    // e.target.contains(DescriptionKebab.current) &&
    //   setDescriptionKebabOpen(!openDescriptionKebab);

    setDescriptionKebabOpen(!openDescriptionKebab);
    // setVideoOpen(false);
  };

  const handleCloseVideo = (event) => {
    // setDescriptionKebabOpen(false);
    // setVideoOpen(false);
    // TranscriptVideo(false);
  };
  const handleKebobChange = (e) => {
    e.stopPropagation();
    console.log(e.target.value);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIconOpen(false);
      setVideoOpen(false);
      setTranscriptOpen(false);
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

  useEffect(() => {
    if (infoHasFocus || videoHasFocus) {
      setActiveTopMenu("");
      setActiveDropDownItem("");
      setBoldVisibility(false);
      setListVisibility(false);
      setAlignVisibility(false);
    }
  }, [infoHasFocus, videoHasFocus]);

  return (
    <Container
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
    >
      <StyledAppbar position="static">
        {/* InfoBox Dropdown, rendered when Text component is inside of infoBox */}
        {isInfoBox && (
          <StyledIconDropdownButton
            ref={IconDropDown}
            id="iconToolBar"
            aria-controls={openIcon ? t("Infobox Select Icon") : undefined}
            aria-expanded={openIcon ? "true" : undefined}
            variant="contained"
            fullWidth
            disableElevation
            disableRipple
            disableFocusRipple
            onClick={handleToggleInfo}
            startIcon={
              openIcon ? (
                <ExpandMoreIcon
                  sx={{
                    transform: "rotate(180deg)",
                  }}
                />
              ) : (
                <ExpandMoreIcon />
              )
            }
          >
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
        {isVideo && (
          <StyledVideoToolbar position="static">
            <StyledVideoButton
              ref={AddVideo}
              id="AddVideo"
              aria-controls={openVideo ? t("Add Video") : undefined}
              aria-expanded={openVideo ? "true" : undefined}
              variant="contained"
              fullWidth
              disableElevation
              disableRipple
              disableFocusRipple
              onClick={handleToggleVideo}
            >
              Add Video
              <Popper
                open={openVideo}
                anchorEl={AddVideo.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ marginLeft: "-10px !important" }}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseVideo}>
                        <StyledMenu
                          autoFocusItem={openVideo}
                          data-testid="video-select-dropdown"
                          aria-labelledby={t("Video Drop Down")}
                          onKeyDown={handleListKeyDown}
                        >
                          <StyledVideoMenuItem>
                            <BrightspaceSVG />
                            <span style={{ marginLeft: "33.66px" }}>
                              Add from Brightcove
                            </span>
                          </StyledVideoMenuItem>
                          <StyledVideoMenuItem>
                            <YoutubeSVG />
                            <span style={{ marginLeft: "33.66px" }}>
                              Add from YouTube
                            </span>
                          </StyledVideoMenuItem>
                        </StyledMenu>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </StyledVideoButton>
            <Divider />

            <StyledVideoButton
              ref={TranscriptVideo}
              id="TranscriptVideo"
              aria-controls={
                openTranscript ? t("Infobox Select Icon") : undefined
              }
              aria-expanded={openTranscript ? "true" : undefined}
              variant="contained"
              fullWidth
              disableElevation
              disableRipple
              disableFocusRipple
              onClick={handleToggleVideo}
            >
              Transcript
            </StyledVideoButton>
          </StyledVideoToolbar>
        )}
        <div>
          <StyledToolbar
            id={toolbarId}
            isInfoBox={isInfoBox}
            isVideo={isVideo}
            className="toolbarContainer"
            variant="dense"
            disableGutters
            test-id="infoBox-toolbar"
          >
            <button
              style={{ display: "none" }}
              aria-hidden="true"
              id="alignmentObserver"
              onClick={(e) => {
                const align = e.target.attributes.getNamedItem("data-align")
                  .value
                  ? e.target.attributes.getNamedItem("data-align").value
                  : "align";
                setVisibleAlignIcon(icons[align]);
                setActiveDirection(align === "align" ? "left" : align);
              }}
              className={`alignment-${toolbarId}`}
            />

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
              <StyledIconButton
                ref={boldRef}
                disabled={infoHasFocus || videoHasFocus}
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
            ></BoldDropdownButton>

            {(!isInfoBox || !isVideo) && (
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
                  disabled={infoHasFocus || videoHasFocus}
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
                </StyledIconButton>
              </Tooltip>
            )}

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
              <StyledIconButton
                ref={alignRef}
                disabled={infoHasFocus || videoHasFocus}
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
                id="alignment-dropdown"
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
              isVideo={isVideo}
              className="dropdown-content"
              aria-label="alignment buttons options"
              activeDropDownItem={activeDropDownAlignItem}
              setActiveDropDownItem={setActiveDropDownAlignItem}
              setVisibleAlignIcon={setVisibleAlignIcon}
              activeDirection={activeDirection}
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
              <StyledIconButton
                ref={listRef}
                disabled={infoHasFocus || videoHasFocus}
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
              isVideo={isVideo}
              className="dropdown-content"
              aria-label="list buttons dropdown"
              activeDropDownItem={activeDropDownListItem}
              setActiveDropDownItem={setActiveDropDownListItem}
              onKeyDropDown={(e) => {
                onKeyDropDown(e, listRef);
              }}
            ></ListDropdownButton>

            {/* link btn and divider */}
            <Divider />
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
              <StyledIconButton
                disabled={infoHasFocus || videoHasFocus}
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
              >
                {icons["link"]}
              </StyledIconButton>
            </Tooltip>
            <HiddenQuillBackgroundColorSelector />
            {/* {/* Video Kebab */}
            {isVideo && (
              <StyledKebabButton
                ref={DescriptionKebab}
                id="Video Settings"
                // aria-controls={openVideo ? t("Add Video") : undefined}
                // aria-expanded={openVideo ? "true" : undefined}
                variant="contained"
                fullWidth
                disableElevation
                disableRipple
                disableFocusRipple
                onClick={handleToggleVideoKebab}
              >
                <MoreVertRoundedIcon />

                <Popper
                  open={openDescriptionKebab}
                  anchorEl={DescriptionKebab.current}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{ marginTop: "8px !important" }}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseVideo}>
                          <StyledMenu
                            autoFocusItem={openVideo}
                            data-testid="video-select-dropdown"
                            aria-labelledby={t("Video Drop Down")}
                            onKeyDown={handleListKeyDown}
                            sx={{
                              width: "204px",
                              height: "108px",
                              paddingLeft: "27.5px",
                              paddingTop: "23px",
                              paddingBottom: "23px",
                            }}
                          >
                            <FormGroup sx={{ gap: "14px" }}>
                              <FormControl onClick={handleKebobChange}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Show description"
                                  size="small"
                                  sx={{
                                    height: "24px",
                                    whiteSpace: "nowrap",
                                    fontFamily: `"Inter", sans-serif`,
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    lineHeight: "1.5rem",
                                    letterSpacing: "0.009375rem",
                                  }}
                                />
                              </FormControl>
                              <FormControl onClick={handleKebobChange}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Show credit"
                                  size="small"
                                  sx={{
                                    height: "24px",
                                    whiteSpace: "nowrap",
                                    fontFamily: `"Inter", sans-serif`,
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    lineHeight: "1.5rem",
                                    letterSpacing: "0.009375rem",
                                  }}
                                />
                              </FormControl>
                            </FormGroup>
                          </StyledMenu>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </StyledKebabButton>
            )}
          </StyledToolbar>
        </div>
      </StyledAppbar>
    </Container>
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
