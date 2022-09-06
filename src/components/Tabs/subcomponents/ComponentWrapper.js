import React, { useContext, useRef, useState, useEffect } from "react";
import { useDrag, useDrop, DragPreviewImage } from "react-dnd";

import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { LayoutContext } from "../TabContext";

import textDnd from "../../../Icons/dndIcons/textDnd.png";
import defaultDnd from "../../../Icons/dndIcons/defaultDnd.png";
import DropIndicator from "../../../Utility/DropIndicator";

import TabComponent from "./TabComponent";

export const SmallIconButton = styled(IconButton)(() => ({
  color: "#FFF",
}));

const BlueBox = styled("div")(({ theme, draggingSelf, showSelf }) => ({
  outline: showSelf ? `3px solid ${theme.palette.secondary.main}` : null,
  borderRadius: "4px",
  opacity: draggingSelf ? 0.4 : 1,
  '& [data-id="callout"]': {
    margin: 0,
  },
}));

const DragHandle = styled(DragHandleIcon)({
  color: "inherit",
});

export const ComponentLabelContainer = styled("div")(
  ({ theme, draggingSelf, showSelf }) => {
    const style = {
      background: "#1466C0",
      width: "fit-content",
      marginLeft: "-3px",
      color: "#FFF",
      borderRadius: "4px 4px 0px 0px",
      opacity: showSelf ? 1 : 0,
      display: "flex",
      alignItems: "center",
    };

    if (draggingSelf && !showSelf) style.opacity = 0.4;

    return style;
  }
);

const ComponentWrapper = ({
  component,
  compIndex,
  componentProps,
  tabIndex,
  setIsDragging,
  numOfComponent,
}) => {
  const dropRef = useRef(null);

  const [, dispatch] = useContext(LayoutContext);
  const [showSelf, setShowSelf] = useState(false);
  const [dropIndexOffset, setDropIndexOffset] = useState(null);

  // !WIP - needed to drag and drop outside of Tabs
  // const prevNumOfComponent = usePrevious(numOfComponent);

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
      "Callout",
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
      const hoverIndex =
        dropIndexOffset === 0
          ? item.compIndex < compIndex
            ? compIndex
            : compIndex + 1
          : item.compIndex < compIndex
          ? compIndex - 1
          : compIndex;

      const dragIndex = item?.compIndex;

      if (acceptListComp(item)) {
        dispatch({
          func:
            item.compIndex !== undefined
              ? "DRAG_COMPONENT"
              : "DRAG_ADD_NEW_COMPONENT",
          tabIndex: tabIndex,
          ...(item.compIndex !== undefined && { dragIndex: dragIndex }),
          hoverIndex: hoverIndex,
          ...(item.compIndex === undefined && {
            component: {
              componentName: item.componentName,
              componentProps: JSON.parse(item?.componentProps),
            },
          }),
        });
      }
    },
    canDrop: (item) => {
      if (item.compIndex === compIndex) return false;

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
      compIndex: compIndex,
      within: true,
      //new: true, - !!WIP - Allow components to be dragged and dropped outside Tabs
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
      droppedItem: monitor.getItem(),
    }),
  });

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging]);

  drop(dropRef);

  /* !!WIP - Remove the component if it was dropped outside of the container 
   useEffect(() => {
     if (
       didDrop &&
       prevNumOfComponent === numOfComponent &&
       droppedItem?.within &&
       !droppedInContainer
     ) {
       console.log("Running");
       dispatch({
         func: "DELETE_COMPONENT",
         tabIndex: tabIndex,
         compIndex: compIndex,
       });
     }
   }, [didDrop]);
  */

  return (
    <>
      <DragPreviewImage
        connect={dragPreview}
        src={component.componentName.includes("Text") ? textDnd : defaultDnd}
      />
      <div
        data-test-id="div-before-drop-indicator"
        ref={dropRef}
        onMouseEnter={() => setShowSelf(true)}
        onMouseLeave={() => setShowSelf(false)}
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
          <ComponentLabelContainer showSelf={showSelf}>
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
                borderRight: "0.5px solid #FFF",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginRight: "5px",
              }}
              data-testid="component-label-name"
            >
              {component.componentName}
            </Typography>
            {compIndex !== 0 && (
              <SmallIconButton
                onClick={() => {
                  dispatch({
                    func: "MOVE_COMPONENT_UP",
                    compIndex: compIndex,
                    tabIndex: tabIndex,
                  });
                }}
                data-testid="move-up-button"
                aria-label={"Move Component Up"}
                size="small"
              >
                <ArrowDropUpIcon fontSize="inherit" />
              </SmallIconButton>
            )}
            {compIndex != numOfComponent - 1 && (
              <SmallIconButton
                onClick={() => {
                  dispatch({
                    func: "MOVE_COMPONENT_DOWN",
                    compIndex: compIndex,
                    tabIndex: tabIndex,
                  });
                }}
                data-testid="move-down-button"
                aria-label={"Move Component Down"}
                size="small"
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
            >
              <DeleteOutlineIcon fontSize="inherit" />
            </SmallIconButton>
          </ComponentLabelContainer>
          <BlueBox showSelf={showSelf}>
            <TabComponent
              key={`key-component-${compIndex}`}
              component={component}
              compIndex={compIndex}
              tabIndex={tabIndex}
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

/* WIP - Needed for Drag and Drop outside of Tabs
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
*/

export default ComponentWrapper;
