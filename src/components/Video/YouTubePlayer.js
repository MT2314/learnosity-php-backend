import React, { useEffect } from "react";

import YouTube from "react-youtube";

const YouTubePlayer = ({ componentState = {} }) => {
  const {
    type = "",
    videoUrl = "",
    thumbnailUrl = "",
    thumbnailWidth = 0,
    thumbnailHeight = 0,
    brightcoveDataPlayer = "",
    brightcoveDataPlayerId = "",
  } = componentState;

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <div>
      <YouTube videoId={videoUrl} />
    </div>
  );
};

export default YouTubePlayer;
