import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import getVideoId from "get-video-id";

const VideoConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    type = "",
    videoUrl = "",
    thumbnailUrl = "",
    thumbnailWidth = 0,
    thumbnailHeight = 0,
    brightcoveAccountId = "",
    brightcoveVideoId = "",
  } = componentState;

  // State/event handler for setting "type"
  const [videoPlayer, setVideoPlayer] = useState("");
  const handleVideoSelect = (e) => {
    setVideoPlayer(e.target.value);
    setState({
      type: e.target.value,
      brightcoveAccountId: "",
      brightcoveVideoId: "",
      videoUrl: "",
    });
  };

  // YOUTUBE
  // State/event handler for setting "videoUrl" for YouTube
  const handleVideoUrl = (e) => {
    const youTubeId = getVideoId(e.target.value);
    setState({ videoUrl: youTubeId.id });
  };

  // Verify YouTube URL/data ID
  const verifyYouTubeUrl = () => {
    if (videoUrl) {
      return;
    } else {
      alert(
        "Sorry, the URL provided didn't work.  Please provide a valid YouTube URL."
      );
    }
  };

  // BRIGHTCOVE
  // State/event handler for setting "brightcoveAccountId"
  const handleBrightcoveAccountId = (e) => {
    setState({ brightcoveAccountId: e.target.value });
    console.log(brightcoveAccountId);
  };

  // State/event handler for setting "brightcoveVideoId"
  const handleBrightcoveVideoId = (e) => {
    setState({ brightcoveVideoId: e.target.value });
    console.log(brightcoveVideoId);
  };

  // Event handler for clearing all fields/"deleting" video
  const handleClearAllFields = () => {
    setState({
      type: "",
      videoUrl: "",
      thumbnailUrl: "",
      thumbnailWidth: 0,
      thumbnailHeight: 0,
      brightcoveAccountId: "",
      brightcoveVideoId: "",
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
          />
          <label htmlFor="youTube">YouTube</label>
          <input
            className={styles.videoConfigRadio}
            name="playerSelect"
            type="radio"
            id="brightcove"
            value="brightcove"
          />
          <label htmlFor="brightcove">Brightcove</label>
        </form>
      </div>
      <div className={styles.configOptions}>
        {videoPlayer === "youTube" ? (
          <>
            <label htmlFor="youTubeUrl">Enter YouTube video URL:</label>
            <input
              className={styles.videoConfigInput}
              type="url"
              name="youTubeUrl"
              placeholder="YouTube video URL..."
              // value={videoUrl}
              onChange={handleVideoUrl}
              required
            />
            <button onClick={() => verifyYouTubeUrl()}>Verify URL</button>
          </>
        ) : videoPlayer === "brightcove" ? (
          <>
            <label htmlFor="brightcoveAccountId">
              Enter Brightcove Account ID:
            </label>
            <input
              className={styles.videoConfigInput}
              type="text"
              name="brightcoveAccountId"
              placeholder="Brightcove Account ID..."
              value={brightcoveAccountId}
              onChange={handleBrightcoveAccountId}
              required
            />
            <label htmlFor="brightcoveVideoId">
              Enter Brightcove Video ID:
            </label>
            <input
              className={styles.videoConfigInput}
              type="text"
              name="brightcoveVideoId"
              placeholder="Brightcove Video ID..."
              value={brightcoveVideoId}
              onChange={handleBrightcoveVideoId}
              required
            />
            <button>Verify Brightcove Settings</button>
          </>
        ) : null}
        {/* <input
          className={styles.videoConfigInput}
          type="text"
          name="transcript"
          placeholder="Enter transcript here..."
        /> */}
        <button onClick={handleClearAllFields}>Clear All Fields</button>
      </div>
    </div>
  );
};

export default VideoConfig;
