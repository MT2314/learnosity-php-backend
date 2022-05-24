import React, { useState } from "react";

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
  return (
    <div className="videoContainer">
      <h1>Sam</h1>
    </div>
  );
};

export default Video;
