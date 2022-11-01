import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";

import { VideoContext } from "../VideoContext";

import styled from "@emotion/styled";
import { TextareaAutosize } from "@material-ui/core";
import Text from "../../Text/Text";

const VideoDescriptionCredit = ({
  videoAreaFocused,
  toolbar,
  setVideoAreaFocused,
  t,
}) => {
  const [state, dispatch] = useContext(VideoContext);
  const stateDescription = useState(
    () => state?.videoDescription,
    [state?.videoDescription]
  );

  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [creditFocused, setCreditFocused] = useState(false);

  const descriptionRef = useRef();
  const creditRef = useRef();

  const updateDescription = useCallback((body) => {
    dispatch({ func: "CHANGE_DESCRIPTION", description: body.body });
  });

  const updateCredit = useCallback((body) => {
    dispatch({ func: "CHANGE_CREDIT", credit: body.body });
  });

  const portalDescription = useMemo(() => {
    return {
      parentComponent: "video",
      placeholder: "Video Description",
      toolbarReference: toolbar,
      shouldPortal: !videoAreaFocused && !creditFocused,
      disabledButtons: [],
      setParentFocused: (result) => setVideoAreaFocused(result),
    };
  }, [toolbar, videoAreaFocused, creditFocused]);

  const portalCredit = useMemo(() => {
    return {
      parentComponent: "video",
      placeholder: "Credit",
      toolbarReference: toolbar,
      shouldPortal: !videoAreaFocused && !descriptionFocused,
      disabledButtons: [],
      setParentFocused: (result) => setVideoAreaFocused(result),
    };
  }, [toolbar, videoAreaFocused, descriptionFocused]);

  const handleDescriptionClick = useCallback((e) => {
    setDescriptionFocused(true);
    setCreditFocused(false);
  }, []);
  const handleCreditClick = useCallback((e) => {
    setCreditFocused(true);
    setDescriptionFocused(false);
  }, []);

  return (
    <>
      <div
        ref={descriptionRef}
        style={{ position: "relative", minHeight: "20px", width: "622px" }}
        onClick={handleDescriptionClick}
        onFocus={handleDescriptionClick}
      >
        <Text
          body={state.videoDescription}
          setProp={updateDescription}
          portal={portalDescription}
          t={t}
        />
      </div>

      <div
        ref={creditRef}
        style={{ position: "relative", minHeight: "20px", width: "622px" }}
        onClick={handleCreditClick}
        onFocus={handleCreditClick}
      >
        <Text
          body={state.videoCredit}
          setProp={updateCredit}
          portal={portalCredit}
          t={t}
        />
      </div>
    </>
  );
};

export default VideoDescriptionCredit;
