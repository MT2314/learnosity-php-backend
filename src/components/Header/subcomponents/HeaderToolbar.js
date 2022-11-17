import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/Toolbar.scss";
import { HeaderContext } from "../HeaderContext";

// MUI
import {
  Paper,
  AppBar,
  Toolbar,
  MenuItem,
  ClickAwayListener,
  Divider,
  Button,
  IconButton,
  Popper,
  Grow,
  Tooltip,
  Card,
  MenuList,
} from "@mui/material";

// assets
import icons, { Chevron } from "../../Text/assets/icons";

// ? Alignment Dropdown Button

// Header Size Options
const headerSizeDropdownOptions = [
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
  { value: "small", label: "Small" },
];

const HeaderToolbar = ({ toolbar, activeTopMenu, setActiveTopMenu }) => {
  const [state, dispatch] = useContext(HeaderContext);
  // ? Header Size Dropdown Open/Close State
  const [openHeader, setHeaderOpen] = useState(false);
  // ? Header Size Dropdown Selection State
  const [selectedHeader, setSelectedHeader] = useState(null);

  //  ? Alignment Dropdown Selection State
  const [activeDropDownItem, setActiveDropDownItem] = useState();

  // Refrence for Header Size Dropdown
  const HeaderDropDown = useRef(null);
  const alignRef = useRef(null);

  // Save Header Size Dropdown Selection
  const handleSizeSelect = (value) => {
    setSelectedHeader(value);
    dispatch({
      func: "CHANGE_SIZE",
      size: value,
    });
  };

  // Handle Toolbar Alignment State Change
  const handleAlignmentChange = (activeDropDownItem) => {
    let currentAlignment;

    if (activeDropDownItem) {
      currentAlignment = activeDropDownItem;
    } else {
      currentAlignment = state.alignment;
      setActiveDropDownItem(state.alignment);
    }
    dispatch({
      func: "CHANGE_ALIGNMENT",
      alignment: currentAlignment,
    });
  };
  useEffect(() => {
    handleAlignmentChange(activeDropDownItem);
  }, [activeDropDownItem]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      className="ToolbarContainer"
      style={{
        "--active": toolbar ? "block" : "none",
      }}
    >
      <AppBar position="static" className="StyledAppbar">
        <Toolbar
          position="static"
          className="StyledToolbar"
          style={{
            "--width": "8.4375rem",
          }}
        >
          <Button
            ref={HeaderDropDown}
            id="headerToolBar"
            aria-controls={openHeader ? "Header Select" : undefined}
            aria-expanded={openHeader ? "true" : undefined}
            variant="contained"
            disableRipple
            disableFocusRipple
            onClick={() => {
              setHeaderOpen(!openHeader);
              setActiveTopMenu(false);
            }}
            className="SelectButton"
            style={{
              "--active": openHeader ? "rgba(21, 101, 192, 1)" : "#000",
              "--width": "87px",
              "--svg": openHeader ? " " : "rotate(180deg)",
            }}
          >
            <Chevron />
            {state.size.charAt(0).toUpperCase() + state.size.slice(1)}
            <Popper
              open={openHeader}
              anchorEl={HeaderDropDown.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper elevation={0} className="StyledSelectPaper">
                    <ClickAwayListener
                      onClickAway={() => setHeaderOpen(!openHeader)}
                    >
                      <MenuList
                        autoFocusItem={openHeader}
                        data-testid="header-select-dropdown"
                        aria-labelledby="Header Drop Down"
                        className="StyledMenu"
                      >
                        {headerSizeDropdownOptions.map((size) => {
                          let value = size.value;
                          let label = size.label;
                          return (
                            <MenuItem
                              key={`${value} header`}
                              value={value}
                              selected={label === selectedHeader}
                              onClick={() => handleSizeSelect(value)}
                              data-testid={`${value} header`}
                              aria-labelledby={label}
                              className="StyledMenuItem"
                              style={{
                                "--fontSize":
                                  label === "Large"
                                    ? "1.375rem"
                                    : label === "Medium"
                                    ? "1rem"
                                    : "0.875rem",
                                "--fontWeight":
                                  label === "Large"
                                    ? "300"
                                    : label === "Medium"
                                    ? "300"
                                    : "500",
                                "--lineHeight":
                                  label === "Large"
                                    ? "116.7%"
                                    : label === "Medium"
                                    ? "120%"
                                    : "116.7%",
                                "--letterSpacing":
                                  label === "Large"
                                    ? "-1.5px"
                                    : label === "Medium"
                                    ? "-0.5px"
                                    : "normal",
                              }}
                            >
                              {label}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Button>

          <Divider orientation="vertical" variant="middle" flexItem />
          <Tooltip
            aria-label="alignment"
            title="alignment"
            placement="top"
            arrow
          >
            <IconButton
              ref={alignRef}
              disableRipple
              color="inherit"
              onClick={() => {
                if (activeTopMenu) {
                  setActiveTopMenu(false);
                } else {
                  setActiveTopMenu(true);
                }
                setHeaderOpen(false);
              }}
              className={"StyledIconButton"}
              style={{
                "--active": activeTopMenu ? "rgba(21, 101, 192, 1)" : "#000",
                "--background": activeTopMenu
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
              }}
              aria-label="alignment buttons dropdown"
              value={
                state.alignment === "left-align"
                  ? icons["align"]
                  : state.alignment === "center-align"
                  ? icons["center"]
                  : state.alignment === "right-align"
                  ? icons["right"]
                  : icons["align"]
              }
              data-alignid="alignment-dropdown"
            >
              {state.alignment === "left-align"
                ? icons["align"]
                : state.alignment === "center-align"
                ? icons["center"]
                : state.alignment === "right-align"
                ? icons["right"]
                : icons["align"]}
            </IconButton>
          </Tooltip>
          <AlignDropdownButton
            aria-label="alignment buttons options"
            activeTopMenu={activeTopMenu}
            activeDropDownItem={activeDropDownItem}
            setActiveDropDownItem={setActiveDropDownItem}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderToolbar;

const AlignDropdownButton = ({
  activeTopMenu,
  activeDropDownItem,
  setActiveDropDownItem,
  setVisibleAlignIcon,
}) => {
  return (
    <>
      <Card
        elevation={0}
        className="Styled-Card"
        style={{
          "--card-display": activeTopMenu ? "flex" : "none",
          "--left": "91.5px",
          "--width": "112px",
        }}
      >
        <Tooltip
          aria-label="align left"
          title="align left"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            value="left-align"
            color="inherit"
            aria-label="left align"
            onClick={() => {
              setActiveDropDownItem("left-align");
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem == "left-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "left-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["align"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="centre text"
          title="centre text"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="align center"
            value="center-align"
            onClick={() => {
              if (activeDropDownItem === "center-align") {
                setActiveDropDownItem("left-align");
              } else {
                setActiveDropDownItem("center-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem == "center-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "center-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["center"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="align right"
          title="align right"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="right align"
            value="right-align"
            onClick={() => {
              if (activeDropDownItem === "right-align") {
                setActiveDropDownItem("left-align");
              } else {
                setActiveDropDownItem("right-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeDropDownItem == "right-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeDropDownItem == "right-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["right"]}
          </IconButton>
        </Tooltip>
      </Card>
    </>
  );
};
