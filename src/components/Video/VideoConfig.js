import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const VideoConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    type,
    videoId = "",
    thumbnailUrl,
    thumbnailWidth,
    thumbnailHeight,
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
      setYouTubeUrl("");
      document.getElementById("youTubeUrl").value = "";
    } else if (type === "brightcove") {
      document.getElementById("brightcoveVideoId").value = "";
    }
  };

  // YOUTUBE
  // State/event handler for setting videoId for YouTube
  const [youTubeUrl, setYouTubeUrl] = useState("");

  const handleYouTubeUrl = (e) => {
    setYouTubeUrl(e.target.value);
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
  // State/event handler for setting "brightcoveAccountId"
  // const handleBrightcoveAccountId = (e) => {
  //   setState({ brightcoveAccountId: e.target.value });
  //   console.log(brightcoveAccountId);
  // };

  // State/event handler for setting "brightcoveVideoId"
  const handleBrightcoveVideoId = (e) => {
    e.preventDefault();
    setState({ videoId: e.target.value });
    console.log(videoId);
  };

  // Function to verify Brightcove data
  const verifyBrightcoveData = (e) => {
    e.preventDefault();
    if (videoId.length === 13) {
      setState({
        videoPlayerError: false,
      });
      console.log(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
      );
      alert("The Brightcove Video ID provided was successful.");
      return;
    }
    if (videoId.length < 13) {
      setState({
        videoId: "",
        videoPlayerError: true,
      });
      console.log(
        "The Brightcove data you've entered was unsuccessful. videoID & error are ",
        videoId,
        videoPlayerError
      );
      alert(
        "Sorry, the Brightcove Video ID provided was unsuccessful.  Please provide a valid Brightcove Video ID."
      );
      setState({
        videoId: "",
        videoPlayerError: false,
      });
      return;
    } else if (videoId && !videoPlayerError) {
      console.log(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
      );
      setState({
        videoPlayerError: false,
      });
      alert("The Brightcove data you've entered was successful. ");
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
    setYouTubeUrl("");
    setState({
      type: "",
      videoId: "",
    });
  };

  useEffect(() => {
    console.log("componentState:", componentState);
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
          <form onSubmit={verifyYouTubeUrl}>
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
              value={youTubeUrl}
              placeholder="YouTube video URL..."
              onChange={handleYouTubeUrl}
            />
            <button type="submit">Verify URL</button>
          </form>
        ) : type === "brightcove" ? (
          <form onSubmit={verifyBrightcoveData}>
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
            <button type="submit">Verify Brightcove Video ID</button>
          </form>
        ) : null}
        {type ? (
          <button onClick={handleClearAllFields}>Clear All Fields</button>
        ) : null}
      </div>
    </div>
  );
};

export default VideoConfig;
