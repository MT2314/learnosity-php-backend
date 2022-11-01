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

import {
  useSetFocused,
  useSetDescriptionRef,
  useSetCreditRef,
} from "./TabContext";

const VideoDescriptionCredit = ({
  videoAreaFocused,
  toolbar,
  setVideoAreaFocused,
  t,
}) => {
  const [state, dispatch] = useContext(VideoContext);

  const setFocused = useSetFocused();
  const setDescriptionRef = useSetDescriptionRef();
  const setCreditRef = useSetCreditRef();

  const stateDescription = useState(
    () => state?.videoDescription,
    [state?.videoDescription]
  );

  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [creditFocused, setCreditFocused] = useState(false);

  const descRef = useRef();
  const credRef = useRef();

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
      setTextRef: (result) => setDescriptionRef(result),
    };
  }, [toolbar, videoAreaFocused, creditFocused]);

  const portalCredit = useMemo(() => {
    return {
      parentComponent: "video",
      placeholder: "Credit",
      toolbarReference: toolbar,
      shouldPortal: !videoAreaFocused && !descriptionFocused,
      disabledButtons: ["bold", "align", "list"],
      setParentFocused: (result) => setVideoAreaFocused(result),
      setTextRef: (result) => setCreditRef(result),
    };
  }, [toolbar, videoAreaFocused, descriptionFocused]);

  const handleDescriptionClick = useCallback((e) => {
    setDescriptionFocused(true);
    setCreditFocused(false);
    setFocused("Description");
  }, []);
  const handleCreditClick = useCallback((e) => {
    setCreditFocused(true);
    setDescriptionFocused(false);
    setFocused("Credit");
  }, []);

  return (
    <>
      <div
        ref={descRef}
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
        ref={credRef}
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
