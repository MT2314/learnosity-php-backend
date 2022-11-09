import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TabProvider } from "./subcomponents/TabContext";
import { VideoProvider } from "./VideoContext";
import Video from "./subcomponents/Video";

export const defaultProps = {
  videoState: {
    id: uuidv4(),
    videoSource: null,
    videoURL: null,
    videoDescription: null,
    videoCredit: null,
    videoId: null,
    videoTranscript: null,
    videoTextSettings: {
      description: true,
      credit: true,
    },
  },
};

const VideoMain = ({
  videoState = defaultProps,
  setProp = () => {},
  setTabActive = () => {},
  setActiveComponent = () => {},
}) => {
  return (
    <VideoProvider videoState={videoState} setProp={setProp}>
      <TabProvider>
        <Video
          setTabActive={setTabActive}
          setActiveComponent={setActiveComponent}
        />
      </TabProvider>
    </VideoProvider>
  );
};

export default VideoMain;
