import React, { useState } from "react";

import Modal from "./Modal";
import TableComponent from "./TableComponent";

import styled from "@emotion/styled";

const Container = styled("button")(() => ({
  width: "968px",
  minHeight: "152px",
  background: "#FFFFFF",
  border: "none",
  outline: "none",
}));

const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const StyledButton = styled("button")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px",
  width: "151px",
  height: "42px",
  background: "#1565C0",
  borderRadius: "4px",
  color: "#FFFFFF",
  border: "none",
  outline: "none",
  cursor: "pointer",
}));

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [numberColRow, setNumberColRow] = useState([2,2]);

  const createTable = (e) => {
    setShowModal(true);
  };

  return (
    <>
    {showTable ? (<TableComponent numberColRow={numberColRow}/>) : (
      <Container>
        {showModal && <Modal setShowModal={setShowModal} setShowTable={setShowTable} setNumberColRow={setNumberColRow}/>}
        <ButtonContainer>
          <StyledButton onClick={createTable}>Create a Table</StyledButton>
        </ButtonContainer>
      </Container>
    )}
    </>
  );
};

export default Table;
