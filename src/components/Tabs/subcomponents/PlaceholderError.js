import React from "react";
import styled from "@emotion/styled";

//error style message
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Paragraph = styled("p")({
  display: "flex",
  alignItems: "center",
  height: "48px",
  margin: "0px",
  padding: "15px 17px",
  backgroundColor: "rgba(211, 47, 47, 0.04)",
  color: "#d32f2f",
  lineHeight: "143%",
});

const PlaceholderError = ({ showError }) => {
  return (
    <>
      {showError && (
        <Paragraph>
          <ErrorOutlineIcon sx={{ marginRight: "15px" }} />
          Error: component not compatible. Only text, image, chart, table,
          video, and audio are allowed.
        </Paragraph>
      )}
    </>
  );
};
export default PlaceholderError;
