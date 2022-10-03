import React from "react";
import styled from "@emotion/styled";
import { useDragLayer } from "react-dnd";
import { useTranslation, Trans } from "react-i18next";
import "../Icons/componentIcons/Vector.svg"

const StyledLabel = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  height: '64px',
  padding: '18px 20px 17px 20px',
  background: '#FFFFFF',
  border: '3px solid #1565C0',
  borderRadius: '4px',
}));

const StyledTypography = styled('p')(({ theme }) => ({
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '160%',
  letterSpacing: '0.15px',
  color: '#000000',
  margin: '0px 0px 0px 10px',
}))

const StyledlayerStyles = styled('div')(() => ({
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
}));



const DragLabel = () => {

  const {
    item,
    isDragging,
    initialCursorOffset,
    initialFileOffset,
    currentFileOffset, } = useDragLayer(
      monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialCursorOffset: monitor.getInitialClientOffset(),
        initialFileOffset: monitor.getInitialSourceClientOffset(),
        currentFileOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
      }))

  const { t } = useTranslation();

  if (!isDragging) {
    return null;
  }

  return (
    <StyledlayerStyles>
      <div
        style={getItemStyles(
          initialCursorOffset,
          initialFileOffset,
          currentFileOffset
        )}
      >
        <div>
          <StyledLabel>
            <svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0.5H0V2.5H16V0.5ZM0 6.5H16V4.5H0V6.5Z" fill="#232323" />
            </svg>
            <StyledTypography>{t(item.componentName)}</StyledTypography>
          </StyledLabel>
        </div>
      </div>
    </StyledlayerStyles>
  );


  function getItemStyles(
    initialCursorOffset,
    initialOffset,
    currentOffset,
  ) {
    if (!initialOffset || !currentOffset || !initialCursorOffset) {
      return {
        display: "none",
      };
    }

    const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x);
    const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y);
    const transform = `translate(${x}px, ${y}px)`;

    return {
      transform,
      WebkitTransform: transform,
    };
  }
}
export default DragLabel;