import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

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
  const [youTubeUrl, setYouTubeUrl] = useState("");
  let youTubeId;
  let youTubeRegEx =
    /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

  const handleYouTubeUrl = (e) => {
    setYouTubeUrl(e.target.value);
  };

  const findYouTubeVideoId = (url) => {
    youTubeId = url.match(youTubeRegEx)[7];
    if (youTubeId) {
      return youTubeId;
    } else {
      alert(
        "Sorry, the URL provided didn't work.  Please provide a valid YouTube URL."
      );
    }
  };

  // Verify YouTube URL/videoId
  const verifyYouTubeUrl = (e) => {
    e.preventDefault();

    const youTubeUrlInput = document.getElementById("youTubeUrl");
    if (youTubeId && youTubeId.length === 11) {
      setState({
        videoId: youTubeId,
        videoPlayerError: false,
      });
      alert("YouTube URL successful.");
    } else if (youTubeUrlInput.length === 0) {
      setState({
        videoId: "",
        videoPlayerError: true,
      });
      alert(
        "Sorry, the URL provided didn't work.  Please provide a valid YouTube URL."
      );
    } else if (!youTubeId) {
      setState({
        videoId: "",
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
    e.preventDefault();
    setState({ videoId: e.target.value });
    console.log(videoId);
  };

  // Function to verify Brightcove data
  const verifyBrightcoveData = (e) => {
    e.preventDefault();
    if (videoId.length !== 13) {
      setState({
        videoId: "",
        videoPlayerError: true,
      });
      console.log(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
      );
      alert(
        "Sorry, the Brightcove Video ID provided was unsuccessful.  Please provide a valid Brightcove Video ID. videoID & error are ",
        videoId,
        videoPlayerError
      );
    }
    if (videoPlayerError) {
      setState({
        videoId: "",
      });
      console.log(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
      );
    } else if (videoId && !videoPlayerError) {
      console.log(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
      );
      alert(
        "The Brightcove data you've entered was successful.videoID & error are ",
        videoId,
        videoPlayerError
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
              // pattern={}
              value={youTubeUrl}
              placeholder="YouTube video URL..."
              onChange={handleYouTubeUrl}
            />
            <button type="submit">Verify URL</button>
          </form>
        ) : type === "brightcove" ? (
          <form>
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
