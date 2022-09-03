import React from "react";
import styled from "@emotion/styled";

//error style message
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Paragraph = styled("p")({
  display: "flex",
  alignItems: "center",
  padding: "6px 16px",
  margin: "15px 0 -10px 0",
  backgroundColor: "rgba(211, 47, 47, 0.04)",
  color: "#d32f2f",
  lineHeight: "143%",
});


const PlaceholderError = ({ showError }) => {
  return (
    <>
      {showError && 
        <Paragraph>
          <ErrorOutlineIcon /> &nbsp; Error: component is not compatible.
          Only text, image, chart, table, video, and audio.
        </Paragraph>
      }
    </>
  );
};
export default PlaceholderError;
