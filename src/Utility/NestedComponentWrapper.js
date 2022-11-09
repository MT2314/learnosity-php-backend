import React, { useContext, useRef, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";

import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import {
  DragHandle,
  ArrowDropUp,
  ArrowDropDown,
  ContentCopy,
  DeleteOutline,
} from "@mui/icons-material";

import { LayoutContext as AccordionContext } from "../Context/InteractivesContext";
import { LayoutContext as TabContext } from "../components/Tabs/TabContext";

import DropIndicator from "./DropIndicator";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import componentIndex from "../components/componentIndex";

export const SmallIconButton = styled(IconButton)(({ draggingOver }) => ({
  color: draggingOver ? "transparent" : "#FFF",
}));

const BlueBox = styled("div")(({ draggingSelf, showSelf, hoverActive }) => ({
  outline:
    showSelf && !draggingSelf
      ? `3px solid #1466C0`
      : hoverActive && !draggingSelf
      ? `3px solid #DAE3EE`
      : null,
  borderRadius: "0rem 0.25rem 0.25rem 0.25rem",
  opacity: draggingSelf ? 0.4 : 1,
  '& [data-id="callout"]': {
    margin: 0,
  },
}));

const StyledDragHandle = styled(DragHandle)({
  color: "inherit",
});

const StaticLabel = styled("span")(
  ({ hoverActive, draggingSelf, showSelf }) => ({
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
      display: "flex",
      width: "fit-content",
      marginLeft: showSelf ? "-3px" : hoverActive ? "-4px" : "-3px",
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
  componentType,
  component,
  compIndex,
  componentProps,
  tabIndex,
  numOfComponent,
  droppedIndex,
  setDroppedIndex,
  draggingOver,
  setActiveComp,
  activeComp,
  setShowError,
  setShowDropError,
}) => {
  const dropRef = useRef(null);

  const [, dispatch] = useContext(
    componentType === "accordion" ? AccordionContext : TabContext
  );
  const [showSelf, setShowSelf] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [dropIndexOffset, setDropIndexOffset] = useState(null);
  const [tabActive, setTabActive] = useState(false);
  //get the matching component from the componentIndex
  const componentDetails = componentIndex[component.componentName];

  const { Component } = componentDetails;

  //remove active border and label if you click outside component
  useOnClickOutside(dropRef, () => {
    setShowSelf(false);
    setShowError(false);
    setShowDropError(false);
  });

  //on first click of text component the active state wrapper shows
  useEffect(() => {
    tabActive && setShowSelf(true);
  }, [tabActive]);
  //use translation to localize component name
  const { t } = useTranslation();

  //List of accepted into tab componenets
  const acceptListComp = (item) => {
    return (
      ["Text", "Table", "Video", "Image"].indexOf(item?.componentName) >= 0
    );
  };

  const [{ isOver, getItem }, drop] = useDrop({
    accept: [
      "Text",
      "Image",
      "Video",
      "Table",
      "InfoBox",
      "QuoteBox",
      "IFrame",
      "Accordion",
      "Tab",
      "section",
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

  const [{ isDragging }, drag, dragPreview] = useDrag({
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
          addRemove: true,
        });
      },
      within: true,
      new: true,
      source: "component",
      type: component.componentName,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
      droppedItem: monitor.getItem(),
    }),
  });
  //remove html5 default drag image
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [showSelf, isHover]);

  getEmptyImage(drop(dropRef));
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
      <div
        data-testid="div-before-drop-indicator"
        key={`nested-component-${compIndex}`}
        ref={dropRef}
        onMouseEnter={() => !draggingOver && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => setShowSelf(true)}
        onBlur={() => setShowSelf(false)}
        onClick={() => setShowSelf(true)}
        style={{
          paddingBottom: "0.4rem",
          paddingTop: "0.4rem",
        }}
      >
        <div>
          <DropIndicator
            data-testid="drop-indicator"
            offsetLine={dropIndexOffset}
            showLine={dropIndexOffset === 1 && isOver}
            item={getItem}
            offsetDown={-15}
            offsetUp={-1}
          />
          <ComponentLabelContainer
            showSelf={showSelf}
            hoverActive={isHover}
            data-testid="component-component-label-container"
            onDragStart={() => setShowSelf(false)}
          >
            <StaticLabel
              data-testid="static-label"
              hoverActive={isHover}
              showSelf={showSelf}
              draggingSelf={isDragging}
              isDragging={isDragging}
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
                <StyledDragHandle />
              </span>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  borderRight: showSelf && "0.5px solid rgba(13, 71, 161, 1)",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  marginRight: "5px",
                }}
                data-testid="component-label-name"
              >
                {t(component.componentName)}
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
                <ArrowDropUp fontSize="inherit" />
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
                <ArrowDropDown fontSize="inherit" />
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
              <ContentCopy fontSize="inherit" />
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
              <DeleteOutline fontSize="inherit" />
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
          {compIndex + 1 === numOfComponent && (
            <DropIndicator
              data-testid="drop-indicator"
              offsetLine={dropIndexOffset}
              showLine={dropIndexOffset === 0 && isOver}
              item={getItem}
              offsetDown={0}
              offsetUp={compIndex != numOfComponent - 1 ? 15 : 5}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NestedComponentWrapper;
