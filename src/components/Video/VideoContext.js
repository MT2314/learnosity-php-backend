import React, { createContext, useReducer, useEffect, useState } from "react";
import produce from "immer";

//state of video data stored in VideoContext
export const VideoContext = createContext();

export const videoConfig = (draft, action) => {
  switch (action.func) {
    case "UPDATE_STATE":
      return action.data;
    case "CHANGE_DESCRIPTION":
      draft.body = action.body;
      return draft;
    case "CHANGE_CREDITS":
      draft.videoLabel = action.label;
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
