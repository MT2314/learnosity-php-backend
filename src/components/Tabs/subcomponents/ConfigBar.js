import React, { useContext, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { LayoutContext, TabContext } from "../TabContext";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar as MUIToolbar } from "@material-ui/core/";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import DialogProvider from "../../../Utility/DialogProvider";

// ? Icons
import MUIIconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// * Styled Components
// ? Styled Container for configBar
const Container = styled("div")({
  display: "absolute",
  color: "white",
});

// ? Styled Tooltip, differnet but most compact method for styling tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(97, 97, 97, 0.9)",
    border: "4px",
    color: theme.palette.common.white,
    height: "22px",
    padding: "4px, 8px, 4px, 8px",
    fontSize: "10px",
    lineHeight: "14px",
    fontWeight: "500",
    "& .MuiTooltip-arrow": {
      color: "rgba(97, 97, 97, 0.9)",
    },
  },
}));

// ? styled Toolbar
const Toolbar = styled(MUIToolbar)({
  position: "relative",

  display: "flex",
  justifyContent: "space-evenly",
  width: "146px",
  height: "40px",
  color: "#000",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderLeft: "4px solid #1565c0",
  backgroundColor: "white",
  margin: "10px, 8px",

  "& .MuiToolbar-gutters": {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

// ? styled IconButton
const IconButton = styled(MUIIconButton)({
  width: "30px",
  height: "30px",
  padding: "7px",
  marginLeft: "4px",
  color: "#000",
  backgroundColor: "none",
  borderLeft: "4px solid #1565c0",
  borderRadius: "0!important",
  "&:hover": {
    backgroundColor: "rgba(21, 101, 192, 0.12)",
    color: "#1565C0",

    borderRadius: "0",
  },
});

const ConfigBar = () => {
  // ? State of tab component
  const [state, dispatch] = useContext(LayoutContext);

  // ? Active Tab
  const [activeTab, setActiveTab] = useContext(TabContext);

  //? Dialog toggle for remove tab button
  const [showDialog, setShowDialog] = useState(false);

  // ? Move Tab to the Left
  const moveTabLeft = (state, activeTab) => {
    dispatch({
      func: "MOVE_TAB_LEFT",
      title: `Tab at position ${activeTab} is now at position ${activeTab - 1}`,
      tabIndex: activeTab,
    });
    setActiveTab(activeTab - 1);
  };

  // ? Move Tab to the Right
  const moveTabRight = (state, activeTab) => {
    dispatch({
      func: "MOVE_TAB_RIGHT",
      title: `Tab at position ${activeTab} is now at position ${activeTab + 1}`,
      tabIndex: activeTab,
    });
    setActiveTab(activeTab + 1);
  };

  // ? Remove Tab
  const removeTab = async (state, activeTab) => {
    dispatch({
      func: "REMOVE_TAB",
      currentTab: activeTab,
      updateTabFunc: setActiveTab(),
    });
    activeTab === state.length - 1
      ? setActiveTab(activeTab - 1)
      : activeTab === 0
      ? setActiveTab(0)
      : setActiveTab(activeTab);
  };

  // ? Add Tab
  const addTab = (state, activeTab) => {
    dispatch({
      func: "ADD_TAB",
      id: Math.floor(Math.random() * 10),
      title: `Tab ${state.length + 1}`,
    });
    setActiveTab(activeTab + 1);
  };

  // ? Props for removeTab Dialog
  const removeTabDialog = {
    title: "Delete Tab?",
    message: [
      `Deleting "${state[activeTab].title}" will also delete ${state[activeTab].components.length} component(s).`,
      <br />,
      <br />,
      `You are able to undo this action.`,
    ],
    onConfirm: () => {
      onConfirm();
    },
    onCancel: () => {
      handleClose();
    },
    confirmMessage: "Delete",
    cancelMessage: "Cancel",
  };

  const handleClose = useCallback(() => {
    setShowDialog(false);
  }, []);

  const onConfirm = useCallback(() => {
    setShowDialog(false);
    removeTab(state, activeTab);
  }, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar variant="dense" disableGutters>
          <StyledTooltip title="move tab left" arrow placement="top">
            <IconButton
              color="inherit"
              disabled={activeTab === 0}
              onClick={() => moveTabLeft(state, activeTab)}
            >
              <ArrowBackIcon />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title="move tab right" arrow placement="top">
            <IconButton
              color="inherit"
              disabled={activeTab >= state.length - 1}
              onClick={() => moveTabRight(state, activeTab)}
            >
              <ArrowForwardIcon />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title="add tab" arrow placement="top">
            <IconButton
              color="inherit"
              disabled={state.length >= 4}
              onClick={() => {
                addTab(state, activeTab);
              }}
            >
              <AddIcon />
            </IconButton>
          </StyledTooltip>
          {showDialog && (
            <DialogProvider initialState={removeTabDialog} defaultState />
          )}
          <StyledTooltip title="remove current tab" arrow placement="top">
            <IconButton
              color="inherit"
              disabled={state.length <= 2}
              onClick={() => {
                state[activeTab].components.length > 0
                  ? setShowDialog(true)
                  : removeTab(state, activeTab);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </StyledTooltip>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default ConfigBar;
