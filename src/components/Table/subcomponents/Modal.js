import React from "react";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Container = styled("div")(() => ({
  position: "fixed",
  top: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,

  width: "272px",
  height: "341px",
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  borderTop: "4px solid #1565C0",
}));

const HeaderContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "space-between",
  padding: "16px",
  borderBottom: "1px solid #E0E0E0",
}));

const SelectContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
}));
const FormatContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
}));

const SelectFormat = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  marginLeft: "4px",
  marginTop: "8px",

  "& label": {
    marginLeft: "8px",
  },
}));

const FooterContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "24px",
}));

const StyledCreateButton = styled("button")(() => ({
  border: "none",
  outline: "none",
  background: "none",
  cursor: "pointer",
  height: "24px",
  fontFamily: "'Inter'",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0.4px",
  color: "#1565C0",
}));

const Modal = ({ setShowModal, setShowTable, setNumberColRow }) => {
  const [numberRow, setNumberRow] = React.useState(2);
  const [numberCol, setNumberCol] = React.useState(2);
  const closeModal = (e) => {
    setShowModal(false);
  };
  const createTable = (e) => {
    const numberRowStore = []
    const numberColStore = []

    for (let i = 0; i < numberRow; i++) {
      numberRowStore.push({id: i})
    }

    for (let i = 0; i < numberCol; i++) {
      numberColStore.push({
        accessorKey: "Name",
        id: "Name",
        header: "Name",
      })
    }

    setNumberColRow([numberRowStore, numberColStore])
    setShowTable(true);
  };
  return (
    <Container>
      <HeaderContainer>
        <span>Create a table</span>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={closeModal} />
      </HeaderContainer>
      <SelectContainer>
        <div>
          <span>Columns</span>
          <SelectNumber number={numberCol} setNumber={setNumberCol}/>
        </div>
        <div>
          <span>Rows</span>
          <SelectNumber number={numberRow} setNumber={setNumberRow}/>
        </div>
      </SelectContainer>
      <FormatContainer>
        <span>Table Format</span>
        <SelectFormat>
          <input type="radio" name="select-radio-header" id="top-header" />
          <label for="top-header">Top header</label>
        </SelectFormat>
        <SelectFormat>
          <input type="radio" name="select-radio-header" id="side-header" />
          <label for="side-header">Side header</label>
        </SelectFormat>
      </FormatContainer>
      <FooterContainer>
        <StyledCreateButton onClick={createTable}>Create</StyledCreateButton>
      </FooterContainer>
    </Container>
  );
};

const StyledSelectNumber = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "112px",
  height: "40px",
  background: "#FFFFFF",
  boxShadow: "0px 0px 0px 1px #E0E0E0",
  borderRadius: "4px",
  padding: "0px 8px",
  marginTop: "16px",
}));

const SelectNumber = ({number, setNumber}) => {
  
  return (
    <StyledSelectNumber>
      <RemoveIcon
        onClick={(e) => {
          number !== 2 && setNumber((prev) => prev - 1);
        }}
        sx={{ cursor: "pointer" }}
      />
      <span>{number}</span>
      <AddIcon
        onClick={(e) => {
          setNumber((prev) => prev + 1);
        }}
        sx={{ cursor: "pointer" }}
      />
    </StyledSelectNumber>
  );
};

export default Modal;
