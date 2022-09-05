import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { tooltipClasses } from '@mui/material/Tooltip';
import {
  IconButton,
  Toolbar,
  AppBar,
  Tooltip,
  Button,
  Grow,
  Popper,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ? Icons
import icons from '../icons/configIcons';

// * Styled Components
// ? Styled Container for configBar
const Container = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
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

// ? Styled Appbar
const StyledAppbar = styled(AppBar)({
  width: 'auto',
  display: 'flex',
  flexDirection: 'row',
  height: '2.5rem !important',
  minHeight: '32px !important',
  gap: '10px',
  '& .MuiPaper-root': {
    backgroundColor: 'none',
  },
});

// ? styled Toolbar
const StyledToolbar = styled(Toolbar)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '146px',
  height: '40px',
  color: '#000',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  margin: '10px, 8px',
  minHeight: '32px !important',
  '& .MuiToolbar-gutters': {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const StyledIconToolbar = styled(Toolbar)({
  // width: '8.75rem',
  height: '2.5rem !important',
  padding: '0.5rem 1.3125rem !important',
  backgroundColor: '#FFF !important',
  // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderLeft: '4px solid #1565C0',
  borderRadius: '0.25rem',
  minHeight: '2rem !important',
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
  height: '2.5rem !important',
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
const TempConfigBar = ({ disableToolbar }) => {
  const [open, setOpen] = useState(false);
  const IconDropDown = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
            <Popper
              open={open}
              anchorEl={IconDropDown.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
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
