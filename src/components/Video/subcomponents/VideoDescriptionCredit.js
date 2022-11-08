import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

import { VideoContext } from "../VideoContext";

import Text from "../../Text/Text";
import styled from "@emotion/styled";

import {
  useSetFocused,
  useSetDescriptionRef,
  useSetCreditRef,
} from "./TabContext";
import Quill from "quill";
const Delta = Quill.import("delta");

const TextContainer = styled("div")({
  position: "relative",
  minHeight: "20px",
  width: "622px",
  marginBottom: "10px",
});

const VideoDescriptionCredit = ({
  videoAreaFocused,
  toolbar,
  setVideoAreaFocused,
  t,
  videoTextSettings,
}) => {
  const [state, dispatch] = useContext(VideoContext);
  // WYSIWYG Editor
  const setFocused = useSetFocused();
  const setDescriptionRef = useSetDescriptionRef();
  const setCreditRef = useSetCreditRef();

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
    let creditPlaceholder = new Delta([
      {
        insert: `Credit\n`,
        attributes: { italic: true },
      },
    ]);
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

  useEffect(() => {
    setVideoAreaFocused(true);
    dispatch({ func: "CHANGE_TEXT_SETTINGS", textSettings: videoTextSettings });
  }, [videoTextSettings]);

  return (
    <>
      {videoTextSettings.description === true && (
        <TextContainer
          ref={descRef}
          onClick={handleDescriptionClick}
          onFocus={handleDescriptionClick}
          className={"videoDescription"}
        >
          {/* Description Text box */}
          <Text
            body={state.videoDescription}
            setProp={updateDescription}
            portal={portalDescription}
            t={t}
          />
        </TextContainer>
      )}
      {videoTextSettings.credit === true && (
        <div
          ref={credRef}
          style={{ position: "relative", minHeight: "20px", width: "622px" }}
          onClick={handleCreditClick}
          onFocus={handleCreditClick}
        >
          {/* Credit Text box */}
          <Text
            body={state.videoCredit}
            setProp={updateCredit}
            portal={portalCredit}
            t={t}
          />
        </div>
      )}
    </>
  );
};

export default VideoDescriptionCredit;
