import React, { useState, useRef, useEffect, useContext } from "react";
import { useSetShowMath, useShowMath, useBoldRef } from "../Provider";
import styled from "@emotion/styled";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
// ? InfoBox imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iconDropdownOptions } from "../../InfoBox/icons/infoBoxIcons";

// ? Video imports
import Input from "@mui/material/Input";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BrightspaceSVG from "../../Video/assets/Brightspace";
import YoutubeSVG from "../../Video/assets/Youtube";
import KebabSVG from "../../Video/assets/Kebab";
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
  height: "40px !important",
  minHeight: "40px !important",
  width: isInfoBox
    ? "160px"
    : isVideo
    ? "196px !important"
    : "184px !important",
  margin: "10px, 8px",
  paddingRight: "0px !important",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiPaper-root ": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px !important",
  },
}));

// Video Styled Components
const StyledVideoToolbar = styled(Toolbar)(({ selected }) => ({
  borderLeft: "4px solid #1565C0",
  display: "flex",
  justifyContent: "space-evenly",
  minHeight: "40px !important",
  minWidth: selected ? "310px" : "200px",
  margin: "10px, 7px",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingLeft: "0px!important",
  paddingRight: "0px!important",
  "& .MuiToolbar-gutters": {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));
const StyledVideoButton = styled(Button)(({ openVideo }) => ({
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
  boxShadow: "none",
  ...(openVideo && {
    cursor: "pointer",
    color: "rgba(21, 101, 192, 1)",
  }),
  "&:hover": {
    background: "#FFF",
    color: "#1565C0",
  },
  "&:disabled": { background: "none" },
}));

const StyledVideoMenu = styled(MenuList)(({}) => ({
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  marginLeft: "0px",
  marginTop: "2px",
  padding: "0px",
}));

const StyledVideoMenuItem = styled(MenuItem)(({}) => ({
  width: "287px",
  padding: "6px 16px",
  height: "36px",
  borderRadius: "4px",

  "&:hover": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
  "&:active": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
  "& span": {
    "& :hover": { height: "24px" },
  },
}));

const StyledInputItem = styled(MenuItem)(({}) => ({
  width: "287px",
  padding: "0px 16px",
  height: "36px",
  "&:hover": { background: "#FFFFFF" },
  "&:focus": { background: "#FFFFFF" },
  "&:active": { background: "#FFFFFF" },
}));

const StyledKebabButton = styled(IconButton)(({ disabled, open, checked }) => ({
  display: "flex !important",
  height: "30px",
  width: "30px",
  padding: "5px",
  margin: "0px",
  color: "#232323",
  backgroundColor: "none",
  borderRadius: "4px !important",
  ...(open && {
    cursor: "pointer",
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  }),
}));
const StyledFormControlLabel = styled(FormControlLabel)(({}) => ({
  height: "24px",
  whiteSpace: "nowrap",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
}));
const StyledKebabMenu = styled(MenuList)(({}) => ({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  marginLeft: "0px",
  marginTop: "11px",
  width: "204px",
  height: "108px",
  paddingLeft: "27.5px",
  paddingTop: "23px",
  paddingBottom: "23px",
}));
const StyledInput = styled(Input)(({ invalidid }) => ({
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.15000000596046448px",
  background: "#FFFFFF",
  color: invalidid && "rgba(211, 47, 47, 1)",
  borderTopStyle: "hidden",
  borderRightStyle: "hidden",
  borderLeftStyle: "hidden",
  borderBottom: "none",
  outline: "none",
  padding: "0px",
  "&:hover": { background: "#FFFFFF" },
  "&:focus": { background: "#FFFFFF" },
  "&&&:before": {
    borderBottom: "none",
  },
  "&&:after": {
    borderBottom: "none",
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
  setVideoAPI,
  videoAPI = null,
  setVideoTextSettings,
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
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Video
  const [openVideo, setVideoOpen] = useState(false);
  const [openTranscript, setTranscriptOpen] = useState(false);
  const [openDescriptionKebab, setDescriptionKebabOpen] = useState(false);
  const [selectBrightcove, setSelectBrightcove] = useState(false);
  const [selectYoutube, setSelectYoutube] = useState(false);
  const [videoEdit, setVideoEdit] = useState(false);
  const [invalidVideoInput, setInvalidVideoInput] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");
  const [visibleAlignIcon, setVisibleAlignIcon] = useState(icons["align"]);

  const [activeDirection, setActiveDirection] = useState("left");

  const AppBar = useRef(null);
  //focus to the list and align. Bold Ref is found in EditorComponent.js
  const listRef = useRef(null);
  const alignRef = useRef(null);
  // ? IconBox refs
  const IconDropDown = useRef(null);
  // ? Video refs
  const AddVideo = useRef(null);
  const TranscriptVideo = useRef(null);
  const DescriptionKebab = useRef(null);
  const inputId = useRef(null);
  const inputError = useRef(null);

  useOnClickOutside(AppBar, () => {
    toggleCloseToolbar(["Video", "Kebab"]);
  });

  const toggleCloseToolbar = (source) => {
    if (
      source.includes("Kebab") ||
      source.includes("Transcript") ||
      source.includes("API")
    ) {
      setVideoOpen(false);
    }
    if (source.includes("Video")) {
      setDescriptionKebabOpen(false);
    }
    setInvalidVideoInput(false);
    setActiveTopMenu("");
    setActiveDropDownItem("");
    setBoldVisibility(false);
    setListVisibility(false);
    setAlignVisibility(false);
    setSelectYoutube(false);
    setSelectBrightcove(false);
  };

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
    toggleCloseToolbar("Video");
    e.target.contains(AddVideo.current) && setVideoOpen(!openVideo);
  };

  const handleClickTranscript = (e) => {
    setVideoOpen(false);
    toggleCloseToolbar("Transcript");
    e.target.contains(TranscriptVideo.current) && setTranscriptOpen(!openVideo);
  };
  const handleToggleVideoKebab = () => {
    toggleCloseToolbar("Kebab");
    setDescriptionKebabOpen(!openDescriptionKebab);
  };

  const handleVideoAPI = (e, source, action) => {
    e.stopPropagation();
    let inputValue = inputId.current.value;
    if (action === "AddVideo") {
      if (inputValue.length === 13) {
        setVideoAPI((videoAPI) => ({
          ...videoAPI,
          videoSource: source,
          videoId: inputValue,
        }));
        toggleCloseToolbar("API");
        setVideoEdit(false);
        setInvalidVideoInput(false);
      } else if (inputValue.length === 0) {
        handleVideoAPI(
          e,
          selectBrightcove ? "brightcove" : "youtube",
          "RemoveVideo"
        );
      } else {
        console.log("Invalid input");
        setInvalidVideoInput(true);
      }
    } else if (action === "RemoveVideo") {
      setVideoAPI((videoAPI) => ({
        ...videoAPI,
        videoSource: "",
        videoId: null,
      }));
      toggleCloseToolbar("API");
      setVideoEdit(false);
    } else if (action === "EditVideo") {
      setVideoEdit(true);
    }
  };

  const handleTextSettings = (e, source) => {
    e.stopPropagation();
    setVideoTextSettings((videoTextSettings) => ({
      ...videoTextSettings,
      [source]: e.target.checked,
    }));
  };

  // ? Main Toolbar
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
    if (videoAPI.videoId) {
      videoAPI.videoSource === "brightcove" && setSelectBrightcove(true);
      videoAPI.videoSource === "youtube" && setSelectYoutube(true);
    }
  });
  // useEffect(() => {
  //   if (infoHasFocus || videoHasFocus) {
  //     toggleCloseToolbar(["Video", "Kebab"]);
  //   }
  // }, [infoHasFocus, videoHasFocus]);
  // useEffect(() => {
  //   console.table({ activeDropDownItem });
  // }, [activeDropDownItem, activeTopMenu]);

  return (
    <Container
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
    >
      <StyledAppbar position="static" ref={AppBar}>
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
        {isVideo && (
          <StyledVideoToolbar position="static" selected={videoAPI.videoId}>
            {/* Add Video Drop Down */}
            <StyledVideoButton
              ref={AddVideo}
              data-addVideoid="AddVideo"
              aria-controls={openVideo ? t("Add Video") : undefined}
              aria-expanded={openVideo ? "true" : undefined}
              sx={
                ({ width: "100%" },
                videoAPI.videoId && {
                  width: "107px !important",
                  flexGrow: "1",
                })
              }
              variant="contained"
              openVideo={openVideo}
              disableRipple
              disableFocusRipple
              onClick={handleToggleVideo}
            >
              {videoAPI.videoId ? "Change Video" : "Add Video"}

              {/* Select Brightspace OR Youtube Dropdown */}
              {!selectYoutube && !selectBrightcove && (
                <Popper
                  open={openVideo}
                  anchorEl={AddVideo.current}
                  placement="bottom-start"
                  transition
                  disablePortal
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: videoAPI.videoId ? [-55, 0] : [-10, 0],
                      },
                    },
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper>
                        <StyledVideoMenu
                          data-testid="video-select-dropdown"
                          aria-labelledby={t("Video Drop Down")}
                          onKeyDown={handleListKeyDown}
                        >
                          <div>
                            <StyledVideoMenuItem
                              key={"brightcove-select"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectBrightcove(true);
                              }}
                              data-testid={`brightcove select button`}
                              aria-labelledby={`brightcove select button`}
                              sx={{ marginTop: "8px" }}
                            >
                              <BrightspaceSVG />
                              <span style={{ marginLeft: "33.66px" }}>
                                Add from Brightcove
                              </span>
                            </StyledVideoMenuItem>
                            <StyledVideoMenuItem
                              key={"youtube-select"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectYoutube(true);
                              }}
                              data-testid={`youtube select button`}
                              aria-labelledby={`youtube select button`}
                              sx={{ marginBottom: "8px" }}
                            >
                              <YoutubeSVG />
                              <span style={{ marginLeft: "33.66px" }}>
                                Add from YouTube
                              </span>
                            </StyledVideoMenuItem>
                          </div>
                        </StyledVideoMenu>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              )}
              {/* Add , Edit , Delete ID Dropdown */}
              {(selectBrightcove || selectYoutube) && (
                <Popper
                  open={openVideo}
                  anchorEl={AddVideo.current}
                  placement="bottom-start"
                  transition
                  disablePortal
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: videoAPI.videoId ? [0, 0] : [-10, 0],
                      },
                    },
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper>
                        <StyledVideoMenu
                          data-testid={`${
                            selectBrightcove ? "brightcove" : "youtube"
                          } video-select-dropdown`}
                          aria-labelledby={`${
                            selectBrightcove ? "brightcove" : "youtube"
                          } video-select-dropdown`}
                          onKeyDown={handleListKeyDown}
                          sx={{ height: "40px", width: "256px" }}
                          ref={inputError}
                        >
                          <StyledInputItem
                            aria-labelledby={`${
                              selectBrightcove ? "brightcove" : "youtube"
                            } input`}
                            sx={
                              videoAPI.videoId
                                ? {
                                    paddingRight: "7px !important",
                                  }
                                : { paddingRight: "5px !important" }
                            }
                          >
                            {/* Add Video */}
                            <StyledInput
                              inputRef={inputId}
                              data-testid={`${
                                selectBrightcove ? "brightcove" : "youtube"
                              } input-field`}
                              aria-labelledby={`${
                                selectBrightcove ? "brightcove" : "youtube"
                              } input field`}
                              type="text"
                              placeholder={"Paste unique identifier"}
                              defaultValue={
                                videoAPI.videoSource === "brightcove" &&
                                selectBrightcove
                                  ? videoAPI.videoId
                                  : videoAPI.videoSource === "youtube" &&
                                    selectYoutube
                                  ? videoAPI.videoId
                                  : null
                              }
                              disabled={
                                videoAPI.videoId && !videoEdit ? true : false
                              }
                              onClick={(e) => e.stopPropagation()}
                              onChange={() => setInvalidVideoInput(false)}
                              invalidid={invalidVideoInput}
                            />
                            {!videoAPI.videoId || videoEdit ? (
                              <Button
                                type="submit"
                                data-testid={`${videoAPI.videoSource}-submit-button`}
                                aria-label={`${videoAPI.videoSource} id submit button`}
                                onClick={(e) =>
                                  handleVideoAPI(
                                    e,
                                    selectBrightcove ? "brightcove" : "youtube",
                                    "AddVideo"
                                  )
                                }
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  lineHeight: "24px",
                                  letterSpacing: "0.4px",
                                  height: "32px",
                                  minWidth: "39px !important",
                                  width: "39px !important",
                                  padding: "4px 5px",
                                  outline: "inherit",
                                  borderRadius: "4px",
                                  "&:hover": {
                                    cursor: "pointer",
                                    backgroundColor:
                                      "rgba(21, 101, 192, 0.12) !important",
                                    "> svg": {
                                      color: "black !important",
                                    },
                                  },
                                  "&:active": {
                                    cursor: "pointer",
                                    backgroundColor:
                                      "rgba(21, 101, 192, 0.12) !important",
                                    "> svg": {
                                      color: "#1565c0 !important",
                                    },
                                  },
                                }}
                              >
                                Add
                              </Button>
                            ) : (
                              // Edit / Delete Video
                              <div>
                                <Tooltip
                                  aria-label="delete video id"
                                  title="delete video id"
                                  placement="top"
                                  arrow
                                >
                                  <button
                                    aria-label="delete video id"
                                    className="video trashcan"
                                    sx={{ marginRight: "2px !important" }}
                                    onClick={(e) =>
                                      handleVideoAPI(
                                        e,
                                        selectBrightcove
                                          ? "brightcove"
                                          : "youtube",
                                        "RemoveVideo"
                                      )
                                    }
                                  >
                                    {icons["trashcan"]}
                                  </button>
                                </Tooltip>

                                <Tooltip
                                  arrow
                                  title="edit video id"
                                  placement="top"
                                >
                                  <button
                                    aria-label="edit video id"
                                    className="video pencil"
                                    sx={{ marginLeft: "2px !important" }}
                                    onClick={(e) =>
                                      handleVideoAPI(
                                        e,
                                        selectBrightcove
                                          ? "brightcove"
                                          : "youtube",
                                        "EditVideo"
                                      )
                                    }
                                  >
                                    {icons["pencil"]}
                                  </button>
                                </Tooltip>
                              </div>
                            )}
                          </StyledInputItem>
                        </StyledVideoMenu>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              )}
              {/* Invalid Id Error */}
              <Popper
                open={invalidVideoInput}
                anchorEl={inputError.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ pointerEvents: "none" }}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper
                      sx={{
                        backgroundColor: "rgb(251, 234, 234) !important",
                        marginTop: "2px",
                        width: "256px",
                        height: "30px",
                        cursorEvents: "none",
                      }}
                    >
                      <div
                        data-testid={`input-invalid-error`}
                        aria-labelledby={`input-invalid-error`}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        {/* Input Error*/}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: "5.83px 11.83px" }}
                        >
                          <path
                            d="M9.96083 1.66667C5.3875 1.66667 1.66667 5.405 1.66667 10C1.66667 14.595 5.405 18.3333 10 18.3333C14.595 18.3333 18.3333 14.595 18.3333 10C18.3333 5.405 14.5775 1.66667 9.96083 1.66667ZM10 16.6667C6.32417 16.6667 3.33333 13.6758 3.33333 10C3.33333 6.32417 6.30583 3.33333 9.96083 3.33333C13.6592 3.33333 16.6667 6.32417 16.6667 10C16.6667 13.6758 13.6758 16.6667 10 16.6667Z"
                            fill="#D32F2F"
                          />
                          <path
                            d="M9.16667 5.83334H10.8333V11.6667H9.16667V5.83334ZM9.16667 12.5H10.8333V14.1667H9.16667V12.5Z"
                            fill="#D32F2F"
                          />
                        </svg>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "20px",
                            letterSpacing: "0.4000000059604645px",
                          }}
                        >
                          Invalid URL
                        </span>
                      </div>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </StyledVideoButton>
            <Divider />
            {/* Download Transcript Button */}
            <StyledVideoButton
              ref={TranscriptVideo}
              data-tranid="TranscriptVideo"
              aria-controls={
                openTranscript ? t("Infobox Select Icon") : undefined
              }
              aria-expanded={openTranscript ? "true" : undefined}
              variant="contained"
              disableRipple
              disableFocusRipple
              onClick={handleClickTranscript}
              sx={
                videoAPI.videoId
                  ? { width: "159px", flexGrow: "5" }
                  : { width: "78px" }
              }
              disabled={!videoAPI.videoId}
            >
              {videoAPI.videoId ? "Download Transcript" : "Transcript"}
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
              data-observerid="alignmentObserver"
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
                  setVideoOpen(false);
                  setDescriptionKebabOpen(false);
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
              isInfoBox={isInfoBox}
              isVideo={isVideo}
            ></BoldDropdownButton>

            {!isInfoBox && !isVideo && (
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
                  setVideoOpen(false);
                  setDescriptionKebabOpen(false);
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
                  setVideoOpen(false);
                  setDescriptionKebabOpen(false);
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
                  setVideoOpen(false);
                  setDescriptionKebabOpen(false);
                }}
                sx={{ paddingLeft: "12px", paddingRight: "12px" }}
              >
                {icons["link"]}
              </StyledIconButton>
            </Tooltip>
            <HiddenQuillBackgroundColorSelector />

            {/* {/* Video Kebab */}
            {isVideo && (
              <>
                <Divider />
                <StyledKebabButton
                  ref={DescriptionKebab}
                  data-videoid="videoSettings"
                  aria-controls={openVideo ? t("Add Video") : undefined}
                  aria-expanded={openVideo ? "true" : undefined}
                  variant="contained"
                  open={openDescriptionKebab}
                  disableRipple
                  disableFocusRipple
                  onClick={handleToggleVideoKebab}
                >
                  <KebabSVG />

                  <Popper
                    open={openDescriptionKebab}
                    anchorEl={DescriptionKebab.current}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps }) => (
                      <Grow {...TransitionProps}>
                        <Paper>
                          <StyledKebabMenu
                            data-testid="video-description-settings-dropdown"
                            aria-labelledby="Video Description Settings"
                            onKeyDown={handleListKeyDown}
                          >
                            <FormGroup sx={{ gap: "14px" }}>
                              <FormControl>
                                <StyledFormControlLabel
                                  control={
                                    <Checkbox
                                      onClick={(e) =>
                                        handleTextSettings(e, "description")
                                      }
                                      sx={{
                                        "&:hover": {
                                          bgcolor: "transparent",
                                          color: "rgba(21, 101, 192, 1)",
                                        },
                                        "&.Mui-checked": {
                                          bgcolor: "transparent",
                                          color: "rgba(21, 101, 192, 1)",
                                        },
                                      }}
                                    />
                                  }
                                  label="Show description"
                                  size="small"
                                />
                              </FormControl>
                              <FormControl>
                                <StyledFormControlLabel
                                  control={
                                    <Checkbox
                                      onClick={(e) =>
                                        handleTextSettings(e, "credit")
                                      }
                                      sx={{
                                        "&:hover": {
                                          bgcolor: "transparent",
                                          color: "rgba(21, 101, 192, 1)",
                                        },
                                        "&.Mui-checked": {
                                          bgcolor: "transparent",
                                          color: "rgba(21, 101, 192, 1)",
                                        },
                                      }}
                                    />
                                  }
                                  label="Show credit"
                                  size="small"
                                />
                              </FormControl>
                            </FormGroup>
                          </StyledKebabMenu>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </StyledKebabButton>
              </>
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
