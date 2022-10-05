import React, { useContext, useCallback, useRef } from "react";
import { TabContext, LayoutContext } from "../TabContext";
import { TextareaAutosize } from "@material-ui/core";
import styled from "@emotion/styled";

//Styled components for TabTitle.js
const StyledTitle = styled("div")(({ activeTab, tabIndexProp }) => ({
  backgroundColor: activeTab === tabIndexProp ? "#fff" : "#f5f5f5",
  borderStyle: "solid",
  borderColor: "#bdbdbd",
  borderWidth: activeTab === tabIndexProp ? "1px 1px 0 1px" : "1px",
  borderRadius: "10px 10px 0px 0px",
  width: "100%",
  maxWidth: "484px",
  padding: "8px 10px",
  color: activeTab === tabIndexProp ? "#232323" : "#636363",
  fontWeight: "500",
  textAlign: "center",
  "&:focus": {
    outline: "1px solid black",
    border: "1px solid black",
  },
  "&:focus-visible": {
    outline: "1px solid black",
    border: "1px solid black",
  },
}));

const StyledPlaceholder = styled("div")(({ activeTab, tabIndexProp }) => ({
  width: "100%",
  maxWidth: "484px",
  maxHeight: "50px",
  padding: "0",
  margin: "0",
  fontSize: "18px",
  wordWrap: "break-word",
  overflowX: "hidden",
  overflowY: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: activeTab == tabIndexProp ? "unset" : 2,
}));

const StyledInput = styled(TextareaAutosize)(({ activeTab, tabIndexProp }) => ({
  fontFamily: '"Inter", sans-serif',
  border: "none",
  padding: "0",
  fontSize: "18px",
  fontWeight: 500,
  width: "100%",
  minHeight: "25px",
  maxHeight: "50px",
  textAlign: "center",
  resize: "none",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  "&::-webkit-scrollbar": {
    WebkitAppearance: "none",
    width: "7px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
    WebkitBoxShadow: "0 0 1px rgba(255, 255, 255, 0.5)",
  },
  "&:disabled": {
    background: "#f5f5f5",
  },
  "&::placeholder": {
    color: activeTab === tabIndexProp && "rgba(35,35,35,1)",
  },
  "&:focus": {
    border: "none",
    outline: "none",
    "&:: placeholder": {
      color: "rgba(35, 35, 35, 0.12)",
    },
  },
}));
//Styled components end

const TabTitle = ({ tabTitle, tabPlaceholder, tabIndex, showToolbar }) => {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [state, dispatch] = useContext(LayoutContext);

  const handleTitleChange = useCallback((e) => {
    dispatch({
      func: "CHANGE_TITLE",
      title: e.target.value,
      id: e.target.dataset.id,
    });
  }, []);

  const handleTitleBlur = (e) => {
    e.target.style.overflow = "hidden";
    e.target.scrollTo(0, 0);
  };

  const inputRef = useRef();

  const handleCursorFocus = (i) => {
    inputRef.current.setSelectionRange(
      state[i].title.length,
      state[i].title.length
    );
    inputRef.current.focus();
    inputRef.current.scrollTo(state[i].title.length, state[i].title.length);
  };

  return (
    <StyledTitle
      activeTab={activeTab}
      tabIndexProp={tabIndex}
      role="tab"
      key={`tab-title-${tabIndex}`}
      tabIndex={tabIndex}
      aria-label={tabTitle}
      onFocus={() => {
        showToolbar(true);
      }}
      onClick={() => {
        setActiveTab(tabIndex);
        showToolbar(true);
      }}
      onDragEnter={(e) => {
        setActiveTab(tabIndex);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setActiveTab(tabIndex);
          showToolbar(true);
        }
      }}
    >
      {activeTab == tabIndex ? (
        <StyledInput
          activeTab={activeTab}
          tabIndexProp={tabIndex}
          placeholder={tabPlaceholder}
          aria-label="tab title input"
          aria-multiline="true"
          role={activeTab == tabIndex ? "textbox" : "tab"}
          disabled={activeTab == tabIndex ? false : true}
          minRows="1"
          maxRows="2"
          maxLength="200"
          onChange={handleTitleChange}
          onFocus={() => handleCursorFocus(tabIndex)}
          data-id={state[tabIndex].id}
          value={tabTitle.length > 0 ? tabTitle : ""}
          onBlur={handleTitleBlur}
          ref={inputRef}
        />
      ) : (
        <StyledPlaceholder
          activeTab={activeTab}
          tabIndexProp={tabIndex}
          role="tab"
        >
          {tabTitle.length > 0 ? tabTitle : tabPlaceholder}
        </StyledPlaceholder>
      )}
    </StyledTitle>
  );
};
export default TabTitle;
