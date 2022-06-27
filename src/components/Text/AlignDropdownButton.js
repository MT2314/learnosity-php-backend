import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import styles from './styles/Quill.module.scss'

const AlignDropdownButton = (props) => {
  return (
    <>
      <Card
        style={{
          display: props.show ? "block" : "none",
          position: "absolute",
          left: "103px",
          zIndex: "25",
        }}
        className="dropdown-content"
      >
        <span className="ql-formats" style={{marginRight: "0px"}}>
          <button className="ql-align"/>
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
        </span>
      </Card>
    </>
  );
};

export default AlignDropdownButton;
