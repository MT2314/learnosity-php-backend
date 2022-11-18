import React, { useState, useEffect, useContext, useRef } from "react";
import { LayoutContext } from "../TableContext";

import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

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
  padding: "16px",
  borderBottom: "1px solid #E0E0E0",
  "& span": {
    marginTop: "4px",
    fontSize: "16px",
    color: "#000000",
  },
}));

const SelectContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "16px",
}));
const FormatContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
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

const StyledCreateButton = styled("button")(({ disable }) => ({
  border: "none",
  outline: "none",
  background: "none",
  height: "24px",
  fontFamily: "'Inter'",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "24px",
  letterSpacing: "0.4px",
  color: disable ? "#1565C0" : "#79b0f0",
  cursor: disable ? "pointer" : "default",
}));

const Modal = ({ setShowModal, setShowTable }) => {
  const [state, dispatch] = useContext(LayoutContext);

  const [numberRow, setNumberRow] = useState(2);
  const [numberCol, setNumberCol] = useState(2);
  const [headerSelection, setHeaderSelection] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  useOnClickOutside(containerRef, () => {
    setShowModal(false);
  });

  const closeModal = (e) => {
    setShowModal(false);
  };

  const createTable = (e) => {
    const headers = [];
    const data = [];

    [...Array(numberCol)].forEach((_, i) => {
      headers.push({
        accessorKey: `column${i + 1}`,
        id: `column${i + 1}`,
        header: "",
      });
    });

    headerSelection === "side-header" &&
      headers.push({
        accessorKey: `column${numberCol + 1}`,
        id: `column${numberCol + 1}`,
        header: "",
      });

    const cols = headerSelection === "side-header" ? numberCol + 1 : numberCol;

    const rows = headerSelection === "top-header" ? numberRow + 1 : numberRow;

    [...Array(rows)].forEach((_, i) => {
      const row = {};
      [...Array(cols)].forEach((_, j) => {
        let type;
        if (headerSelection === "side-header") {
          type = j === 0 ? "title" : "cell";
        }

        if (headerSelection === "top-header") {
          type = i === 0 ? "title" : "cell";
        }

        row[`column${j + 1}`] = {
          value: "",
          type,
        };
      });

      data.push(row);
    });

    dispatch({
      func: "SET_STATE",
      headers,
      data,
      headerType: headerSelection,
    });

    setShowTable(true);
  };
  return (
    <Container
      ref={containerRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          console.log("Escape");
          setShowModal(false);
        }
      }}
      tabIndex={0}
    >
      <HeaderContainer>
        <span>Create a table</span>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={closeModal} />
      </HeaderContainer>
      <SelectContainer>
        <div>
          <span>Columns</span>
          <SelectNumber number={numberCol} setNumber={setNumberCol} />
        </div>
        <div>
          <span>Rows</span>
          <SelectNumber number={numberRow} setNumber={setNumberRow} />
        </div>
      </SelectContainer>
      <FormatContainer>
        <span>Table Format</span>
        <SelectFormat>
          <input
            type="radio"
            name="select-radio-header"
            id="top-header"
            onChange={() => setHeaderSelection("top-header")}
            style={{ cursor: "pointer" }}
          />
          <label for="top-header">Top header</label>
        </SelectFormat>
        <SelectFormat>
          <input
            type="radio"
            name="select-radio-header"
            id="side-header"
            onChange={() => setHeaderSelection("side-header")}
            style={{ cursor: "pointer" }}
          />
          <label for="side-header">Side header</label>
        </SelectFormat>
      </FormatContainer>
      <FooterContainer>
        <StyledCreateButton
          onClick={createTable}
          disabled={headerSelection == null}
          disable={headerSelection}
        >
          Create
        </StyledCreateButton>
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

const SelectNumber = ({ number, setNumber }) => {
  useEffect(() => {
    console.log(number);
  }, [number]);
  return (
    <StyledSelectNumber
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.keyCode === 38) {
          e.preventDefault();
          number < 6 && setNumber((prev) => prev + 1);
        }
        if (e.keyCode === 40) {
          e.preventDefault();
          number !== 2 && setNumber((prev) => prev - 1);
        }
      }}
    >
      <RemoveIcon
        onClick={(e) => {
          number !== 2 && setNumber((prev) => prev - 1);
        }}
        sx={{ cursor: "pointer" }}
      />
      <input
        value={number}
        onInput={(e) => {
          const value = parseInt(e.target.value);
          if (value >= 2 && value <= 6) {
            setNumber(value);
          }
        }}
        style={{
          width: "24px",
          height: "24px",
          border: "none",
          outline: "none",
          textAlign: "center",
        }}
      />
      <AddIcon
        onClick={(e) => {
          number < 6 && setNumber((prev) => prev + 1);
        }}
        sx={{ cursor: "pointer" }}
      />
    </StyledSelectNumber>
  );
};

export default Modal;
