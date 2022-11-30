import React, { useState, useEffect, useRef, useContext } from "react";
// ? Video imports
import {
  ClickAwayListener,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material/";

// import Input from "@mui/material/Input";
// import FormGroup from "@mui/material/FormGroup";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { tooltipClasses } from "@mui/material/Tooltip";
import "../../Text/styles/Toolbar.scss";

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

import { useFocused, useDescriptionRef, useCreditRef } from "./TabContext";
import icons from "../assets/icons";

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
  const [videoInput, setVideoInput] = useState("");
  // ? Video refs
  const AddVideo = useRef(null);
  const TranscriptVideo = useRef(null);
  const DescriptionKebab = useRef(null);
  const inputId = useRef(null);
  const inputError = useRef(null);
  const portalToolbarRef = useRef(null);

  const selectRef = useRef(null);

  const kebabselectRef = useRef(null);

  useOnClickOutside(selectRef, () => {
    setVideoEdit(false);
    setInvalidVideoInput(false);
    setVideoOpen(false);
    setTranscriptOpen(false);
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

  // get file from a URL link
  const getFile = (url, callback) => {
    var httpRequest = new XMLHttpRequest(),
      response,
      getResponse = function () {
        // response handler
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              response = httpRequest.responseText;
              if (response === "{null}") {
                // some API requests return '{null}' will breaks JSON.parse
                response = null;
              }
              callback(response); // return the response
            } else {
              callback(null);
            }
          }
        } catch (e) {
          callback(null);
        }
      };
    // set up request data
    httpRequest.onreadystatechange = getResponse; // set response handler
    httpRequest.open("GET", url); // open the request
    httpRequest.send(); // open and send request
  };

  const headers = {
    "BCOV-Policy": process.env.BRIGHTCOVE_POLICY_KEY,
  };

  const apiCall = async () => {
    const result = await fetch(state.videoURL, { headers });
    const json = await result.json();
    var responseEdited = "";
    var regex = /\d\d:\d\d\.\d\d\d\s+-->\s+\d\d:\d\d\.\d\d\d.*\n/gi;
    const chosenTrack = json.text_tracks[1].src;
    const colonLocation = chosenTrack.indexOf(":");
    const url = chosenTrack.substr(colonLocation + 1);

    getFile(url, function (response) {
      if (response) {
        responseEdited = response.replace(
          "X-TIMESTAMP-MAP=LOCAL:00:00:00.000,MPEGTS:0",
          ""
        );
        responseEdited = responseEdited.replace(regex, "");
        responseEdited = responseEdited.replace("WEBVTT", "");
        responseEdited = responseEdited.replace(
          "00:00.000 --> 01:00:00.000",
          ""
        );
        responseEdited = responseEdited.replace(/^(?:[\t ]*(?:\r?\n|\r))+/, "");
        responseEdited = responseEdited.replaceAll("<br />", "");
        responseEdited = responseEdited.replaceAll("&quot;", '"');
        responseEdited = responseEdited.replaceAll("&apos;", "'");
      }
      const texts = [responseEdited]; // text content
      const element = document.createElement("a"); // anchor link
      const file = new Blob(texts, { type: "text/plain" }); // file object
      element.href = URL.createObjectURL(file);
      element.download = json.name + ".txt";
      document.body.appendChild(element); // simulate link click
      element.click(); // Required for this to work in FireFox
    });
  };

  // Download transcript button
  const handleClickTranscript = (e) => {
    setVideoOpen(false);
    toggleCloseToolbar("Transcript");
    e.target.contains(TranscriptVideo.current) && setTranscriptOpen(!openVideo);

    apiCall();
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

  console.log(inputId.current?.value.length);

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        className="ToolbarContainer"
        style={{
          "--active": !disconnect ? "block" : "none",
        }}
        disconnect={disconnect}
        ref={setMainToolbar}
        onKeyDown={handleShiftTab}
      >
        <AppBar
          position="static"
          className="StyledAppbar"
          elevation={0}
          style={{
            "--display": "flex",
            "--direction": "row",
            "--gap": "10px",
            "--boxShadow": "none !important",
          }}
        >
          {/* Add Video Drop Down */}
          <ClickAwayListener onClickAway={() => toggleCloseToolbar(["Kebab"])}>
            <Toolbar
              position="static"
              selected={videoAPI.videoId}
              ref={selectRef}
              className="StyledToolbar"
              style={{
                "--borderLeft": "4px solid #1565c0",
                "--grid-template-columns": videoAPI.videoId
                  ? "117px 9px 169px"
                  : "88px 9px 88px",
                "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
                "--width": videoAPI.videoId ? "310px" : "200px",
              }}
            >
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
                <Button
                  ref={AddVideo}
                  data-addVideoid="AddVideo"
                  aria-controls={openVideo ? t("Add Video") : undefined}
                  aria-expanded={openVideo ? "true" : undefined}
                  variant="contained"
                  openVideo={openVideo}
                  onClick={handleToggleVideo}
                  disableRipple
                  disableFocusRipple
                  className="SelectButton"
                  style={{
                    "--active": openVideo ? "rgba(21, 101, 192, 1)" : "#000",
                    "--width": "100%",
                    "--height": "100%",
                    "--font-size": "16px",
                    "--grid-template-columns": "1fr",
                    "--hover-background-color": "transparent",
                  }}
                >
                  {videoAPI.videoId ? "Change Video" : "Add Video"}
                </Button>
              </Tooltip>
              {/* Select Brightspace OR Youtube Dropdown */}
              {!selectYoutube && !selectBrightcove && openVideo && (
                <Popper
                  open={openVideo}
                  o
                  anchorEl={AddVideo.current}
                  placement="bottom-start"
                  transition
                  disablePortal
                  modifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: videoAPI.videoId ? [-55, 0] : [-5, 0],
                      },
                    },
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper
                        elevation={0}
                        className="StyledSelectPaper"
                        style={{
                          "--height": "88px",
                          "--margin-left": "2px",
                          "--width": "256px",
                        }}
                      >
                        <MenuList
                          data-testid="video-select-dropdown"
                          aria-labelledby={t("Video Drop Down")}
                          className="StyledMenu"
                          style={{
                            "--gridTemplateRows": "1fr 1fr",
                            "--padding": "8px 0px",
                          }}
                        >
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
                            <MenuItem
                              key={"brightcove-select"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectBrightcove(true);
                              }}
                              data-testid={`brightcove select button`}
                              aria-labelledby={`brightcove select button`}
                              className="StyledMenuItem"
                              style={{
                                width: "256px",
                                height: "36px",
                              }}
                              disableRipple
                              disableFocusRipple
                            >
                              <BrightcoveSVG />
                              <span style={{ marginLeft: "32px" }}>
                                Add from Brightcove
                              </span>
                            </MenuItem>
                          </Tooltip>
                          <Tooltip
                            aria-label="add youtube video"
                            title="add youtube video"
                            placement="top"
                            arrow
                            style={{ pointerEvents: "none" }}
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
                            <MenuItem
                              key={"youtube-select"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectYoutube(true);
                              }}
                              data-testid={`youtube select button`}
                              aria-labelledby={`youtube select button`}
                              disableRipple
                              disableFocusRipple
                              className="StyledMenuItem"
                              style={{
                                width: "256px",
                                height: "36px",
                              }}
                            >
                              <YoutubeSVG />
                              <span style={{ marginLeft: "33.66px" }}>
                                Add from YouTube
                              </span>
                            </MenuItem>
                          </Tooltip>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              )}
              {/* Add , Edit , Delete ID Dropdown */}
              {(selectBrightcove || selectYoutube) && openVideo && (
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
                        offset: videoAPI.videoId ? [-5, 0] : [-5, 0],
                      },
                    },
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <Paper
                        elevation={0}
                        className="StyledSelectPaper"
                        disableFocusRipple
                        disablePortal
                        disableRipple
                        style={{
                          "--height": "40px",
                          "--margin-left": "2px",
                          "--width": "256px",
                        }}
                      >
                        <MenuList
                          className="StyledMenu"
                          style={{
                            "--gridTemplateColumns": videoAPI.videoId
                              ? "1fr auto"
                              : "1fr auto",
                            "--width": "256px",
                            "--padding": videoAPI.videoId
                              ? "0px 7px 0 10px"
                              : "0px 5px 0 10px",
                          }}
                        >
                          {/* Add Video */}
                          <input
                            ref={inputId}
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
                            onChange={() => {
                              setInvalidVideoInput(false);
                              setVideoInput(inputId.current.value);
                            }}
                            className="StyledInput"
                            style={{
                              "--color":
                                invalidVideoInput && "rgba(211, 47, 47, 1)",
                            }}
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
                                className="SelectButton"
                                style={{
                                  "--width": "39px",
                                  "--min-width": "39px !important",
                                  "--height": "32px",
                                  "--padding": "4px 5px",
                                  "--font-size": "14px",
                                  "--grid-template-columns": "1fr",
                                  "--hover-background-color":
                                    "rgba(21, 101, 192, 0.04)",
                                  "--disabled": "rgba(0, 0, 0, 0.38)",
                                }}
                                disabled={videoInput.length === 0}
                                disableRipple
                                disableFocusRipple
                              >
                                Add
                              </Button>
                            </Tooltip>
                          ) : (
                            // Edit / Delete Video
                            <div
                              className="StyledToolbar"
                              style={{
                                "--width": "64px",
                                "--boxShadow": "none",
                                "--borderLeft": "none",
                                "--grid-template-columns": "1fr 1fr",
                                gap: "4px",
                              }}
                            >
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
                                <IconButton
                                  aria-label="edit video id"
                                  className="StyledIconButton"
                                  // sx={{ marginRight: "2px !important" }}
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
                                </IconButton>
                              </Tooltip>
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
                                <IconButton
                                  aria-label="delete video id"
                                  className="StyledIconButton"
                                  // sx={{ marginLeft: "2px !important" }}
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
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                          {/* </Button> */}
                        </MenuList>
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
                          marginTop: "84px",
                          marginLeft: "4px",
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
              <div className="StyledDivider" />
              {/* Download Transcript Button */}
              <Tooltip
                aria-label="download transcript"
                title="download transcript"
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
                  data-testid="download-transcript"
                  ref={TranscriptVideo}
                  aria-expanded={openTranscript ? "true" : undefined}
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  onClick={handleClickTranscript}
                  className="SelectButton"
                  style={{
                    "--width": "100%",
                    "--height": "100%",
                    "--font-size": "16px",
                    "--grid-template-columns": "1fr",
                    "--hover-background-color": "transparent",
                    "--disabled": "rgba(0, 0, 0, 0.38)",
                  }}
                  disabled={!videoAPI.videoId}
                >
                  {videoAPI.videoId ? "Download Transcript" : "Transcript"}
                </Button>
              </Tooltip>
            </Toolbar>
          </ClickAwayListener>

          <div ref={portalToolbarRef} style={{ position: "static" }}>
            {/* {!textMounted && ( */}
            {videoAreaFocused && (
              <Toolbar
                test-id="video-formatting-toolbar"
                position="static"
                className="StyledToolbar"
                style={{
                  "--width": "196px",
                  "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  "--borderLeft": "none",
                  "--grid-template-columns": "1fr 1fr 1fr 8px 1fr 8px 1fr",
                  "--justify-items": "center",
                }}
              >
                <IconButton
                  disableRipple
                  disabled
                  className="StyledIconButton bold"
                  aria-label="disabled bold dropdown button"
                >
                  {icons["customBold"]}
                </IconButton>
                {/* alignment dropdown */}
                <IconButton
                  disableRipple
                  disabled
                  className="StyledIconButton"
                  aria-label="disabled allignment dropdown button"
                >
                  {icons["align"]}
                </IconButton>

                {/* bullets drowdown starts */}

                <IconButton
                  disableRipple
                  disabled
                  className="StyledIconButton list"
                  aria-label="disabled list dropdown button"
                >
                  {icons["bullet"]}
                </IconButton>

                {/* link btn and divider */}
                <div className="StyledDivider" />

                <IconButton
                  disableRipple
                  disabled
                  className="StyledIconButton link"
                  aria-label="disabled link button"
                >
                  {icons["link"]}
                </IconButton>
              </Toolbar>
            )}
          </div>
          {/* {/* Video Kebab */}
          <ClickAwayListener onClickAway={() => toggleCloseToolbar(["Video"])}>
            <div
              ref={kebabselectRef}
              style={{
                position: "absolute",
                display: "grid",
                gridTemplateColumns: "9px 1fr",
                // width: "40px",
                height: "40px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",

                left: state.videoId ? "471px" : "360px",
                // borderRadius: "0px 4px 4px 0px",
                // backgroundColor: "white",
                zIndex: "1",
                // boxShadow:
                //   "0 -10px 10px -10px rgba(0, 0, 0, 0.1),  0 10px 10px -10px rgba(0, 0, 0, 0.1), 10px 0 10px -10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="StyledDivider" />

              <Tooltip
                aria-label="configure video description"
                title="configure video description"
                placement="top"
                arrow
              >
                <IconButton
                  ref={DescriptionKebab}
                  data-videoid="videoSettings"
                  aria-controls={
                    openDescriptionKebab
                      ? t("Change Video Settings")
                      : undefined
                  }
                  aria-expanded={openDescriptionKebab ? "true" : undefined}
                  variant="contained"
                  open={openDescriptionKebab}
                  disableRipple
                  disableFocusRipple
                  onClick={handleToggleVideoKebab}
                  className="StyledIconButton"
                  style={{
                    "--active": openDescriptionKebab
                      ? "rgba(21, 101, 192, 1)"
                      : "#000",
                    "--background": openDescriptionKebab
                      ? "rgba(21, 101, 192, 0.12)"
                      : "#fff",
                  }}
                >
                  <KebabSVG />
                </IconButton>
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
                      <MenuList
                        data-testid="video-description-settings-dropdown"
                        aria-labelledby="Video Description Settings"
                        className="StyledCheckboxMenu"
                        style={{
                          "--width": "204px",
                          "--height": "108px",
                        }}
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
                              <FormControlLabel
                                className="StyledFormControlLabel"
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
                              <FormControlLabel
                                className="StyledFormControlLabel"
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
                      </MenuList>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </ClickAwayListener>
        </AppBar>
      </div>
    </>
  );
};

export default React.memo(ToolBar);
