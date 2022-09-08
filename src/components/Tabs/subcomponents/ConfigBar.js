import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { LayoutContext, TabContext } from '../TabContext';
import { tooltipClasses } from '@mui/material/Tooltip';
import { IconButton, Toolbar, AppBar, Tooltip } from '@mui/material';
import { ArrowBack, ArrowForward, Add, Remove } from '@mui/icons-material';
import DialogProvider from '../../../Utility/DialogProvider';

// * Styled Components
// ? Styled Container for configBar
const Container = styled('div')({
  display: 'absolute',
  color: 'white',
});

// ? Styled Tooltip, differnet but most compact method for styling tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
    border: '4px',
    color: '#fff',
    height: '22px',
    padding: '4px, 8px, 4px, 8px',
    fontSize: '10px',
    lineHeight: '14px',
    fontWeight: '500',
    '& .MuiTooltip-arrow': {
      color: 'rgba(97, 97, 97, 0.9)',
    },
  },
}));

// ? styled Toolbar
const StyledToolbar = styled(Toolbar)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '146px',
  height: '40px',
  color: '#000',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderLeft: '4px solid #1565c0',
  backgroundColor: 'white',
  margin: '10px, 8px',
  minHeight: '32px !important',
  '& .MuiToolbar-gutters': {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const StyledIconButton = styled(IconButton)({
  width: '30px',
  height: '30px',
  padding: '7px',
  color: '#000',
  backgroundColor: 'none',
  borderRadius: '4px!important',
  '&:hover': {
    backgroundColor: 'rgba(21, 101, 192, 0.12) !important',
  },
  '&:active': {
    cursor: 'pointer',
    backgroundColor: 'rgba(21, 101, 192, 0.12) !important',
    '> svg': {
      color: '#1565c0 !important',
    },
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
      func: 'MOVE_TAB_LEFT',
      title: `Tab at position ${activeTab} is now at position ${activeTab - 1}`,
      tabIndex: activeTab,
    });
    setActiveTab(activeTab - 1);
  };

  // ? Move Tab to the Right
  const moveTabRight = (state, activeTab) => {
    dispatch({
      func: 'MOVE_TAB_RIGHT',
      title: `Tab at position ${activeTab} is now at position ${activeTab + 1}`,
      tabIndex: activeTab,
    });
    setActiveTab(activeTab + 1);
  };

  // ? Remove Tab
  const removeTab = async (state, activeTab) => {
    dispatch({
      func: 'REMOVE_TAB',
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
  const addTab = (state) => {
    dispatch({
      func: 'ADD_TAB',
      id: uuidv4(),
      title: `Tab ${state.length + 1}`,
    });
  };

  {
    state[activeTab].title;
  }
  // ? Props for removeTab Dialog
  const removeTabDialog = {
    title: 'Delete Tab?',
    message: [
      `Deleting "${
        state[activeTab].title || state[activeTab].placeholderTitle
      }" will also delete ${state[activeTab].components.length} component(s).`,
      <br key={1} />,
      <br key={2} />,
      `You are able to undo this action.`,
    ],
    onConfirm: () => {
      onConfirm();
    },
    onCancel: () => {
      handleClose();
    },
    confirmMessage: 'Delete',
    cancelMessage: 'Cancel',
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const onConfirm = () => {
    setShowDialog(false);
    removeTab(state, activeTab);
  };

  return (
    <Container>
      <AppBar position="static">
        <StyledToolbar variant="dense" disableGutters test-id="tab-toolbar">
          <StyledTooltip title="move tab left" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={activeTab === 0}
              onClick={() => moveTabLeft(state, activeTab)}
            >
              <ArrowBack />
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="move tab right" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={activeTab >= state.length - 1}
              onClick={() => moveTabRight(state, activeTab)}
            >
              <ArrowForward />
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="add tab" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={state.length >= 4}
              onClick={() => {
                addTab(state, activeTab);
              }}
            >
              <Add />
            </StyledIconButton>
          </StyledTooltip>
          {showDialog && (
            <DialogProvider initialState={removeTabDialog} defaultState />
          )}
          <StyledTooltip title="remove current tab" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={state.length <= 2}
              onClick={() => {
                state[activeTab].components.length > 0
                  ? setShowDialog(true)
                  : removeTab(state, activeTab);
              }}
            >
              <Remove />
            </StyledIconButton>
          </StyledTooltip>
        </StyledToolbar>
      </AppBar>
    </Container>
  );
};

export default ConfigBar;
