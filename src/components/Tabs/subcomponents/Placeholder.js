import React from "react"
import styled from '@emotion/styled'

const PlaceholderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '130px',
  border: '3px dashed #1565c0',
})

const Title = styled('h3')({
  fontWeight: '400',
  fontSize: '24px',
  lineHeight: '32.02px',
  margin: '0',
})

const Text = styled('p')({
  fontSize: '14px',
  marginBottom: '0',
  fontWeight: '500',
})

const SubText = styled(Text)({
  marginTop: 0,
  color: '#1565c0',
})

const Placeholder = () => { 
  return(
    <PlaceholderContainer>
      <Title>Add a component here!</Title>
      <Text>Drag and drop a component from the left panel or use your keyboard to insert a component.</Text>
      <SubText>Accepted components: text, image, chart, table, video, and audio. </SubText>
    </PlaceholderContainer>
  )

}  
export default Placeholder;