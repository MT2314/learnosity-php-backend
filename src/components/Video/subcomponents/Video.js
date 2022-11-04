import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

// Internal Imports
import VideoDescriptionCredit from "./VideoDescriptionCredit";
import Player from "./Player";
import Checkmark from "../../Video/assets/Checkmark";

// ?Provider
import Toolbar from "./Toolbar";

// Hook/utilities imports
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
// Localization import
import { VideoContext } from "../VideoContext";

import { useSetFocused } from "./TabContext";

//styled components for Accordion styles

const StyledVideoContainer = styled("div")({
  width: "760px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginLeft: "104px",
  marginRight: "104px",
  paddingBottom: "30px",
});

const StyledVideoDescriptionContainer = styled("div")({
  width: "760px",
  marginTop: "15px",
  display: "flex",
  marginBottom: "30px",
});

const DescriptionCreditContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const TranscriptButtonContainer = styled("button")(({ videoData }) => ({
  display: "flex",
  position: "absolute !important",
  right: "104px",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "6px",
  height: "32px",
  width: "108px !important",
  padding: !videoData ? "7px 12.5px" : "6px 10px 6px 6px",
  backgroundColor: videoData ? "rgba(46, 125, 50, 1)" : "rgba(0, 0, 0, 0.08)",
  color: videoData ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.38)",
  border: "none",
  borderRadius: "16px",
  fontWeight: "400",
  fontSize: "13px",
  lineHeight: "18px",
  letterSpacing: "0.16px",
  textAlign: "center",
}));

// InfoBox component
const Video = () => {
  // Localization
  const { t } = useTranslation();

  const [state, dispatch] = useContext(VideoContext);

  const setFocused = useSetFocused();

  const [videoHasFocus, setVideoHasFocus] = useState(false);
  const [videoAreaFocused, setVideoAreaFocused] = useState(false);

  const [toolbar, setToolbar] = useState(null);

  const [disconnect, setDisconnect] = useState(true);

  const [mainToolbar, setMainToolbar] = useState(null);

  const [videoAPI, setVideoAPI] = useState({
    videoSource: "",
    videoId: null,
  });

  const [videoData, setVideoData] = useState(null);

  const [videoTextSettings, setVideoTextSettings] = useState({
    description: true,
    credit: true,
  });

  const isVideo = useMemo(() => true, []);
  const videoRef = useRef();

  useOnClickOutside(videoRef, () => {
    setVideoHasFocus(false);
    setVideoAreaFocused(false);
    setDisconnect(true);
  });

  const videoFocused = (e) => {
    setFocused("Video");
    setDisconnect(false);
    setVideoAreaFocused(true);
  };

  const handleTextClick = useCallback((e) => {
    e.stopPropagation();
    setDisconnect(false);
    setVideoAreaFocused(false);
  }, []);

  // Set videoAPI if value is set in state
  useMemo(() => {
    if (state.videoSource && state.videoId) {
      setVideoAPI({
        videoSource: state.videoSource,
        videoId: state.videoId,
      });
    }
    if (state.videoTextSettings) {
      setVideoTextSettings(state.videoTextSettings);
    }
  }, []);

  return (
    <div
      aria-label={t("Video")}
      data-testid="video-container"
      ref={videoRef}
      onClick={(e) => videoFocused(e)}
      onFocus={(e) => videoFocused(e)}
      onBlur={(e) => {
        const relatedTarget = e.relatedTarget || document.activeElement;

        if (relatedTarget.tagName === "BODY") {
          e.preventDefault();
          return;
        }

        if (
          !toolbar.contains(relatedTarget) &&
          !relatedTarget?.contains(videoRef?.current) &&
          !relatedTarget?.classList.contains("ql-editor") &&
          !mainToolbar.contains(relatedTarget)
        ) {
          e.preventDefault();
          setDisconnect(true);
        }
      }}
    >
      <Toolbar
        isVideo={isVideo}
        videoAreaFocused={videoAreaFocused}
        setVideoAPI={setVideoAPI}
        videoAPI={videoAPI}
        setVideoTextSettings={setVideoTextSettings}
        videoTextSettings={videoTextSettings}
        setToolbar={setToolbar}
        disconnect={disconnect}
        setMainToolbar={setMainToolbar}
        videoData={videoData}
      />
      <Player
        videoId={videoAPI.videoId}
        videoSource={videoAPI.videoSource}
        videoData={videoData}
        setVideoData={setVideoData}
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
                videoTextSettings={videoTextSettings}
                videoHasFocus={videoHasFocus}
                videoAreaFocused={videoAreaFocused}
                setVideoHasFocus={setVideoHasFocus}
                toolbar={toolbar}
                setVideoAreaFocused={setVideoAreaFocused}
                t={t}
              />
            </div>
          </DescriptionCreditContainer>
          <TranscriptButtonContainer
            videoData={
              state.videoId && state.videoTranscript !== "" ? true : false
            }
          >
            {state.videoId !== null && state.videoTranscript !== "" ? (
              <Checkmark />
            ) : (
              ""
            )}
            <span>
              {state.videoId && state.videoTranscript !== ""
                ? "Transcript"
                : "No Transcript"}
            </span>
          </TranscriptButtonContainer>
        </StyledVideoDescriptionContainer>
      </StyledVideoContainer>
    </div>
  );
};

export default Video;
