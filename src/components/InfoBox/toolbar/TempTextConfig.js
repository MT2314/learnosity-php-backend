import React, { useState, useEffect, useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { tooltipClasses } from '@mui/material/Tooltip';

import styled from '@emotion/styled';

import {
  Popper,
  Grow,
  Paper,
  AppBar,
  Toolbar,
  MenuItem,
  MenuList,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';

// ? Expand Icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ? Icons
import icons from '../icons/configIcons';
import { iconDropdownOptions } from '../icons/infoBoxIcons';

// * Styled Components

// ? Styled Container
const Container = styled('div')({
  position: 'absolute',
  gap: '10px',
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
  },
});

// ? Styled Appbar
const StyledAppbar = styled(AppBar)({
  width: 'auto',
  display: 'flex',
  flexDirection: 'row',
  minHeight: '40px !important',
  gap: '10px',
});

// ? Styled Icon Select Toolbar
const StyledIconToolbar = styled(Toolbar)({
  minHeight: '40px !important',
  width: '140px',
  backgroundColor: '#FFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderLeft: '4px solid #1565C0',
  borderRadius: '4px',
});

// ? Styled Text Toolbar (Possibly Temp)
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-evenly',
  minHeight: '40px !important',
  width: '156px',
  margin: '10px, 8px',
  backgroundColor: '#FFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
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
  '& svg': {
    fill: '#000',
  },
  '&:hover': {
    backgroundColor: 'rgba(21, 101, 192, 0.12) !important',
    '& svg': {
      fill: 'rgba(21, 101, 192, 1)',
    },
  },
  '&:active': {
    cursor: 'pointer',
    backgroundColor: 'rgba(21, 101, 192, 0.12) !important',
    '& svg': {
      fill: 'rgba(21, 101, 192, 1)',
    },
  },
  '&:disabled': {
    backgroundColor: 'rgba(255, 255, 255, 1) !important',
    '& svg': {
      fill: 'rgba(0, 0, 0, 0.38)',
    },
  },
});
const StyledIconDropdownButton = styled(Button)({
  backgroundColor: '#FFF',
  color: '#232323',
  fontFamily: `"Inter", sans-serif`,
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5rem',
  letterSpacing: '0.009375rem',
  width: '100%',
  padding: '0',
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  textTransform: 'none',

  '&:hover': {
    background: '#FFF',
    color: '#1565C0',
  },
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

const StyledMenu = styled(MenuList)({
  background: '#FFFFFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  marginLeft: '-12px',
  marginTop: '12px',
});

const StyledMenuItem = styled(MenuItem)({
  width: '6.8125rem',
});

const TempConfigBar = ({ disableToolbar }) => {
  const [open, setOpen] = useState(false);
  const IconDropDown = useRef(null);

  //  ? Icon Select Dropdown
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //  ? Icon Select Close Dropdown
  const handleClose = (event) => {
    if (IconDropDown.current && IconDropDown.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      IconDropDown.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Container>
      <StyledAppbar position="static">
        <StyledIconToolbar>
          <StyledIconDropdownButton
            ref={IconDropDown}
            id="iconToolBar"
            aria-controls={open ? 'infoBox-icon-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            fullWidth
            disableElevation
            disableRipple
            disableFocusRipple
            onClick={handleToggle}
            startIcon={<ExpandMoreIcon />}
          >
            Select icon
            <Popper
              open={open}
              anchorEl={IconDropDown.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <StyledMenu
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {iconDropdownOptions.map((infoBox) => {
                          return (
                            <StyledMenuItem
                              key={infoBox.id}
                              value={infoBox.type}
                              onClick={handleClose}
                            >
                              {infoBox.type}
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
        </StyledIconToolbar>
        <StyledToolbar variant="dense" disableGutters test-id="infoBox-toolbar">
          <StyledTooltip title="Bold" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
              onClick={() => console.log('works bold')}
            >
              {icons['bold']}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="Align" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons['align']}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="List" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons['bullet']}
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="Link" arrow placement="top">
            <StyledIconButton
              disableRipple
              color="inherit"
              disabled={disableToolbar}
            >
              {icons['link']}
            </StyledIconButton>
          </StyledTooltip>
        </StyledToolbar>
      </StyledAppbar>
    </Container>
  );
};

export default TempConfigBar;
