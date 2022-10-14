import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { VideoContext } from "../VideoContext";
import Text from "../../Text/Text";

import { TextareaAutosize } from "@material-ui/core";
import styled from "@emotion/styled";

const StyledBodyTextArea = styled(TextareaAutosize)({
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  marginTop: "15px",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  color: "#232323",
  width: "100%",
  minHeight: "72px",
  marginTop: "0.9375rem",
  background: "#FAFAFA",
  border: "none",
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

const Body = (props) => {
  const [state, dispatch] = useContext(VideoContext);
  const stateBody = useMemo(() => state?.body, [state?.body]);
  const [refs, setTextRef] = useState({ text: null, quill: null });
  const [textFocused, setTextFocused] = useState(false);

  const videoBodyRef = useRef();
  const placeholderRef = useRef();

  const updateBody = useCallback((body) => {
    dispatch({ func: "CHANGE_BODY", body: body.body });
  });

  useEffect(() => {
    if (!refs?.text?.contains(document.activeElement)) {
      setTextFocused(false);
    }
  }, [document.activeElement]);

  useEffect(() => {
    if (videoBodyRef.current) {
      props.setVideoBody(videoBodyRef.current);
      props.setPlaceHolder(placeholderRef.current);
    }
  }, []);

  const isValid = useMemo(
    () =>
      (!stateBody || !stateBody.ops || stateBody.ops[0].insert === "") &&
      !textFocused,
    [stateBody, textFocused, props.videoAreaFocused]
  );

  useEffect(() => {
    if (
      !props.videoAreaFocused &&
      (!stateBody || !stateBody.ops || stateBody.ops[0].insert === "")
    ) {
      setTextFocused(false);
    }
  }, [props.videoAreaFocused]);

  return (
    <div ref={videoBodyRef} style={{ position: "relative" }}>
      <Text
        body={stateBody}
        setProp={updateBody}
        setTextRef={setTextRef}
        {...props}
      />
      <StyledBodyTextArea
        ref={placeholderRef}
        onFocus={(e) => {
          e.preventDefault();
          refs.quill.focus();
          setTextFocused(true);
        }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          display: isValid ? "block" : "none",
        }}
        name="infoBoxBody"
        aria-label={props.t("InfoBox body")}
        aria-multiline="true"
        // placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  );
};

export default Body;
