import React from "react";
import styled from "@emotion/styled";

const PlaceholderStyle = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "130px",
})

const PlaceholderContainer = styled(PlaceholderStyle)(({ isOver }) => ({
  backgroundColor: isOver ? "rgba(21, 101, 192, 0.04)" : "inherit",
  border: "3px dashed #1565c0",
}))

const PlaceholderContainerIncorrect = styled(PlaceholderStyle)(({ isOver }) => ({
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
  return (
    <>
      {isOver ?
        <PlaceholderContainerIncorrect isOver={getItem.componentName === 'Text' | 'Table' | 'Video' | 'Image'}>
          {getItem.componentName === 'Text' | 'Table' | 'Video' | 'Image' ? <Title>Add a component here!</Title> : <Title isOver={true}>{`Error: ${getItem.componentName} not complatible!`}</Title>}
          <Paragraph>Drag and drop a component from the left panel or use your keyboard to insert a component.</Paragraph>
          <SubParagraph>Accepted components: text, image, chart, table, video, and audio. </SubParagraph>
        </PlaceholderContainerIncorrect>
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