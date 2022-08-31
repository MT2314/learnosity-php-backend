import React, { useState } from "react";
// MUI/@emotion imports
import { Button, MenuItem, Toolbar, AppBar, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";
// Component/utility imports


// Styled components
const StyledInfoBoxToolbarContainer = styled(AppBar)({
   display: "flex",
   flexDirection: "row",
   height: "2.5rem !important",
});

const StyledIconToolbar = styled(Toolbar)({
   width: "8.75rem",
   height: "2.5rem !important",
   backgroundColor: "#FFF",
   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
   borderRadius: "0.25rem",
});

const StyledIconDropdownButton = styled(Button)({
   backgroundColor: "#FFF",
   fontFamily: `"Inter", sans-serif`,
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
               startIcon={<ExpandMoreIcon/>}
            >
               Select Icon
            </StyledIconDropdownButton>
         </StyledIconToolbar>
         <StyledTextToolbar>

         </StyledTextToolbar>
      </StyledInfoBoxToolbarContainer>
   );
};

export default InfoBoxToolbar;
