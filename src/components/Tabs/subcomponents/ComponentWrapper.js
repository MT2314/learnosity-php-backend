import React, { useContext, useRef, useState, useEffect } from 'react';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';

import styled from '@emotion/styled';
import { IconButton, Typography } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { LayoutContext } from '../TabContext';

import textDnd from '../../../Icons/dndIcons/textDnd.png';
import defaultDnd from '../../../Icons/dndIcons/defaultDnd.png';

import TabComponent from './TabComponent';
export const SmallIconButton = styled(IconButton)(() => ({
  color: '#FFF',
}));
const BlueBox = styled('div')(({ theme, draggingSelf, showSelf }) => ({
  outline: showSelf ? `3px solid #1466C0` : null,
  borderRadius: '4px',
  opacity: draggingSelf ? 0.4 : 1,
  '& [data-id="callout"]': {
    margin: 0,
  },
}));

const DragHandle = styled(DragHandleIcon)({
  color: 'inherit',
});

export const ComponentLabelContainer = styled('div')(
  ({ theme, draggingSelf, showSelf }) => {
    const style = {
      background: '#1466C0',
      width: 'fit-content',
      marginLeft: '-3px',
      color: '#FFF',
      borderRadius: '4px 4px 0px 0px',
      opacity: showSelf ? 1 : 0,
      display: 'flex',
      alignItems: 'center',
    };

    if (draggingSelf && !showSelf) style.opacity = 0.4;

    return style;
  }
);

const ComponentWrapper = ({
  component,
  compIndex,
  tabIndex,
  setIsDragging,
  numOfComponent,
}) => {
  const ref = useRef(null);

  const [, dispatch] = useContext(LayoutContext);
  const [showSelf, setShowSelf] = useState(false);
  const [active, setActive] = useState(false);

  const [{ isOver, canDrop, isOverCurrent }, drop] = useDrop({
    accept: ['Text', 'Image', 'Video', 'Table'],
    hover(item) {
      if (!ref.current) {
        return;
      }

      if (item.compIndex !== undefined) {
        const dragIndex = item?.compIndex;
        const hoverIndex = compIndex;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({
          func: 'DRAG_COMPONENT',
          tabIndex: tabIndex,
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
        });
        item.compIndex = hoverIndex;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: component.componentName,
    item: {
      componentName: component.componentName,
      compIndex: compIndex,
      within: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging]);

  drop(ref);

  return (
    <>
      <DragPreviewImage
        connect={dragPreview}
        src={component.componentName.includes('Text') ? textDnd : defaultDnd}
      />
      <div
        ref={ref}
        onMouseEnter={() => setShowSelf(true)}
        onMouseLeave={() => setShowSelf(false)}
      >
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
                    func: 'MOVE_COMPONENT_UP',
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
                    func: 'MOVE_COMPONENT_DOWN',
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
            )}

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
