import React, { useState, useRef, useEffect } from "react";

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
  MenuList,
} from "@mui/material";

// Expand Icon for Header Size Dropdown
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// styles/emotion
import styled from "@emotion/styled";

// assets
import icons from "../assets/icons";

// ? Toolbar Container
const StyledToolbarContainer = styled("div")(({ toolbar }) => ({
  display: toolbar ? "block !important" : "none",
  position: "fixed !important",
  top: "100px !important",
  left: "50%",
  transform: "translateX(-50%) !important",
  zIndex: 1000,
  gap: "10px",
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
  },
  "& .StyledCard .MuiPaper-root": {
    backgroundColor: "#fff",
  },
}));
// ? Appbar
const StyledAppbar = styled(AppBar)({
  display: "flex",
  flexDirection: "row",
  minHeight: "40px !important",
  gap: "10px",
  boxShadow: "none !important",
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
  },
});
// ? Toolbar
const StyledToolbar = styled(Toolbar)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "40px !important",
  minHeight: "40px !important",
  width: "8.4375rem",
  margin: "10px, 8px",
  paddingRight: "0px !important",
  paddingLeft: "0px !important",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px 0 rgba(0, 0, 0, 0.1)",
  borderLeft: "0.25rem solid rgba(21, 101, 192, 1)",

  borderRadius: "4px",
  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiPaper-root ": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px !important",
    backgroundColor: "#FFF !important",
  },
}));

// ? Header Size Dropdown Menu
const StyledMenu = styled(MenuList)({
  background: "#FFFFFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  marginLeft: "0px",
  marginTop: "2px",
});

// ? Header Size Dropdown Menu Item
const StyledIconDropdownButton = styled(Button)({
  padding: "0px",
  display: "inline-grid",
  gridAutoFlow: "column",
  // display: "flex",
  // flexDirection: "row",
  alignContent: "space-between",
  padding: "8px 22px 8px 14.5px",
  backgroundColor: "transparent",
  boxShadow: "none",
  color: "#232323",
  fontFamily: `"Inter", sans-serif`,
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  whiteSpace: "nowrap",
  textTransform: "none",
  paddingLeft: "10px!important",
  paddingRight: "10px!important",
  "&:hover": {
    background: "#FFF",
    color: "#1565C0",
  },
  "& .MuiSvgIcon-root": {
    marginRight: "0px",
  },
});

// ? Header Size Dropdown Menu Item
const StyledMenuItem = styled(MenuItem)({
  backgroundColor: "transparent",
  width: "109px",
  padding: "6px 16px",
  height: "36px",
  "& .MuiButtonBase-root ": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
  "&:active": {
    backgroundColor: " rgba(0, 0, 0, 0.04);!important",
  },
});

// ? Alignment Dropdown Button
const StyledIconButton = styled(IconButton)(({ disabled }) => ({
  display: "flex !important",
  height: "30px",
  width: "30px",
  padding: "0px",
  margin: "0px",
  color: "#232323",
  backgroundColor: "none",
  borderRadius: "4px !important",
  marginRight: "14px !important",
  // ...(open && {
  //   cursor: "pointer",
  //   backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  // }),
  "& svg": {
    fill: "#000",
    ...(disabled && { opacity: 0.3 }),
  },
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      fill: "rgba(21, 101, 192, 1)",
    },
  },
  "&:active": {
    cursor: "pointer",
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    "& svg": {
      color: "rgba(21, 101, 192, 1)",
    },
  },
  "&:focus-visible": {
    backgroundColor: "rgba(21, 101, 192, 0.12) !important",
  },
}));

// Header Size Options
const headerSizeDropdownOptions = [
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
  { value: "small", label: "Small" },
];

const HeaderToolbar = ({ toolbar, dispatch, state, setHeaderLevel }) => {
  // ? Header Size Dropdown Open/Close State
  const [openHeader, setHeaderOpen] = useState(false);
  // ? Header Size Dropdown Selection State
  const [selectedHeader, setSelectedHeader] = useState(null);

  // Refrence for Header Size Dropdown
  const HeaderDropDown = useRef(null);

  // Save Header Size Dropdown Selection
  const handleSizeSelect = (value) => {
    setSelectedHeader(value);
    setHeaderLevel(value);

    dispatch({
      func: "CHANGE_SIZE",
      size: value,
    });
  };

  console.log(state);

  return (
    <StyledToolbarContainer
      toolbar={toolbar}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
    >
      <StyledAppbar position="static">
        <StyledToolbar position="static">
          <StyledIconDropdownButton
            ref={HeaderDropDown}
            id="headerToolBar"
            aria-controls={openHeader ? "Header Select" : undefined}
            aria-expanded={openHeader ? "true" : undefined}
            variant="contained"
            disableRipple
            disableFocusRipple
            onClick={() => setHeaderOpen(!openHeader)}
          >
            {openHeader ? (
              <ExpandMoreIcon
                sx={{
                  marginRight: "9.5px",
                  transform: "rotate(180deg)",
                  pointerEvents: "none",
                }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{
                  marginRight: "9.5px",
                  pointerEvents: "none",
                }}
              />
            )}
            {selectedHeader === null ? "Large" : selectedHeader}
            <Popper
              open={openHeader}
              anchorEl={HeaderDropDown.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener
                      onClickAway={() => setHeaderOpen(!openHeader)}
                    >
                      <StyledMenu
                        autoFocusItem={openHeader}
                        data-testid="header-select-dropdown"
                        aria-labelledby="Header Drop Down"
                        // onKeyDown={handleListKeyDown}
                      >
                        {headerSizeDropdownOptions.map((size, index) => {
                          let value = size.value;
                          let label = size.label;
                          return (
                            <StyledMenuItem
                              key={`${value} header`}
                              value={value}
                              selected={label === selectedHeader}
                              onClick={(e) => handleSizeSelect(label)}
                              data-testid={`${value} header`}
                              aria-labelledby={label}
                            >
                              {label}
                            </StyledMenuItem>
                          );
                        })}
                      </StyledMenu>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </StyledIconDropdownButton>

          <Divider
            sx={{ marginLeft: "10px", marginRight: "10px" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <StyledIconButton
            disableRipple
            disabled
            className={"align-button"}
            aria-label="disabled allignment dropdown button"
          >
            {icons["align"]}
          </StyledIconButton>
        </StyledToolbar>
      </StyledAppbar>
    </StyledToolbarContainer>
  );
};

export default HeaderToolbar;
