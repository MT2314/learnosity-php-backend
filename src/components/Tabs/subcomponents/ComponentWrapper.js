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
import { resolveComponentProps } from "@mui/base";
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
      background: theme.palette.secondary.main,
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
  numOfComponent
}) => {
  const dropRef = useRef(null);

  console.log(`componentProps:`, componentProps);

  const [, dispatch] = useContext(LayoutContext);
  const [showSelf, setShowSelf] = useState(false);
  const [dropIndexOffset, setDropIndexOffset] = useState(0);
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [active, setActive] = useState(false);

  const [{ isOver, canDrop, isOverCurrent }, drop] = useDrop({
    accept: ["Text", "Image", "Video", "Table"],
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop: async (item, monitor) => {
      console.log('dropped:',item)
      dispatch({
        func: "DRAG_COMPONENT",
        tabIndex: tabIndex,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
      item.compIndex = hoverIndex;
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
      if (hoverClientY < hoverMiddleY) {
        setDropIndexOffset(0);
        return;
      }
      // Dragging upwards
      if (hoverClientY > hoverMiddleY) {
        setDropIndexOffset(1);
      }

      if (!ref.current) {
        return;
      }

      if (item.compIndex !== undefined) {
        setDragIndex(item?.compIndex);
        setHoverIndex(compIndex);

        if (dragIndex === hoverIndex) {
          return;
        }
      }
    },

  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: component.componentName,
    item: () => ({
      componentName: component.componentName,
      compIndex: compIndex,
      ...componentProps,
      within: true,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragPreview(drop(dropRef));

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging]);


  return (
    <>
      <DragPreviewImage
        connect={dragPreview}
        src={component.componentName.includes('Text') ? textDnd : defaultDnd}
      />
      <div
      data-test-id='div-before-drop-indicator'
        ref={dropRef}
        onMouseEnter={() => setShowSelf(true)}
        onMouseLeave={() => setShowSelf(false)}
      >
        <DropIndicator
          data-test-id='drop-indicator'
          offsetLine={dropIndexOffset}
          showLine={isOver && canDrop && isOverCurrent}
          offsetDown={0}
          offsetUp={-1}
        />
        <div>
          <ComponentLabelContainer showSelf={showSelf}>
            <span
              ref={drag}
              data-testid="component-drag"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                cursor: 'move',
                padding: '3px  0',
                paddingLeft: '5px',
              }}
            >
              <DragHandle />
            </span>
            <Typography
              variant="body2"
              component="span"
              sx={{
                borderRight: '0.5px solid #FFF',
                paddingRight: '10px',
                paddingLeft: '10px',
                marginRight: '5px',
              }}
              data-testid="component-label-name"
            >
              {component.componentName}
            </Typography>
            {compIndex !== 0 && (
              <SmallIconButton
                onClick={() => {
                  dispatch({
                    func: 'MOVE_COMPONENT_LEFT',
                    compIndex: compIndex,
                    tabIndex: tabIndex,
                  });
                }}
                data-testid="move-up-button"
                aria-label={'Move Component Up'}
                size="small"
              >
                <ArrowDropUpIcon fontSize="inherit" />
              </SmallIconButton>
            )}
            {compIndex != numOfComponent - 1 && (
              <SmallIconButton
                onClick={() => {
                  dispatch({
                    func: "MOVE_COMPONENT_RIGHT",
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
                  func: 'MOVE_COMPONENT_RIGHT',
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                });
              }}
              data-testid="move-down-button"
              aria-label={'Move Component Down'}
              size="small"
            >
              <ArrowDropDownIcon fontSize="inherit" />
            </SmallIconButton>
            <SmallIconButton
              onClick={() => {
                dispatch({
                  func: 'DUPLICATE_COMPONENT',
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                });
              }}
              data-testid="duplicate-component-button"
              aria-label={'Duplicate Component AriaLabel'}
              size="small"
              sx={{ fontSize: '0.9em' }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </SmallIconButton>
            <SmallIconButton
              onClick={() => {
                dispatch({
                  func: 'DELETE_COMPONENT',
                  compIndex: compIndex,
                  tabIndex: tabIndex,
                });
              }}
              data-testid="delete-component-button"
              aria-label={'Delete Component AriaLabel'}
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
        </div>
      </div>
    </>
  );
};

export default ComponentWrapper;
