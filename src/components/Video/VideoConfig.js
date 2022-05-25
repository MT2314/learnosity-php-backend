import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";

const VideoConfig = ({ componentState = {}, setState = () => {} }) => {
  const {
    type = "",
    videoUrl = "",
    thumbnailUrl = "",
    thumbnailWidth = 0,
    thumbnailHeight = 0,
    brightcoveDataPlayer = "",
    brightcoveDataPlayerId = "",
  } = componentState;

  const [videoPlayer, setVideoPlayer] = useState("");
  const handleVideoSelect = (e) => {
    setVideoPlayer(e.target.value);
    setState({ type: e.target.value });
  };

  useEffect(() => {
    console.log(componentState);
  }, [componentState]);

  return (
    <div className={styles.videoConfigContainer}>
      <EditPanelIcon title="Video" icon={<VideocamIcon />} />
      <div className={styles.playerSelectContainer}>
        <p className={styles.playerSelectInfo}>Please select a video player:</p>
        <form onChange={handleVideoSelect}>
          <input
            name="playerSelect"
            type="radio"
            id="youTube"
            value="youTube"
          />
          <label htmlFor="youTube">YouTube</label>
          <input
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
              type="url"
              name="youTubeUrl"
              placeholder="YouTube video URL..."
              pattern=""
              required
            />
          </>
        ) : videoPlayer === "brightcove" ? (
          <>
            <label htmlFor="brightcoveDataVideoId">
              Enter Brightcove Data ID:
            </label>
            <input
              type="url"
              name="brightcoveDataVideoId"
              placeholder="Brightcove Data ID..."
              pattern=""
              required
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VideoConfig;
