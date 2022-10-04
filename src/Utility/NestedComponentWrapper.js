import React, { useContext, useRef, useState, useEffect } from "react";
import { useDrag, useDrop, DragPreviewImage } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  LayoutContext,
  TabContext,
  ActivePaneContext,
} from "../Context/InteractivesContext";

import DropIndicator from "./DropIndicator";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import componentIndex from "../components/componentIndex";
import DragLabel from "./DragLabel";

export const SmallIconButton = styled(IconButton)(({ draggingOver }) => ({
  color: draggingOver ? "transparent" : "#ffffff",
}));

const BlueBox = styled("div")(
  ({ theme, draggingSelf, showSelf, hoverActive }) => ({
    outline:
      showSelf && !draggingSelf
        ? `3px solid #1466C0`
        : hoverActive && !draggingSelf
        ? `3px solid #DAE3EE`
        : null,
    borderRadius: "4px",
    opacity: draggingSelf ? 0.4 : 1,
    '& [data-id="callout"]': {
      margin: 0,
    },
  })
);

const DragHandle = styled(DragHandleIcon)({
  color: "inherit",
});

const StaticLabel = styled("span")(
  ({ theme, hoverActive, draggingSelf, showSelf }) => ({
    background: hoverActive && !showSelf ? "#DAE3EE" : "#1466C0",
    width: "fit-content",
    height: "100%",
    borderRadius: "4px 4px 0px 0px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    opacity: draggingSelf ? 0 : 1,
  })
);

export const ComponentLabelContainer = styled("div")(
  ({ theme, draggingSelf, showSelf, hoverActive }) => {
    const style = {
      background: showSelf && "#1466C0",
      display: draggingSelf ? "none" : "flex",
      width: "fit-content",
      marginLeft: "-3px",
      padding: "0 1px",
      color: showSelf ? "#FFF" : "#1466C0",
      borderRadius: "4px 4px 0px 0px",
      opacity: showSelf || hoverActive ? 1 : 0,
      alignItems: "center",
    };

    if (draggingSelf && !showSelf) style.opacity = 0.4;

    return style;
  }
);

const NestedComponentWrapper = ({
  component,
  compIndex,
  componentProps,
  tabIndex,
  setIsDragging,
  numOfComponent,
  inContainer,
  droppedIndex,
  setDroppedIndex,
  draggingOver,
  setActiveComp,
  activeComp,
}) => {
  const dropRef = useRef(null);

  const [, dispatch] = useContext(LayoutContext);
  const [showSelf, setShowSelf] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [dropIndexOffset, setDropIndexOffset] = useState(null);
  const [tabActive, setTabActive] = useState(false);

  const [activeTab] = useContext(ActivePaneContext);

  //get the matching component from the componentIndex
  const componentDetails = componentIndex[component.componentName];

  const { Component } = componentDetails;

  //remove active border and label if you click outside component
  useOnClickOutside(dropRef, () => setShowSelf(false));

  //on first click of text component the active state wrapper shows
  useEffect(() => {
    tabActive && setShowSelf(true);
  }, [tabActive]);

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return (
      ["Text", "Table", "Video", "Image"].indexOf(item?.componentName) >= 0
    );
  };

  const [
    { isOver, canDrop, isOverCurrent, droppedInContainer, getItem },
    drop,
  ] = useDrop({
    accept: [
      "Text",
      "Image",
      "Video",
      "Table",
      "InfoBox",
      "Tab",
      "QuoteBox",
      "IFrame",
    ],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      droppedInContainer: monitor.didDrop(),
      getItem: monitor.getItem(),
    }),
    drop: async (item, monitor) => {
      const currentTab = item?.tabIndex === tabIndex;

      const hoverIndex = currentTab
        ? dropIndexOffset === 0
          ? item.compIndex < compIndex
            ? compIndex
            : compIndex + 1
          : item.compIndex < compIndex
          ? compIndex - 1
          : compIndex
        : dropIndexOffset === 0
        ? compIndex + 1
        : compIndex;

      const dragIndex = currentTab ? item?.compIndex : undefined;

      if (acceptListComp(item)) {
        setDroppedIndex(hoverIndex);
        setDropIndexOffset(null);
        dispatch({
          func:
            item.compIndex !== undefined && currentTab
              ? "DRAG_COMPONENT"
              : "DRAG_ADD_NEW_COMPONENT",
          tabIndex: tabIndex,
          ...((item.compIndex !== undefined || !currentTab) && {
            dragIndex: dragIndex,
          }),
          hoverIndex: hoverIndex,
          ...((item.compIndex === undefined || !currentTab) && {
            component: {
              componentName: item.componentName,
              componentProps: JSON.parse(item?.componentProps),
            },
          }),
        });
        !currentTab && item?.delete && item?.delete();
      }
    },
    canDrop: (item) => {
      if (
        item.compIndex === compIndex &&
        item?.within &&
        item.tabIndex === tabIndex
      ) {
        return false;
      }

      return true;
    },

    hover: (item, monitor) => {
      // Only show highlights if it's a droppable region (not the item itself, not one of the regions that means the index won't change to prevent meaningless mutations)
      if (!monitor.canDrop()) return;
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (hoverClientY > hoverMiddleY) {
        setDropIndexOffset(0);

        return;
      }
      // Dragging upwards
      if (hoverClientY < hoverMiddleY) {
        setDropIndexOffset(1);

        return;
      }

      setDropIndexOffset(null);
    },
  });

  const [{ isDragging, didDrop, droppedItem }, drag, dragPreview] = useDrag({
    type: component.componentName,
    item: () => ({
      componentName: component.componentName,
      componentProps: JSON.stringify(componentProps),
      compIndex,
      tabIndex,
      delete: () => {
        dispatch({
          func: "DELETE_COMPONENT",
          tabIndex,
          compIndex,
        });
      },
      within: true,
      new: true,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
      droppedItem: monitor.getItem(),
    }),
  });

  drop(dropRef);

  //remove html5 default drag image
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  useEffect(() => {
    droppedIndex === compIndex && (setShowSelf(true), setDroppedIndex(null));
  }, [droppedIndex]);

  useEffect(() => {
    if (activeComp !== null) {
      activeComp === compIndex
        ? (setShowSelf(true), setActiveComp(null))
        : (setShowSelf(false), setTabActive(false));
    }
  }, [activeComp]);

  return (
    <>
      <DragLabel />
      <div
        data-test-id="div-before-drop-indicator"
        key={`nested-component-${compIndex}`}
        ref={dropRef}
        onMouseEnter={() => !draggingOver && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => setShowSelf(true)}
        onBlur={() => setShowSelf(false)}
        onClick={() => setShowSelf(true)}
      >
        <div>
          <DropIndicator
            data-test-id="drop-indicator"
            offsetLine={dropIndexOffset}
            showLine={dropIndexOffset === 1 && isOver}
            item={getItem}
            offsetDown={-15}
            offsetUp={-1}
          />
          <ComponentLabelContainer
            showSelf={showSelf}
            draggingSelf={isDragging}
            hoverActive={isHover}
            data-testid="component-component-label-container"
          >
            <StaticLabel
              data-testid="static-label"
              hoverActive={isHover}
              showSelf={showSelf}
              draggingSelf={isDragging}
            >
              <span
                ref={drag}
                data-testid="component-drag"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  cursor: "move",
                  padding: "3px  0",
                  paddingLeft: "5px",
                }}
              >
                <DragHandle />
              </span>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  borderRight: showSelf && "0.5px solid #FFF",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  marginRight: "5px",
                }}
                data-testid="component-label-name"
              >
                {component.componentName}
              </Typography>
            </StaticLabel>
            {compIndex !== 0 && (
              <SmallIconButton
                onClick={() => {
                  setShowSelf(false);
                  dispatch({
                    func: "MOVE_COMPONENT_UP",
                    compIndex: compIndex,
                    tabIndex: tabIndex,
                  });
                  setActiveComp(compIndex - 1);
                }}
                data-testid="move-up-button"
                aria-label={"Move Component Up"}
                size="small"
                draggingSelf={isDragging}
                draggingOver={draggingOver}
              >
                <ArrowDropUpIcon fontSize="inherit" />
              </SmallIconButton>
            )}
            {compIndex != numOfComponent - 1 && (
              <SmallIconButton
                onClick={() => {
                  setShowSelf(false);
                  dispatch({
                    func: "MOVE_COMPONENT_DOWN",
                    compIndex: compIndex,
                    tabIndex: tabIndex,
                  });
                  setActiveComp(compIndex + 1);
                }}
                data-testid="move-down-button"
                aria-label={"Move Component Down"}
                size="small"
                draggingSelf={isDragging}
                draggingOver={draggingOver}
              >
                <ArrowDropDownIcon fontSize="inherit" />
              </SmallIconButton>
            )}

            <SmallIconButton
              onClick={() => {
                dispatch({
                  func: "DUPLICATE_COMPONENT",
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                });
              }}
              data-testid="duplicate-component-button"
              aria-label={"Duplicate Component AriaLabel"}
              size="small"
              sx={{ fontSize: "0.9em" }}
              draggingSelf={isDragging}
              draggingOver={draggingOver}
            >
              <ContentCopyIcon fontSize="inherit" />
            </SmallIconButton>
            <SmallIconButton
              onClick={() => {
                dispatch({
                  func: "DELETE_COMPONENT",
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                });
              }}
              data-testid="delete-component-button"
              aria-label={"Delete Component AriaLabel"}
              size="small"
              draggingSelf={isDragging}
              draggingOver={draggingOver}
            >
              <DeleteOutlineIcon fontSize="inherit" />
            </SmallIconButton>
          </ComponentLabelContainer>
          <BlueBox
            showSelf={showSelf}
            hoverActive={isHover}
            draggingSelf={isDragging}
          >
            <Component
              {...componentProps}
              role="listitem"
              setTabActive={setTabActive}
              setActiveComp={setActiveComp}
              setProp={(stateUpdate) => {
                dispatch({
                  func: "UPDATE_COMPONENT",
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                  stateUpdate: stateUpdate,
                });
              }}
            />
          </BlueBox>
          <DropIndicator
            data-test-id="drop-indicator"
            offsetLine={dropIndexOffset}
            showLine={dropIndexOffset === 0 && isOver}
            item={getItem}
            offsetDown={0}
            offsetUp={15}
          />
        </div>
      </div>
    </>
  );
};

export default NestedComponentWrapper;
