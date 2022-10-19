import React from "react";
import styled from "@emotion/styled";
import ReactPlayerLoader from "@brightcove/react-player-loader";

const PlayerContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
  paddingTop: "30px",
});
const Player = ({ videoId = "", BRIGHTCOVE_ACCOUNT_ID, BRIGHTCOVE_API }) => {
  return (
    <PlayerContainer>
      <ReactPlayerLoader
        aria-label="Video player"
        accountId={BRIGHTCOVE_ACCOUNT_ID}
        // playerId={process.env.REACT_APP_BRIGHTCOVE_PLAYER_KEY}
        embedType="iframe"
        embedOptions={{ responsive: true }}
        videoId={videoId}
      />
    </PlayerContainer>
  );
};

export default Player;
