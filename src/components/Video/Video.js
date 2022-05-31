import React, { useState, useEffect } from "react";

import FormattedText from "../FormattedText/FormattedText";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";

import YouTube from "react-youtube";
import ReactPlayerLoader from "@brightcove/react-player-loader";

import styles from "./styles/Video.module.scss";

export let defaultProps = {
  type: "",
};

const Video = ({
  type,
  videoUrl,
  brightcoveAccountId,
  brightcoveVideoId,
  transcript,
  caption,
  credit,
  youTubeError,
  setProp = () => console.warn("No state change function provided"),
  setState = () => {},
}) => {
  useEffect(() => {
    console.log(youTubeError);
  }, [youTubeError]);

  // Setting the toolbar for FormattedTexts with custom hook
  // const creditToolbar = useToolBarOptions(
  //   ["inline", "textAlign", "list", "link"],
  //   ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"]
  // );

  return (
    <div className={styles.videoContainer} data-testid="video">
      {type === "" ||
      (type === "brightcove" && !brightcoveAccountId && !brightcoveVideoId) ||
      (type === "youTube" && !videoUrl) ? (
        <div className={styles.placeholderImg} tabIndex="0"></div>
      ) : type === "youTube" && videoUrl ? (
        <div className={styles.youTubePlayer} data-testid="youTubePlayer">
          <YouTube
            videoId={videoUrl}
            onReady={setState({ youTubeError: false })}
            onError={setState({ youTubeError: true })}
          />
        </div>
      ) : type === "brightcove" && brightcoveAccountId && brightcoveVideoId ? (
        <div className={styles.brightcovePlayer} data-testid="brightcovePlayer">
          <ReactPlayerLoader
            accountId={brightcoveAccountId}
            videoId={brightcoveVideoId}
          />
        </div>
      ) : null}
      {(type === "youTube" && videoUrl) ||
      (type === "brightcove" && brightcoveAccountId && brightcoveVideoId) ? (
        <>
          <div
            className={styles.transcriptContainer}
            data-testid="videoTranscript"
          >
            <FormattedText
              placeHolderText="Type transcript here..."
              body={transcript}
              setProp={(stateUpdate) =>
                setProp({ transcript: stateUpdate.body })
              }
            />
          </div>
          <div className={styles.captionContainer} data-testid="videoCaption">
            <FormattedText
              placeHolderText="Type caption here..."
              body={caption}
              setProp={(stateUpdate) => setProp({ caption: stateUpdate.body })}
            />
          </div>
          <div className={styles.creditContainer} data-testid="videoCredit">
            <FormattedText
              placeHolderText="Type credit here..."
              body={credit}
              setProp={(stateUpdate) => setProp({ credit: stateUpdate.body })}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Video;
