import React, { useState, useEffect } from "react";

import FormattedText from "../FormattedText/FormattedText";
import { useToolBarOptions } from "../../hooks/useToolBarOptions";

import YouTube from "react-youtube";
import ReactPlayerLoader from "@brightcove/react-player-loader";

import styles from "./styles/Video.module.scss";

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
  brightcoveAccountId,
  brightcoveVideoId,
  transcript,
  caption,
  credit,
  setProp = () => console.warn("No state change function provided"),
}) => {
  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  // Setting the toolbar for FormattedTexts with custom hook
  // const creditToolbar = useToolBarOptions(
  //   ["inline", "textAlign", "list", "link"],
  //   ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"]
  // );

  return (
    <div className={styles.videoContainer}>
      {type === "" ||
      (type === "brightcove" && !brightcoveAccountId && !brightcoveVideoId) ||
      (type === "youTube" && !videoUrl) ? (
        <div
          data-testid="image-placeholder"
          className={styles.placeholderImg}
          tabIndex="0"
        ></div>
      ) : type === "youTube" && videoUrl ? (
        <YouTube videoId={videoUrl} className={styles.youTubePlayer} />
      ) : type === "brightcove" && brightcoveAccountId && brightcoveVideoId ? (
        <ReactPlayerLoader
          accountId={brightcoveAccountId}
          videoId={brightcoveVideoId}
        />
      ) : null}
      {(type === "youTube" && videoUrl) ||
      (type === "brightcove" && brightcoveAccountId && brightcoveVideoId) ? (
        <>
          <div className={styles.transcriptContainer}>
            <FormattedText
              placeHolderText="Type transcript here..."
              body={transcript}
              setProp={(stateUpdate) =>
                setProp({ transcript: stateUpdate.body })
              }
            />
          </div>
          <div className={styles.captionContainer}>
            <FormattedText
              placeHolderText="Type caption here..."
              body={caption}
              setProp={(stateUpdate) => setProp({ caption: stateUpdate.body })}
            />
          </div>
          <div className={styles.creditContainer}>
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
