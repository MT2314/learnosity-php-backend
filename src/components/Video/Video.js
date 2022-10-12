import React from "react"
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

// Interal Imports
import TriangleIcon from "./assests/Triangle.png"

export const defaultProps = {
    id: uuidv4(),
    type: "",
    videoURL: "",
    videoDescription: "",
    videoCredit: ""
};

//styled components for Accordion styles
const StyledVideoDefaultContainer = styled("div")({
    width: "760px",
    height: "427.5px",
    backgroundColor: "#EEEEEE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});


const StyledAccordionContainer = styled("div")({
    width: "100%",
    maxWidth: "60.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

const StyledCircleContainer = styled("div")({
    width: "200px",
    height: "200px",
    outline: "5px solid #E0E0E0",
    borderRadius: "50%", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center"
})


const StyledTriangleImage = styled("img")({
    paddingLeft: "20px"
})

const Video = () => {
    return (
        <StyledAccordionContainer>
            <StyledVideoDefaultContainer >
                <StyledCircleContainer>
                    <StyledTriangleImage src={TriangleIcon} />
                </StyledCircleContainer>
            </StyledVideoDefaultContainer>
        </StyledAccordionContainer>
    )
}

export default Video