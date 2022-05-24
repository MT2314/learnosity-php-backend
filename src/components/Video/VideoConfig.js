import React, { useState, useEffect } from "react";

import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/VideoConfig.module.scss";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
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
        <FormControl fullWidth>
          <InputLabel id="playerSelectLabel">Select Video Player:</InputLabel>
          <Select
            labelId="playerSelectLabel"
            id="playerSelect"
            value={videoPlayer}
            label="videoPlayer"
            onChange={handleVideoSelect}
          >
            <MenuItem value="youTube">YouTube</MenuItem>
            <MenuItem value="brightcove">Brightcove</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.configOptions}></div>
    </div>
  );
};

export default VideoConfig;
