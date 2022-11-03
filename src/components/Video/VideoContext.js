import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of video data stored in VideoContext
export const VideoContext = createContext();

export const videoConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "SET_VIDEO_ID":
      draft.videoId = action.videoId;
      return draft;
    case "UPDATE_URL_DATA":
      draft.videoURL = action.videoURL;
      draft.videoId = action.videoId;
      draft.videoSource = action.videoSource;
      return draft;
    case "CHANGE_DESCRIPTION":
      draft.videoDescription = action.description;
      return draft;
    case "CHANGE_CREDIT":
      draft.videoCredit = action.credit;
      return draft;
    case "CHANGE_TRANSCRIPT":
      draft.videoTranscript = action.transcript;
      return draft;
    default:
      return draft;
  }
};

//video provider wraps the tab component to access reducer
export const VideoProvider = ({ children, setProp, videoState }) => {
  const [state, dispatch] = useReducer(produce(videoConfig), videoState);
  const diff = JSON.stringify(state) !== JSON.stringify(videoState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    dispatch({ func: "UPDATE_STATE", data: videoState });
    setMounted(true);
  }, []);

  useEffect(() => {
    diff && mounted && setProp({ videoState: state });
  }, [state]);

  useEffect(() => {
    diff && mounted && dispatch({ func: "UPDATE_STATE", data: videoState });
  }, [videoState]);

  return (
    <VideoContext.Provider value={[state, dispatch]}>
      {children}
    </VideoContext.Provider>
  );
};
