import React, { useState, useEffect, useRef } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tooltip } from "@material-ui/core";

import styled from "@emotion/styled";

import "../styles/ListDropdownButton.scss";
import icons from "../assets/icons";

import {
  useShowLink,
  useSetShowLink,
  useQuill,
  useEditorPos,
  useUniqueId,
  useLinkRange,
  useSetLinkRange,
  useEditLink,
  useSetEditLink,
  useSetKeepEditor,
} from "../Provider";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const MainContainer = styled("div")(({ bounds }) => ({
  position: "absolute",
  width: "248px",

  zIndex: 4,

  top: bounds.top + 20,
  left: bounds.left,
}));

const Container = styled("div")(({ bounds }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "space-between",
  padding: "5px 0px",
  lineHeight: "normal",
  width: "248px",
  height: "40px",

  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
}));

const StyledInput = styled("input")(({ error }) => ({
  width: "160px",
  height: "12px",
  lineHeight: "12px !important",
  margin: "6px 8px",
  padding: "10px",
  border: "none",
  outline: "none",
  color: error ? "red" : "black",
}));

const ErrorText = styled("span")({
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "20px",
  marginTop: "4px",
});

const ApplyButton = styled("button")(({ disable }) => ({
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "13px",
  height: "30px",

  marginLeft: "14px",

  border: "none",
  backgroundColor: "transparent",
  outline: "none",
  borderRadius: "4px",
  color: !disable ? "rgba(21, 101, 192, 1)" : "rgba(21, 101, 192, 0.5)",

  cursor: !disable ? "pointer" : "default",
  "&:hover": {
    backgroundColor: !disable ? "rgba(21, 101, 192, 0.1)" : "transparent",
  },
}));

const ErrorMessage = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "248px",
  height: "30px",

  background:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #D32F2F",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
});

const StyledLink = styled("a")({
  display: "inline-block",
  minWidth: "160px",
  maxWidth: "200px",
  backgroundColor: "#FFFFFF",
  overflowX: "clip",
  textOverflow: "ellipsis",
  verticalAlign: "top",
  whiteSpace: "nowrap",

  height: "20px",
  margin: "6px 4px 6px 10px",

  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",

  textDecorationLine: "underline",

  color: "#1565C0",
});

const linkValidityRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|[a-zA-Z0-9-]+[a-zA-Z0-9]?\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const LinkDialog = () => {
  const showLink = useShowLink();
  const setShowLink = useSetShowLink();
  const quill = useQuill();
  const linkRange = useLinkRange();
  const setLinkRange = useSetLinkRange();
  const editLink = useEditLink();
  const setEditLink = useSetEditLink();
  const setKeepEditor = useSetKeepEditor();
  const uniqueId = useUniqueId();

  const [bounds, setBounds] = useState(null);
  const [hasLink, setHasLink] = useState(false);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState(false);
  const [value, setValue] = useState("");
  const [remove, setRemove] = useState(false);

  const [scrollTop, setScrollTop] = useState(null);

  const containerRef = useRef(null);

  const reset = () => {
    setShowLink(false);
    !hasLink &&
      quill.formatText(linkRange.index, linkRange.length, "background", false);

    quill.focus();
    quill.scrollingContainer.scrollTop = scrollTop;
    quill.setSelection(linkRange.index, linkRange.length);

    setRemove(false);
    setHasLink(false);
    setBounds(null);
    setError(false);
    setEditLink(null);
    setKeepEditor(false);
    setValue("");
    setScrollTop(null);
  };

  useOnClickOutside(containerRef, () => {
    remove &&
      quill.formatText(
        parseInt(editLink.index),
        editLink.text.length,
        "link",
        false
      );

    reset();
  });

  useEffect(() => {
    console.log("SHOW LINK");
    if (showLink) {
      setScrollTop(quill.scrollingContainer.scrollTop);
      setKeepEditor(true);
      !hasLink &&
        quill.formatText(
          linkRange.index,
          linkRange.length,
          "background",
          "#cce0f5"
        );

      console.log("SCROLL TOP ", quill.scrollingContainer.scrollTop);
      const range = quill.getSelection();
      const index = hasLink ? parseInt(editLink?.index) : range?.index;

      !isNaN(index) && setBounds(quill.getBounds(index));
    } else {
      setRemove(false);
      setHasLink(false);
      setBounds(null);
      setError(false);
      setEditLink(null);
      setKeepEditor(false);
      setValue("");
    }
  }, [showLink]);

  useEffect(() => {
    if (editLink?.link && editLink?.link !== "null") {
      setHasLink(true);
      setShowLink(true);
      setPreview(true);
    } else {
      setHasLink(false);
      setShowLink(false);
      setPreview(false);
      setValue("");
    }
  }, [editLink]);

  useEffect(() => {
    if (!preview) {
      setValue(editLink?.link);
      setDisable(false);
    }
  }, [preview]);

  useEffect(() => {
    remove && setValue(null);
  }, [remove]);

  useEffect(() => {
    value ? setDisable(false) : setDisable(true);
  }, [value]);

  const handleApply = (e) => {
    if (disable) return;
    if (value === "") return;
    if (value.match(linkValidityRegex)) {
      let newValue = value;
      // If no http or https scheme is specified
      if (
        newValue.indexOf("http://") === -1
          ? newValue.indexOf("https://") === -1
          : newValue.indexOf("https://") !== -1
      ) {
        // If www. is and isn't within url => http://www.
        newValue.indexOf("www.") !== -1
          ? (newValue = newValue.replace("www.", "http://www."))
          : (newValue = newValue.replace(/^/, "http://www."));
      }
      if (
        newValue.indexOf("http://") !== -1 ||
        newValue.indexOf("https://") !== -1
      ) {
        if (newValue.indexOf("www.") === -1) {
          newValue = newValue.replace("://", "://www.");
        }
      }

      hasLink
        ? quill.formatText(
            parseInt(editLink.index),
            editLink.text.length,
            "link",
            newValue
          )
        : quill.formatText(linkRange.index, linkRange.length, "link", newValue);

      reset();
    } else {
      setError(true);
      return;
    }
  };

  const handleInputChange = (e) => {
    setError(false);
    setValue(e.target.value);
    e.target.value.length === 0 ? setDisable(true) : setDisable(false);
  };

  return (
    <>
      {showLink && bounds && (
        <MainContainer bounds={bounds} ref={containerRef}>
          <Container>
            {preview ? (
              <PreviewLink
                link={editLink.link}
                setPreview={setPreview}
                setRemove={setRemove}
              />
            ) : (
              <EditLink
                error={error}
                handleInputChange={handleInputChange}
                handleApply={handleApply}
                disable={disable}
                value={value}
              />
            )}
          </Container>
          {error && (
            <ErrorMessage>
              <ErrorOutlineIcon
                color="error"
                fontSize="small"
                sx={{
                  marginTop: "4px",
                  marginRight: "12px",
                  marginLeft: "12px",
                }}
              />
              <ErrorText>Invalid URL</ErrorText>
            </ErrorMessage>
          )}
        </MainContainer>
      )}
    </>
  );
};

const PreviewLink = ({ link, setPreview, setRemove }) => {
  return (
    <>
      <StyledLink href={link} target="_blank">
        {link}
      </StyledLink>
      <Tooltip arrow title="edit link" placement="top">
        <button
          aria-label="edit link"
          className="pencil"
          onClick={() => {
            setPreview(false);
          }}
        >
          {icons["pencil"]}
        </button>
      </Tooltip>
      <Tooltip
        aria-label="delete link"
        title="delete link"
        placement="top"
        arrow
      >
        <button
          aria-label="delete link"
          className="trashcan"
          onClick={() => {
            setPreview(false);
            setRemove(true);
          }}
        >
          {icons["trashcan"]}
        </button>
      </Tooltip>
    </>
  );
};

const EditLink = ({
  error,
  handleInputChange,
  handleApply,
  disable,
  value,
}) => {
  const applyProps = {
    title: "apply link",
    placement: "top",
    disableHoverListener: disable,
    disableFocusListener: disable,
    arrow: true,
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      if (value !== null) {
        inputRef.current.focus();
      }
    }
  }, []);

  return (
    <>
      <StyledInput
        ref={inputRef}
        error={error}
        placeholder={"Paste a link"}
        value={value || ""}
        onInput={handleInputChange}
        onFocus={(e) => {
          const target = e.target;
          setTimeout(() => target.select(), 0);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            handleApply(e);
          }
        }}
      />

      <Tooltip {...applyProps}>
        <ApplyButton
          onClick={handleApply}
          disable={disable}
          aria-label="apply link"
          className="apply"
        >
          Apply
        </ApplyButton>
      </Tooltip>
    </>
  );
};

export default LinkDialog;
