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


const StyledVideoContainer = styled("div")({
    width: "100%",
    maxWidth: "60.5rem",
    display: "flex",
    marginLeft: "104px", 
    marginRight: "104px"
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

const StyledVideoDescriptionContainer = styled("div")({
    marginTop: "15px",
    display: "flex",
    gap: "30px", 
    marginBottom: "30px"
})

const DescriptionCreditContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "10px"
})

const TranscriptButtonContainer = styled("button")({
    padding: "7px 12.5px !important",
    backgroundColor: "#EBEBEB",
    border: "none",
    borderRadius: "16px", 
    height: "32px", 
    fontWeight: "400", 
    fontSize: "13px",
    textAlign: "center", 
    color: "#929292"
})

const DescriptionInput = styled("input")({
    width: "622px", 
    border: "none", 
    fontFamily: "Inter", 
    fontWeight: "400", 
    letterSpacing: "0.4px", 
    "&::placeholder": {
        color: "#232323"
    }
})

const CreditInpput = styled("input")({
    width: "622px", 
    border: "none", 
    height: "16px", 
    fontFamily: "Inter", 
    fontWeight: "400",
    fontSize: "12px", 
    fontStyle: "italic", 
    "&::placeholder": {
        color: "#636363"
    }
})

const Video = () => {
    return (
        <>
            <StyledVideoContainer>
                <StyledVideoDefaultContainer >
                    <StyledCircleContainer>
                        <StyledTriangleImage src={TriangleIcon} />
                    </StyledCircleContainer>
                </StyledVideoDefaultContainer>
            </StyledVideoContainer>
            <StyledVideoContainer>
                <StyledVideoDescriptionContainer>
                    <DescriptionCreditContainer>
                        <DescriptionInput type="text" placeholder="Video Description" />
                        <CreditInpput type="text" placeholder="Credit" />
                    </DescriptionCreditContainer>
                    <TranscriptButtonContainer>No Transcript</TranscriptButtonContainer>
                </StyledVideoDescriptionContainer>
            </StyledVideoContainer>
        </>
    )
}

export default Video