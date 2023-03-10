import React, { useEffect, useContext, useState, useRef } from "react";
import styled from "@emotion/styled";
import ReactPlayerLoader from "@brightcove/react-player-loader";
import { VideoContext } from "../VideoContext";
import TenantContext from "../../../Context/TenantContext";
import TriangleIcon from "../assets/Triangle.png";

const PlayerContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
  "& .video-js": {
    width: "760px",
    height: "427.5px",
  },
});

const StyledVideoContainer = styled("div")({
  width: "100%",
  maxWidth: "60.5rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: "30px",
});

const StyledVideoDefaultContainer = styled("div")({
  width: "760px",
  height: "427.5px",
  backgroundColor: "#EEEEEE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCircleContainer = styled("div")({
  width: "200px",
  height: "200px",
  outline: "5px solid #E0E0E0",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledTriangleImage = styled("img")({
  paddingLeft: "20px",
});

// WYSIWYG Editor
import Quill from "quill";
const Delta = Quill.import("delta");

const Player = ({ videoId, videoSource }) => {
  const [state, dispatch] = useContext(VideoContext);
  const [videoData, setVideoData] = useState(null);
  // Prevent fetch on initial component mount
  const isMounted = useRef(false);

  const BRIGHTCOVE_API = "https://edge.api.brightcove.com/playback/v1/accounts";

  const authoringData = useContext(TenantContext);

  const headers = {
    "BCOV-Policy": authoringData.brightcovePolicyKey,
  };

  useEffect(() => {
    const saveFetchData = () => {
      dispatch({
        func: "UPDATE_URL_DATA",
        videoURL: `${BRIGHTCOVE_API}/${authoringData.brightcoveAccountId}/videos/${videoId}`,
        videoId: videoId,
        videoSource: videoSource,
      });
    };
    // Reset URL Data to null when video is deleted
    if (videoId === null || videoSource === null) {
      dispatch({
        func: "UPDATE_URL_DATA",
        data: null,
        videoId: null,
        videoSource: null,
      });
      setVideoData(null);
    } else {
      saveFetchData();
    }
  }, [videoId, videoSource]);

  useEffect(() => {
    let isSubscribed = true;
    if (isMounted.current) {
      const apiCall = async () => {
        const result = await fetch(state.videoURL, { headers });
        const json = await result.json();
        if (isSubscribed) {
          setVideoData(json);
        }
      };
      apiCall();
    } else {
      isMounted.current = true;
    }
    return () => (isSubscribed = false);
  }, [state.videoURL]);

  // Save Description, Credit, and Transcript to State
  useEffect(() => {
    if (videoData !== null) {
      let parseDescription = `${videoData?.long_description.replace(
        / /g,
        "\u00a0"
      )}`;
      let currentDescription = state.videoDescription
        ? state.videoDescription.ops
        : null;

      let descriptionDelta = new Delta([
        ...(currentDescription ? currentDescription : []),
        {
          insert: `\n${parseDescription}\n`,
        },
      ]);

      dispatch({
        func: "CHANGE_DESCRIPTION",
        description: descriptionDelta,
      });
    }
  }, [videoData]);

  return (
    <PlayerContainer>
      <StyledVideoContainer>
        {videoId == null && (
          <StyledVideoDefaultContainer data-testid="video">
            <StyledCircleContainer>
              <StyledTriangleImage src={TriangleIcon} alt="Play Img" />
            </StyledCircleContainer>
          </StyledVideoDefaultContainer>
        )}
        {videoId !== null && (
          <ReactPlayerLoader
            videoId={videoId}
            // TODO: Once we get a confirmation on a working playerId (brightcovePlayer),
            // we can uncomment the following line:
            // playerId={authoringData.brightcovePlayer}
            BRIGHTCOVE_API={BRIGHTCOVE_API}
            accountId={authoringData.brightcoveAccountId}
          />
        )}
      </StyledVideoContainer>
    </PlayerContainer>
  );
};

export default Player;
