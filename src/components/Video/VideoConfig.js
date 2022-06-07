import React, { useState } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const VideoConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    type,
    videoId = "",
    youTubeUrl,
    thumbnailUrl,
    thumbnailWidth,
    thumbnailHeight,
  } = componentState;

  // Function to clear inputs when toggling between types, and set state for "type"
  const handleRadioSelect = (e) => {
    setState({ type: e.target.value, videoId: "", youTubeUrl: "" });
    setBrightcoveId("");
  };

  // YOUTUBE
  // State/event handler for setting videoId for YouTube
  const handleYouTubeUrl = (e) => {
    setState({ youTubeUrl: e.target.value });
  };

  const verifyYouTubeUrl = (e) => {
    e.preventDefault();
    const regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    let match = youTubeUrl.match(regExp);
    if (match && match[1].length === 11) {
      setState({ videoId: match[1] });
      alert("YouTube URL successful.");
    } else {
      alert("Please provide a valid YouTube URL.");
      setState({ videoId: "" });
    }
  };

  // BRIGHTCOVE
  // State/event handler for setting "brightcoveVideoId"
  const [brightcoveId, setBrightcoveId] = useState("");
  const handleBrightcoveVideoId = (e) => {
    setBrightcoveId(e.target.value);
  };

  // Function to verify Brightcove data
  const verifyBrightcoveData = async (e) => {
    e.preventDefault();
    const brightcoveKey =
      "BCpkADawqM1XplIzTT5iB8WK5oNDPzQsM2CDxSACIVrgtdNB-PRZjMuDeSgYSpdK1dkvswBpDnEoxoAtwa1u9AYhNqX8LemUJQGTksH9e5M5QlElWJy6ygFINKA";
    const headers = { "BCOV-Policy": brightcoveKey };
    await fetch(
      `https://edge.api.brightcove.com/playback/v1/accounts/23648095001/videos/${brightcoveId}`,
      { headers }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.id) {
          setState({ videoId: result.id });
          alert("The Brightcove Video ID provided was successful.");
        } else {
          setState({ videoId: "" });
          alert(
            "Sorry, the Brightcove Video ID provided was unsuccessful.  Please provide a valid Brightcove Video ID."
          );
        }
      });
  };

  // Event handler for clearing all fields/"deleting" video
  const handleClearAllFields = () => {
    setState({ youTubeUrl: "" });
    setBrightcoveId("");
    setState({
      type: "",
      videoId: "",
    });
  };

  return (
    <div className={styles.videoConfigContainer}>
      <EditPanelIcon title="Video" icon={<OndemandVideoIcon />} />
      <div className={styles.playerSelectContainer}>
        <p className={styles.playerSelectInfo}>Please select a video player:</p>
        <label htmlFor="youTube">YouTube</label>
        <input
          checked={type === "youTube" ? true : false}
          className={styles.videoConfigRadio}
          name="playerSelect"
          type="radio"
          id="youTube"
          value="youTube"
          onClick={handleRadioSelect}
        />
        <label htmlFor="brightcove">Brightcove</label>
        <input
          checked={type === "brightcove" ? true : false}
          className={styles.videoConfigRadio}
          name="playerSelect"
          type="radio"
          id="brightcove"
          value="brightcove"
          onClick={handleRadioSelect}
        />
      </div>
      <div className={styles.configOptions}>
        {type === "youTube" ? (
          <>
            <label htmlFor="youTubeUrl">Enter YouTube video URL:</label>
            <input
              className={styles.videoConfigInput}
              type="url"
              name="youTubeUrl"
              id="youTubeUrl"
              value={youTubeUrl}
              placeholder="YouTube video URL..."
              onChange={handleYouTubeUrl}
            />
            <button onClick={verifyYouTubeUrl}>Verify URL</button>
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
              value={brightcoveId}
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
