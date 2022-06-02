import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import getVideoId from "get-video-id";

const VideoConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    type,
    videoId,
    thumbnailUrl,
    thumbnailWidth,
    thumbnailHeight,
    brightcoveVideoId,
    videoPlayerError,
  } = componentState;

  // State/event handler for setting "type"
  const handleVideoSelect = (e) => {
    setState({
      type: e.target.value,
      videoId: "",
    });
  };

  // Functions to clear inputs when toggling between types
  const handleRadioSelect = () => {
    if (type === "youTube") {
      document.getElementById("youTubeUrl").value = "";
    } else if (type === "brightcove") {
      document.getElementById("brightcoveVideoId").value = "";
    }
  };

  // YOUTUBE
  // State/event handler for setting videoId for YouTube
  const handleYouTubeUrl = (e) => {
    const youTubeId = getVideoId(e.target.value);
    setState({ videoId: youTubeId.id });
    if (videoId) {
      setState({
        videoPlayerError: false,
      });
    } else if (!videoId) {
      setState({
        videoPlayerError: true,
      });
    }
  };

  // Verify YouTube URL/data ID
  const verifyYouTubeUrl = () => {
    if (videoId) {
      setState({
        videoPlayerError: false,
      });
      alert("YouTube URL successful.");
    } else {
      setState({
        videoPlayerError: true,
      });
      alert(
        "Sorry, the URL provided didn't work.  Please provide a valid YouTube URL."
      );
    }
  };

  // BRIGHTCOVE
  // State/event handler for setting "brightcoveAccountId"
  // const handleBrightcoveAccountId = (e) => {
  //   setState({ brightcoveAccountId: e.target.value });
  //   console.log(brightcoveAccountId);
  // };

  // State/event handler for setting "brightcoveVideoId"
  const handleBrightcoveVideoId = (e) => {
    setState({ videoId: e.target.value });
    console.log(videoId);
  };

  // Function to verify Brightcove data
  const verifyBrightcoveData = () => {
    if (videoId && !videoPlayerError) {
      alert("The Brightcove data you've entered was successful.");
    } else if (videoPlayerError) {
      alert(
        "Sorry, the URL provided was unsuccessful.  Please provide a valid Brightcove Video ID."
      );
    }
  };

  // Event handler for clearing all fields/"deleting" video
  const handleClearAllFields = () => {
    document.querySelector(
      'input[name="playerSelect"]:checked'
    ).checked = false;
    if (type === "youTube") {
      document.getElementById("youTubeUrl").value = "";
    } else if (type === "brightcove") {
      document.getElementById("brightcoveVideoId").value = "";
    }
    setState({
      type: "",
      videoId: "",
    });
  };

  useEffect(() => {
    console.log(componentState);
  }, [componentState]);

  return (
    <div className={styles.videoConfigContainer}>
      <EditPanelIcon title="Video" icon={<OndemandVideoIcon />} />
      <div className={styles.playerSelectContainer}>
        <p className={styles.playerSelectInfo}>Please select a video player:</p>
        <form onChange={handleVideoSelect}>
          <input
            className={styles.videoConfigRadio}
            name="playerSelect"
            type="radio"
            id="youTube"
            value="youTube"
            onClick={handleRadioSelect}
          />
          <label htmlFor="youTube">YouTube</label>
          <input
            className={styles.videoConfigRadio}
            name="playerSelect"
            type="radio"
            id="brightcove"
            value="brightcove"
            onClick={handleRadioSelect}
          />
          <label htmlFor="brightcove">Brightcove</label>
        </form>
      </div>
      <div className={styles.configOptions}>
        {type === "youTube" ? (
          <>
            <label htmlFor="youTubeUrl">Enter YouTube video URL:</label>
            <input
              className={`
                ${styles.videoConfigInput}
                ${
                  videoPlayerError
                    ? styles.inputError
                    : videoId && videoPlayerError === false
                    ? styles.inputSuccess
                    : ""
                }
              `}
              type="url"
              name="youTubeUrl"
              id="youTubeUrl"
              placeholder="YouTube video URL..."
              onChange={handleYouTubeUrl}
              onBlur={handleYouTubeUrl}
            />
            <button onClick={() => verifyYouTubeUrl()}>Verify URL</button>
          </>
        ) : type === "brightcove" ? (
          <>
            <label htmlFor="brightcoveVideoId">Brightcove Video ID:</label>
            <input
              className={styles.videoConfigInput}
              type="text"
              name="brightcoveVideoId"
              id="brightcoveVideoId"
              placeholder="Brightcove Video ID..."
              // value={videoId}
              onChange={handleBrightcoveVideoId}
            />
            <button onClick={verifyBrightcoveData}>
              Verify Brightcove Video ID
            </button>
          </>
        ) : null}
        {type ? (
          <button onClick={handleClearAllFields}>Clear All Fields</button>
        ) : null}
      </div>
    </div>
  );
};

export default VideoConfig;
