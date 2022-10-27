import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

// Internal Imports
import VideoDescriptionCredit from "./VideoDescriptionCredit";
import Player from "./Player";

// ?Provider
import { VideoProvider } from "../VideoContext";
import Toolbar from "./Toolbar";

// Hook/utilities imports
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
// Localization import
import { useTranslation, Trans } from "react-i18next";
import { VideoContext } from "../VideoContext";

//styled components for Accordion styles
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

const StyledVideoDescriptionContainer = styled("div")({
  marginTop: "22px",
  display: "flex",
  gap: "30px",
  marginBottom: "30px",
});

const DescriptionCreditContainer = styled("div")({
  marginTop: "-20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TranscriptButtonContainer = styled("button")({
  padding: "7px 12.5px !important",
  backgroundColor: "#EBEBEB",
  border: "none",
  borderRadius: "16px",
  height: "32px",
  fontWeight: "400",
  fontSize: "13px",
  textAlign: "center",
  color: "#929292",
});

// InfoBox component
const Video = () => {
  // Localization
  const { t } = useTranslation();

  const [state, dispatch] = useContext(VideoContext);
  const [videoHasFocus, setVideoHasFocus] = useState(false);
  const [videoAreaFocused, setVideoAreaFocused] = useState(false);

  const [videoBody, setVideoBody] = useState(null);
  const [placeHolder, setPlaceHolder] = useState(null);
  const [toolbar, setToolbar] = useState(null);

  const [videoAPI, setVideoAPI] = useState({
    videoSource: "",
    videoId: null,
  });

  const [videoTextSettings, setVideoTextSettings] = useState({
    description: null,
    credit: null,
  });

  const [videoData, setVideoData] = useState(null);

  const isVideo = useMemo(() => true, []);
  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setVideoHasFocus(false);
    setVideoAreaFocused(false);
  });

  const videoFocused = (e) => {
    console.log("VIDEO FOCUSED CLICKED/FOCUSED");
    setVideoAreaFocused(true);
  };

  const handleTextClick = useCallback((e) => {
    e.stopPropagation();
    setVideoAreaFocused(false);
  }, []);

  return (
    <div
      aria-label={t("Video")}
      data-testid="video-container"
      ref={videoRef}
      onClick={(e) => videoFocused(e)}
      onFocus={(e) => videoFocused(e)}
      onBlur={(e) => e.stopPropagation()}
    >
      <Toolbar
        isVideo={isVideo}
        videoAreaFocused={videoAreaFocused}
        setVideoAPI={setVideoAPI}
        videoAPI={videoAPI}
        setVideoTextSettings={setVideoTextSettings}
        setToolbar={setToolbar}
      />
      <Player
        videoId={videoAPI.videoId}
        setVideoData={setVideoData}
        videoData={videoData}
      />
      <StyledVideoContainer>
        <StyledVideoDescriptionContainer>
          <DescriptionCreditContainer>
            <div
              onClick={(e) => {
                handleTextClick(e);
              }}
              onFocus={(e) => {
                handleTextClick(e);
              }}
            >
              <VideoDescriptionCredit
                isVideo={isVideo}
                videoHasFocus={videoHasFocus}
                videoAreaFocused={videoAreaFocused}
                setVideoHasFocus={setVideoHasFocus}
                setVideoBody={setVideoBody}
                setPlaceHolder={setPlaceHolder}
                setVideoAPI={setVideoAPI}
                videoAPI={videoAPI}
                videoData={videoData}
                description={state.videoDescription}
                credit={state.videoCredit}
                toolbar={toolbar}
                setVideoAreaFocused={setVideoAreaFocused}
                t={t}
              />
            </div>
          </DescriptionCreditContainer>
          <TranscriptButtonContainer>No Transcript</TranscriptButtonContainer>
        </StyledVideoDescriptionContainer>
      </StyledVideoContainer>
    </div>
  );
};

export default Video;
