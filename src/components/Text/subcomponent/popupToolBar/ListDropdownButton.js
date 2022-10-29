import React from "react";
import "react-quill/dist/quill.snow.css";
import { Card } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import icons from "../../assets/icons";
import "../../styles/Toolbar.scss";

const ListDropdownButton = ({
  isInfoBox,
  show,
  activeDropDownItem,
  setActiveDropDownListItem,
  onKeyDropDown,
  isVideo,
}) => {
  return (
    <>
      <Card
        show={show}
        isInfoBox={isInfoBox}
        isVideo={isVideo}
        onKeyDown={onKeyDropDown}
        className={`StyledCard`}
        style={{
          "--card-display": show ? "flex" : "none",
          "--left": isInfoBox ? "76.5px" : isVideo ? "74px" : "105px",
          "--width": "78px",
        }}
      >
        <Tooltip aria-label="bullets" title="bullets" placement="top" arrow>
          <button
            aria-label="bullet list"
            className={
              activeDropDownItem === "bullet"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="bullet"
            onClick={() => {
              if (activeDropDownItem === "bullet") {
                setActiveDropDownListItem("");
              } else {
                setActiveDropDownListItem("bullet");
              }
            }}
          >
            {icons["bullet"]}
          </button>
        </Tooltip>

        <Tooltip aria-label="numbering" title="numbering" placement="top" arrow>
          <button
            aria-label="numbered list"
            className={
              activeDropDownItem === "ordered"
                ? "ql-list ql-selected ql-active"
                : "ql-list"
            }
            value="ordered"
            onClick={() => {
              if (activeDropDownItem === "ordered") {
                setActiveDropDownListItem("");
              } else {
                setActiveDropDownListItem("ordered");
              }
            }}
          >
            {icons["ordered"]}
          </button>
        </Tooltip>
      </Card>
    </>
  );
};

export default ListDropdownButton;
