import React from "react";
// MUI/@emotion imports
import { NativeSelect, Toolbar, AppBar, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
// Component/utility imports


// Styled components
const StyledInfoBoxToolbarContainer = styled(AppBar)({
   display: "flex",
   flexDirection: "row",
});

const StyledIconsToolbar = styled(Toolbar)({
   width: "8.75rem",
   height: "2.5rem",
   backgroundColor: "#FFF",
   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const StyledTextToolbar = styled(Toolbar)({
   width: "9.75rem",
   height: "2.5rem",
   backgroundColor: "#FFF",
   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
})

const InfoBoxToolbar = () => {
   return (
      <StyledInfoBoxToolbarContainer>
         <StyledIconsToolbar>
            <NativeSelect>
               <option>Sam</option>
            </NativeSelect>
         </StyledIconsToolbar>
         <StyledTextToolbar>

         </StyledTextToolbar>
      </StyledInfoBoxToolbarContainer>
   );
};

export default InfoBoxToolbar;
