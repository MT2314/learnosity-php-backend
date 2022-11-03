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

const Player = ({ videoId, videoSource, videoData, setVideoData }) => {
  const [state, dispatch] = useContext(VideoContext);
  // const [videoData, setVideoData] = useState(null);
  // Prevent fetch on initial component mount
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

  // get file from a URL link
  const getFile = (url, callback) => {
    var httpRequest = new XMLHttpRequest(),
      response,
      getResponse = function () { // response handler
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              response = httpRequest.responseText;
              if (response === "{null}") { // some API requests return '{null}' will breaks JSON.parse
                response = null;
              }
              callback(response); // return the response
            } else {
              callback(null);
            }
          }
        } catch (e) {
          callback(null);
        }
      };
    // set up request data
    httpRequest.onreadystatechange = getResponse; // set response handler
    httpRequest.open("GET", url);  // open the request
    httpRequest.send(); // open and send request
  };

  // Save Description, Credit, and Transcript to State
  useEffect(() => {
    if (videoData !== null) {
      let parseDescription = `${videoData?.long_description.replace(
        / /g,
        "\u00a0"
      )}`;
      let currentDescription = state.videoDescription
        ? state.videoDescription.ops[0].insert
        : null;

      let descriptionDelta = new Delta([
        {
          insert: `${
            currentDescription !== null ? currentDescription : ""
          } ${parseDescription}\n`,
        },
      ]);

      dispatch({
        func: "CHANGE_DESCRIPTION",
        description: descriptionDelta,
      });
    }
    if (videoData) {
      var responseEdited = '';
      var regex = /\d\d:\d\d\.\d\d\d\s+-->\s+\d\d:\d\d\.\d\d\d.*\n/ig
      const chosenTrack = videoData.text_tracks[0].src;
      const colonLocation = chosenTrack.indexOf(":");
      const url = chosenTrack.substr(colonLocation + 1);

      getFile(url, function(response) {
        if (response) {
            responseEdited = response.replace(regex,'');
            responseEdited = responseEdited.replace('WEBVTT','');
            responseEdited = responseEdited.replace('X-TIMESTAMP-MAP=LOCAL:00:00:00.000,MPEGTS:0','');
        }
        dispatch({
          func: "CHANGE_TRANSCRIPT",
          transcript: responseEdited,
        });
      });
    }
  }, [videoData]);

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

export default Player;
