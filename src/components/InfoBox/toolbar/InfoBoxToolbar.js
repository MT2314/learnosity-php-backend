import React, { useState } from 'react';
// MUI/@emotion imports
<<<<<<< HEAD
import { Button, MenuItem, Toolbar, AppBar, Tooltip } from '@mui/material';
=======
import { Button, Menu, MenuItem, Toolbar, AppBar, Tooltip } from "@mui/material";
>>>>>>> 3f063faecc5c4478333d99966ca52dd4b01d9c94
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
// Component/utility imports
<<<<<<< HEAD
=======
import { iconDropdownOptions } from "../icons/infoBoxIcons";
>>>>>>> 3f063faecc5c4478333d99966ca52dd4b01d9c94

// Styled components
const StyledInfoBoxToolbarContainer = styled(AppBar)({
  display: 'flex',
  flexDirection: 'row',
  height: '2.5rem !important',
  minHeight: '32px !important',
});

const StyledIconToolbar = styled(Toolbar)({
<<<<<<< HEAD
  width: '8.75rem',
  height: '2.5rem !important',
  backgroundColor: '#FFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '0.25rem',
  minHeight: '32px !important',
});

const StyledIconDropdownButton = styled(Button)({
  backgroundColor: '#FFF',
  fontFamily: `"Inter", sans-serif`,
  width: '100%',
  height: '2.5rem !important',
  padding: '0',
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'nowrap',
  textAlign: 'center',
=======
   width: "8.75rem",
   height: "2.5rem !important",
   padding: "0.5rem 1.3125rem !important",
   backgroundColor: "#FFF",
   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
   borderLeft: "4px solid #1565C0",
   borderRadius: "0.25rem",
   minHeight: "2rem !important",
});

const StyledIconDropdownButton = styled(Button)({
   backgroundColor: "#FFF",
   color: "#232323",
   fontFamily: `"Inter", sans-serif`,
   fontSize: "1rem",
   fontWeight: "400",
   lineHeight: "1.5rem",
   letterSpacing: "0.009375rem",
   width: "100%",
   height: "2.5rem !important",
   padding: "0",
   display: "flex",
   flexDirection: "row",
   whiteSpace: "nowrap",
   textAlign: "center",
   textTransform: "none",
>>>>>>> 3f063faecc5c4478333d99966ca52dd4b01d9c94

  '&:hover': {
    background: '#FFF',
    color: '#1565C0',
  },
});

const StyledMenu = styled(Menu)({
   width: "6.8125rem",
});

const StyledMenuItem = styled(MenuItem)({
   width: "6.8125rem",
});

const StyledTextToolbar = styled(Toolbar)({
  width: '9.75rem',
  height: '2.5rem',
  backgroundColor: '#FFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '0.25rem',
});

<<<<<<< HEAD
const InfoBoxToolbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <StyledInfoBoxToolbarContainer>
      <StyledIconToolbar>
        <StyledIconDropdownButton
          id="iconToolBar"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          // variant="contained"
          fullWidth
          disableElevation
          disableRipple
          disableFocusRipple
          // onClick={handleClick}
          startIcon={<ExpandMoreIcon />}
        >
          Select icon
        </StyledIconDropdownButton>
      </StyledIconToolbar>
      <StyledTextToolbar></StyledTextToolbar>
    </StyledInfoBoxToolbarContainer>
  );
=======
const InfoBoxToolbar = ({
   infoBoxIcon,
   infoBoxLabel,
   infoBoxHeader,
   infoBoxBody,
   //   setProp = () => {},
}) => {
   // ref for infoBoxType dropdown
   const [anchorEl, setAnchorEl] = useState(null);

   const open = Boolean(anchorEl);

   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <StyledInfoBoxToolbarContainer>
         <StyledIconToolbar>
            <StyledIconDropdownButton
               id="iconToolBar"
               aria-controls={open ? 'infoBox-icon-menu' : undefined}
               aria-expanded={open ? 'true' : undefined}
               variant="contained"
               fullWidth
               disableElevation
               disableRipple
               disableFocusRipple
               onClick={handleClick}
               startIcon={<ExpandMoreIcon/>}
            >
               Select icon
            </StyledIconDropdownButton>
            <StyledMenu
               id="infoBox-icon-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
            >
               {
                  iconDropdownOptions.map((infoBox) => {
                     return (
                        <StyledMenuItem
                           key={infoBox.id}
                           value={infoBox.type}
                           onClick={handleClick}
                        >
                           {infoBox.type}
                        </StyledMenuItem>
                     )
                  })
               }
            </StyledMenu>
         </StyledIconToolbar>
         <StyledTextToolbar>
               {/* dummy toolbar here (for now) */}
         </StyledTextToolbar>
      </StyledInfoBoxToolbarContainer>
   );
>>>>>>> 3f063faecc5c4478333d99966ca52dd4b01d9c94
};

export default InfoBoxToolbar;
