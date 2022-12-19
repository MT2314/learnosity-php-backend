import React, { useState, useContext, useEffect } from "react";
import { LayoutContext } from "../TableContext";

import Modal from "./Modal";
import TableComponent from "./TableComponent";

import styled from "@emotion/styled";

import { useTranslation } from "react-i18next";

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

const Table = ({ tableId }) => {
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useContext(LayoutContext);
  const { t } = useTranslation();

  const createTable = (e) => {
    setShowModal(true);
  };

  return (
    <>
      {state.data.length !== 0 ? (
        <TableComponent tableId={tableId} t={t} />
      ) : (
        <>
          {showModal && <Modal setShowModal={setShowModal} t={t} />}
          <Container>
            <ButtonContainer>
              <StyledButton
                onClick={createTable}
                data-testid="create-a-table-button"
              >
                {t("Create a table")}
              </StyledButton>
            </ButtonContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default Table;
