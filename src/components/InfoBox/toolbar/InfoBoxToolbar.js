import React, { useState } from "react";
// MUI/@emotion imports
import { Button, Menu, MenuItem, Toolbar, AppBar, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";
// Component/utility imports
import { iconDropdownOptions } from "../icons/infoBoxIcons";

// Styled components
const StyledInfoBoxToolbarContainer = styled(AppBar)({
   display: "flex",
   flexDirection: "row",
   height: "2.5rem !important",
});

const StyledIconToolbar = styled(Toolbar)({
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

   "&:hover": {
      background: "#FFF",
      color: "#1565C0",
   },
});

const StyledMenu = styled(Menu)({
   width: "6.8125rem",
});

const StyledTextToolbar = styled(Toolbar)({
   width: "9.75rem",
   height: "2.5rem",
   backgroundColor: "#FFF",
   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
   borderRadius: "0.25rem",
});

const InfoBoxToolbar = () => {

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (e) => {
      setAnchorEl(e.current.target);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <StyledInfoBoxToolbarContainer>
         <StyledIconToolbar>
            <StyledIconDropdownButton
               id="iconToolBar"
               aria-controls={open ? 'InfoBox icon menu' : undefined}
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
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
            >
               {
                  iconDropdownOptions.map((infoBox, i) => {
                     return (
                        <MenuItem
                           key={infoBox.id}
                           onClick={handleClose}
                        >
                           {infoBox.type}
                        </MenuItem>
                     )
                  })
               }
            </StyledMenu>
         </StyledIconToolbar>
         <StyledTextToolbar>

         </StyledTextToolbar>
      </StyledInfoBoxToolbarContainer>
   );
};

export default InfoBoxToolbar;
