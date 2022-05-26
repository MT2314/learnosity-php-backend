import React, { useState, useEffect } from "react";

import YouTube from "react-youtube";
import ReactPlayerLoader from "@brightcove/react-player-loader";

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
  brightcoveAccountId,
  brightcoveVideoId,
  transcript,
  caption,
  credit,
  setProp = () => console.warn("No state change function provided"),
}) => {
  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <div className={styles.videoContainer}>
      {type === "" ||
      (type === "brightcove" && !brightcoveAccountId && !brightcoveVideoId) ||
      (type === "youTube" && !videoUrl) ? (
        <div
          data-testid="image-placeholder"
          className={styles.placeholderImg}
          tabIndex="0"
        ></div>
      ) : type === "youTube" && videoUrl ? (
        <YouTube videoId={videoUrl} className={styles.youTubePlayer} />
      ) : type === "brightcove" && brightcoveAccountId && brightcoveVideoId ? (
        <ReactPlayerLoader
          accountId={brightcoveAccountId}
          videoId={brightcoveVideoId}
        />
      ) : null}
    </div>
  );
};

export default Video;
