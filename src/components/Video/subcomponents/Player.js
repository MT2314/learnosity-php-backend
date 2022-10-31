import React, { useEffect, useContext, useState, useRef } from "react";
import styled from "@emotion/styled";
import ReactPlayerLoader from "@brightcove/react-player-loader";
import { VideoContext } from "../VideoContext";
import TriangleIcon from "../assets/Triangle.png";

const PlayerContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
  paddingTop: "30px",
  "& .video-js": {
    width: "760px",
    height: "427.5px",
  },
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

const StyledVideoContainer = styled("div")({
  width: "100%",
  maxWidth: "60.5rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: "30px",
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
  const isMounted = useRef(false);

  const BRIGHTCOVE_API = "https://edge.api.brightcove.com/playback/v1/accounts";
  const BRIGHTCOVE_ACCOUNT_ID = process.env.BRIGHTCOVE_ACCOUNT_ID;

  const headers = {
    "BCOV-Policy": process.env.BRIGHTCOVE_POLICY_KEY,
  };

  useEffect(() => {
    const saveFetchData = () => {
      dispatch({
        func: "UPDATE_URL_DATA",
        videoURL: `${BRIGHTCOVE_API}/${BRIGHTCOVE_ACCOUNT_ID}/videos/${videoId}`,
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

  // Save Description and Credit to State
  useEffect(() => {
    if (videoData !== null) {
      let parseBody = videoData?.long_description.replace(/ /g, "\u00a0");

      let currentDelta = state.videoDescription
        ? state.videoDescription.ops[0].insert
        : null;
      let delta = new Delta([
        {
          insert: `${currentDelta !== null ? currentDelta : ""} ${parseBody}`,
        },
      ]);
      dispatch({
        func: "CHANGE_DESCRIPTION",
        body: delta,
      });
      dispatch({
        func: "CHANGE_CREDIT",
        credit: videoData?.tags,
      });
    }
  }, [videoData]);

  // }, [videoData && !state.videoDescription]);

  return (
    <PlayerContainer>
      {videoId == null && (
        <StyledVideoContainer>
          <StyledVideoDefaultContainer>
            <StyledCircleContainer>
              <StyledTriangleImage src={TriangleIcon} />
            </StyledCircleContainer>
          </StyledVideoDefaultContainer>
        </StyledVideoContainer>
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

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default Player;
