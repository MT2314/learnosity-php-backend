import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const PlaceholderContainer = styled("div")(({ isOver }) => ({
  backgroundColor: isOver ? "rgba(21, 101, 192, 0.04)" : "inherit",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "130px",
  border: "3px dashed #1565c0",
}))

const PlaceholderHover = styled(PlaceholderContainer)(({ isOver }) => ({
  backgroundColor: isOver ? "rgba(21, 101, 192, 0.04)" : "rgba(211, 47, 47, 0.04)",
  border: isOver ? "3px dashed #1565c0" : "3px dashed #D32F2F",
}))

const Title = styled("h3")(({ isOver }) => ({
  color: isOver ? "#D32F2F" : "inherit",
  fontWeight: "400",
  fontSize: "24px",
  lineHeight: "32.02px",
  margin: "0",
}))

const Paragraph = styled("p")({
  fontSize: "14px",
  marginBottom: "0",
  fontWeight: "500",
})

const SubParagraph = styled(Paragraph)({
  marginTop: "0",
  color: "#1565c0",
})
const Placeholder = ({ isOver, getItem }) => {
  const [stayHover, setStayHover] = useState()
  useEffect(() => {
    if (isOver && (getItem.componentName != 'Text' | 'Table' | 'Video' | 'Image')) {
      setStayHover(getItem.componentName);
    } else if (isOver) {
      setStayHover();
    }
  }, [isOver])

  return (
    <>
      {stayHover ?
        <PlaceholderHover isOver={!stayHover}>
          {!stayHover ? <Title>Add a component here!</Title> : <Title isOver={true}>{`Error: ${stayHover} not complatible!`}</Title>}
          <Paragraph>Drag and drop a component from the left panel or use your keyboard to insert a component.</Paragraph>
          <SubParagraph>Accepted components: text, image, chart, table, video, and audio. </SubParagraph>
        </PlaceholderHover>
        :
        <PlaceholderContainer isOver={isOver}>
          <Title>Add a component here!</Title>
          <Paragraph>Drag and drop a component from the left panel or use your keyboard to insert a component.</Paragraph>
          <SubParagraph>Accepted components: text, image, chart, table, video, and audio. </SubParagraph>
        </PlaceholderContainer>
      }
    </>
  )

}
export default Placeholder;