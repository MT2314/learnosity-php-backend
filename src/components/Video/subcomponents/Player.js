import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import ReactPlayerLoader from "@brightcove/react-player-loader";
import { VideoContext } from "../VideoContext";

const PlayerContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
  paddingTop: "30px",
});

const Player = ({ videoId = null, setVideoData }) => {
  const [state, dispatch] = useContext(VideoContext);

  const BRIGHTCOVE_API = "https://edge.api.brightcove.com/playback/v1/accounts";
  const BRIGHTCOVE_ACCOUNT_ID = process.env.BRIGHTCOVE_ACCOUNT_ID;

  const headers = {
    "BCOV-Policy": process.env.BRIGHTCOVE_POLICY_KEY,
  };
  useEffect(() => {
    dispatch({
      func: "CHANGE_URL",
      data: `${BRIGHTCOVE_API}/${BRIGHTCOVE_ACCOUNT_ID}/videos/${videoId}`,
    });
  }, [videoId]);

  useEffect(() => {
    const loadVideo = async () => {
      const result = await fetch(state.videoURL, { headers });
      setVideoData(await result.json());
    };
    loadVideo();
  }, [state.videoURL]);

  return (
    <PlayerContainer>
      {videoId == null && (
        <ReactPlayerLoader
          videoId={""}
          BRIGHTCOVE_API={BRIGHTCOVE_API}
          BRIGHTCOVE_ACCOUNT_ID={BRIGHTCOVE_ACCOUNT_ID}
          accountId={BRIGHTCOVE_ACCOUNT_ID}
        />
      )}
      {videoId !== null && (
        <ReactPlayerLoader
          videoId={videoId}
          BRIGHTCOVE_API={BRIGHTCOVE_API}
          BRIGHTCOVE_ACCOUNT_ID={BRIGHTCOVE_ACCOUNT_ID}
          accountId={BRIGHTCOVE_ACCOUNT_ID}
        />
      )}
    </PlayerContainer>
  );
};

export default Player;
