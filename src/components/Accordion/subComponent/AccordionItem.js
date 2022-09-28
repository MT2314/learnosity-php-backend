import React from "react";
import PlaceHolder from "../subComponent/PlaceHolder";
import styled from "@emotion/styled";

const StyledAccordionItemContainer = styled("div")({
  border: "0.0625rem solid #BDBDBD",
  borderTop: "none",
});

const AccordionItem = ({ accordion, accordionIndex }) => {
  return (
    <>
      <PlaceHolder />
    </>
  );
};

export default AccordionItem;
