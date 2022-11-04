import React, { useState, useEffect, useRef, useContext } from "react";
// ? Video imports
import Input from "@mui/material/Input";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";

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

import { useTranslation } from "react-i18next";

import BrightcoveSVG from "../assets/Brightcove";
import YoutubeSVG from "../assets/Youtube";
import KebabSVG from "../assets/Kebab";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import { VideoContext } from "../VideoContext";

import { useFocused, useDescriptionRef } from "./TabContext";
import icons from "../assets/icons";

// * Styled Components

// ? Styled Container
const Container = styled("div")(({ disconnect }) => ({
  display: disconnect ? "none" : "block !important",
  position: "fixed !important",
  top: "100px !important",
  left: "36% !important",
  // transform: "translateX(-50%) !important",
  zIndex: 1000,
  gap: "10px",
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
  },
  "& .StyledCard .MuiPaper-root": {
    backgroundColor: "#fff",
  },
}));

// ? Styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(97, 97, 97, 0.9)",
    border: "4px",
    color: "#fff",
    height: "22px",
    padding: "4px, 8px, 4px, 8px",
    fontSize: "10px",
    lineHeight: "14px",
    fontWeight: "500",
    "& .MuiTooltip-arrow": {
      color: "rgba(97, 97, 97, 0.9)",
    },
  },
}));
// ? Styled Appbar
const StyledAppbar = styled(AppBar)({
  display: "flex",
  flexDirection: "row",
  minHeight: "40px !important",
  gap: "10px",
  boxShadow: "none !important",
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
  },
});

// ? Styled Text Toolbar (Possibly Temp)
const StyledToolbar = styled(Toolbar)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  borderLeft: "none !important",
  height: "40px !important",
  minHeight: "40px !important",
  width: "160px",
  margin: "10px, 8px",
  paddingRight: "0px !important",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
  clipPath: "inset(-10px 0px -10px -10px)",

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
    background: "transparent",
    boxShadow: "none",
    color: "#1565C0",
  },
  "&:active": {
    background: "transparent",
    boxShadow: "none",
    color: "#1565C0",
  },
  "&:focus-visible": {
    background: "transparent",
    boxShadow: "none",
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
  "& svg": {
    fill: "#000",
    ...(disabled && { opacity: 0.3 }),
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      fill: "rgba(21, 101, 192, 1)",
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

const StyledIconButton = styled(IconButton)(({ disabled }) => ({
  display: "flex !important",
  width: "30px",
  height: "30px",
  color: "#232323",
  padding: "0px !important",
  background: "#FFFFFF",
  borderRadius: "4px !important",

  "& svg": {
    fill: "#000",
    ...(disabled && { opacity: 0.3 }),
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      fill: "rgba(21, 101, 192, 1)",
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

const ToolBar = ({
  isVideo,
  videoAreaFocused,
  setVideoAPI,
  videoAPI = null,
  setVideoTextSettings,
  videoTextSettings,
  setToolbar,
  disconnect,
  setMainToolbar,
  videoData,
}) => {
  const { t } = useTranslation();

  const [state] = useContext(VideoContext);

  const focused = useFocused();
  const descriptionRef = useDescriptionRef();

  // Video
  const [openVideo, setVideoOpen] = useState(false);
  const [openTranscript, setTranscriptOpen] = useState(false);
  const [openDescriptionKebab, setDescriptionKebabOpen] = useState(false);
  const [selectBrightcove, setSelectBrightcove] = useState(false);
  const [selectYoutube, setSelectYoutube] = useState(false);
  const [videoEdit, setVideoEdit] = useState(false);
  const [invalidVideoInput, setInvalidVideoInput] = useState(false);
  // ? Video refs
  const AddVideo = useRef(null);
  const TranscriptVideo = useRef(null);
  const DescriptionKebab = useRef(null);
  const inputId = useRef(null);
  const inputError = useRef(null);
  const portalToolbarRef = useRef(null);

  const selectRef = useRef(null);
  const kebabselectRef = useRef(null);

  useOnClickOutside(AppBar, () => {
    toggleCloseToolbar(["Video", "Kebab"]);
  });

  useOnClickOutside(selectRef, () => {
    setVideoEdit(false);
    setInvalidVideoInput(false);
    setVideoOpen(false);
    setTranscriptOpen(false);
    // setDescriptionKebabOpen(false);
  });
  useOnClickOutside(kebabselectRef, () => {
    setDescriptionKebabOpen(false);
  });

  // Video Close Toolbar
  const toggleCloseToolbar = (source) => {
    setInvalidVideoInput(false);
    setVideoEdit(false);
    if (
      source.includes("Kebab") ||
      source.includes("Transcript") ||
      source.includes("API")
    ) {
      setVideoOpen(false);
    }
    if (source.includes("Video")) {
      setSelectYoutube(false);
      setSelectBrightcove(false);
      setDescriptionKebabOpen(false);
    }
  };

  // ? Video Toolbar
  const handleToggleVideo = (e) => {
    toggleCloseToolbar("Video");
    e.target.contains(AddVideo.current) && setVideoOpen(!openVideo);
  };
  // Download transcript button
  const handleClickTranscript = (e) => {
    setVideoOpen(false);
    toggleCloseToolbar("Transcript");
    e.target.contains(TranscriptVideo.current) && setTranscriptOpen(!openVideo);

    const texts = [state.videoTranscript]; // text content
    const element = document.createElement("a"); // anchor link
    const file = new Blob(texts, { type: "text/plain" }); // file object
    element.href = URL.createObjectURL(file);
    element.download = state.videoDescription.ops[0].insert + ".txt";
    document.body.appendChild(element); // simulate link click
    element.click(); // Required for this to work in FireFox
  };
  // Toggle Kebab Dropdown
  const handleToggleVideoKebab = () => {
    toggleCloseToolbar("Kebab");
    setDescriptionKebabOpen(!openDescriptionKebab);
  };

  // ? Video API Select Toolbar (Brightcove, Youtube) and Video Add/Edit / Delete
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

  // ? Video Text Settings
  const handleTextSettings = (e, source) => {
    e.stopPropagation();
    setVideoTextSettings((videoTextSettings) => ({
      ...videoTextSettings,
      [source]: e.target.checked,
    }));
  };

  const handleShiftTab = (e) => {
    if (e.shiftKey && e.key === "Tab") {
      if (focused === "Credit") {
        e.preventDefault();
        descriptionRef.focus();
      }
    }
  };

  // Source state state
  useEffect(() => {
    if (videoAPI.videoId) {
      videoAPI.videoSource === "brightcove" && setSelectBrightcove(true);
      videoAPI.videoSource === "youtube" && setSelectYoutube(true);
    }
  });

  useEffect(() => {
    setToolbar(portalToolbarRef.current);
  }, []);
  return (
    <>
      <Container
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        className="ToolbarDummy-Container"
        disconnect={disconnect}
        ref={setMainToolbar}
        onKeyDown={handleShiftTab}
      >
        <StyledAppbar position="static">
          {/* InfoBox Dropdown, rendered when Text component is inside of infoBox */}

          <StyledVideoToolbar
            position="static"
            selected={videoAPI.videoId}
            ref={selectRef}
          >
            {/* Add Video Drop Down */}
            <Tooltip
              aria-label={videoAPI.videoId ? "change video" : "add video"}
              title={videoAPI.videoId ? "change video" : "add video"}
              placement="top"
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -7],
                    },
                  },
                ],
              }}
            >
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
              </StyledVideoButton>
            </Tooltip>
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
                      >
                        <div>
                          <Tooltip
                            aria-label="add brightspace video"
                            title="add brightspace video"
                            placement="top"
                            arrow
                            PopperProps={{
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -7],
                                  },
                                },
                              ],
                            }}
                          >
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
                              <BrightcoveSVG />
                              <span style={{ marginLeft: "33.66px" }}>
                                Add from Brightcove
                              </span>
                            </StyledVideoMenuItem>
                          </Tooltip>
                          <Tooltip
                            aria-label="add brightspace video"
                            title="add brightspace video"
                            placement="top"
                            arrow
                            PopperProps={{
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -7],
                                  },
                                },
                              ],
                            }}
                          >
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
                          </Tooltip>
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
                            <Tooltip
                              aria-label="add video id"
                              title="add video id"
                              placement="top"
                              arrow
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -7],
                                    },
                                  },
                                ],
                              }}
                            >
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
                            </Tooltip>
                          ) : (
                            // Edit / Delete Video
                            <div>
                              <Tooltip
                                aria-label="delete video id"
                                title="delete video id"
                                placement="top"
                                arrow
                                PopperProps={{
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -7],
                                      },
                                    },
                                  ],
                                }}
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
                                PopperProps={{
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [0, -7],
                                      },
                                    },
                                  ],
                                }}
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
            {invalidVideoInput && (
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
                        <ErrorOutlineIcon
                          color="error"
                          fontSize="small"
                          sx={{
                            margin: "5.83px 11.83px",
                          }}
                        />
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
            )}
            <Divider />
            {/* Download Transcript Button */}
            <Tooltip
              aria-label="download transcript"
              title="download transcript"
              placement="top"
              arrow
            >
              <StyledVideoButton
                ref={TranscriptVideo}
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
                disabled={!videoAPI.videoId || state.videoTranscript == ""}
              >
                {videoAPI.videoId && state.videoTranscript !== ""
                  ? "Download Transcript"
                  : "Transcript"}
              </StyledVideoButton>
            </Tooltip>
          </StyledVideoToolbar>

          <div ref={portalToolbarRef}>
            {/* {!textMounted && ( */}
            {videoAreaFocused && (
              <StyledToolbar
                isVideo={isVideo}
                variant="dense"
                disableGutters
                test-id="infoBox-toolbar"
                className="ql-toolbar ql-snow StyledDummy-Toolbar"
              >
                <StyledIconButton
                  disableRipple
                  disabled
                  className="bolddummy-dropdown-button"
                  aria-label="disabled bold dropdown button"
                >
                  {icons["customBold"]}
                </StyledIconButton>
                {/* alignment dropdown */}
                <StyledIconButton
                  disableRipple
                  disabled
                  className={"align-button"}
                  aria-label="disabled allignment dropdown button"
                >
                  {icons["align"]}
                </StyledIconButton>

                {/* bullets drowdown starts */}

                <StyledIconButton
                  disableRipple
                  disabled
                  aria-label="disabled list dropdown button"
                >
                  {icons["bullet"]}
                </StyledIconButton>

                {/* link btn and divider */}
                <Divider />
                <StyledIconButton
                  disableRipple
                  disabled
                  aria-label="disabled link button"
                  sx={{
                    padding: "3px 5px !important",
                    width: "28px !important",
                    height: "100% !important",
                  }}
                >
                  {icons["link"]}
                </StyledIconButton>
              </StyledToolbar>
            )}
          </div>
          {/* {/* Video Kebab */}
          <div
            ref={kebabselectRef}
            style={{
              position: "absolute",
              display: "flex",
              width: "40px",
              height: "40px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              left: state.videoId ? "475px" : "366px",
              borderRadius: "0px 4px 4px 0px",
              backgroundColor: "white",
              zIndex: "1",
              boxShadow:
                "0 -10px 10px -10px rgba(0, 0, 0, 0.1),  0 10px 10px -10px rgba(0, 0, 0, 0.1), 10px 0 10px -10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Divider style={{ float: "left" }} />
            <Tooltip
              aria-label="configure video description"
              title="configure video description"
              placement="top"
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -7],
                    },
                  },
                ],
              }}
            >
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
                sx={{ marginLeft: "2px !important" }}
              >
                <KebabSVG />
              </StyledKebabButton>
            </Tooltip>
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
                    >
                      <FormGroup sx={{ gap: "14px" }}>
                        <FormControl>
                          <Tooltip
                            aria-label="show description"
                            title="show description"
                            placement="top"
                            arrow
                            PopperProps={{
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -7],
                                  },
                                },
                              ],
                            }}
                          >
                            <StyledFormControlLabel
                              control={
                                <Checkbox
                                  checked={videoTextSettings.description}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTextSettings(e, "description");
                                  }}
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
                          </Tooltip>
                        </FormControl>
                        <FormControl>
                          <Tooltip
                            aria-label="show credit"
                            title="show credit"
                            placement="top"
                            arrow
                            PopperProps={{
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -7],
                                  },
                                },
                              ],
                            }}
                          >
                            <StyledFormControlLabel
                              control={
                                <Checkbox
                                  checked={videoTextSettings.credit}
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
                          </Tooltip>
                        </FormControl>
                      </FormGroup>
                    </StyledKebabMenu>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </StyledAppbar>
      </Container>
    </>
  );
};

export default React.memo(ToolBar);
