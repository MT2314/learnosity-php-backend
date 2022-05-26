import React, { useState, useEffect } from "react";

import YouTube from "react-youtube";

import styles from "./styles/Video.module.scss";

export let defaultProps = {
  type: "",
};

if (defaultProps.type === "youTube") {
  defaultProps = {
    ...defaultProps,
    videoUrl: "",
    thumbnailUrl: "",
    thumbnailWidth: 0,
    thumbnailHeight: 0,
  };
} else if (defaultProps.type === "brightcove") {
  defaultProps = {
    ...defaultProps,
    brightcoveDataPlayer: "",
    brightcoveDataPlayerId: "",
  };
}

const Video = ({
  type,
  videoUrl,
  thumbnailUrl,
  thumbnailWidth,
  thumbnailHeight,
  brightcoveDataPlayer,
  brightcoveDataPlayerId,
  setProp = () => console.warn("No state change function provided"),
}) => {
  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <div className={styles.videoContainer}>
      {type === "" ? (
        <div
          data-testid="image-placeholder"
          className={styles.placeholderImg}
          tabIndex="0"
        ></div>
      ) : type === "youTube" ? (
        <YouTube videoId={videoUrl} className={styles.youTubePlayer} />
      ) : type === "brightcove" ? (
        <p>Brightcove video</p>
      ) : null}
    </div>
  );
};

export default Video;
