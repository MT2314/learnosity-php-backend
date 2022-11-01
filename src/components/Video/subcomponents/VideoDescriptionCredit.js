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

const DescriptionInput = styled(TextareaAutosize)({
  width: "622px",
  border: "none",
  fontWeight: "400",
  letterSpacing: "0.4px",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  marginTop: "15px",
  lineHeight: "1.5rem",
  color: "#232323",
  minHeight: "20px",
  background: "#FFF",
  resize: "none",

  "&::placeholder": {
    color: "#232323",
  },

  "&:focus": {
    outline: "none",

    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});

const CreditInput = styled("input")({
  width: "622px",
  border: "none",
  height: "16px",
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "12px",
  fontStyle: "italic",
  "&::placeholder": {
    color: "#232323",
  },

  "&:focus": {
    outline: "none",

    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.12)",
    },
  },
});

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

  const updateBody = useCallback((body) => {
    dispatch({ func: "CHANGE_DESCRIPTION", body: body.body });
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
          setProp={updateBody}
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
          // body={state.videoDescription}
          // setProp={updateBody} --> Add updateCredit
          portal={portalCredit}
          t={t}
        />
      </div>
    </>
  );
};

export default VideoDescriptionCredit;
