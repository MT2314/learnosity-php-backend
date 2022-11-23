import React from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";

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
} from "@mui/material";

// ? Styled Container
const Container = styled("div")(({ disconnect }) => ({
  display: disconnect ? "none" : "block !important",
  position: "fixed !important",
  top: "100px !important",
  // left: "36% !important",
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

const StyledFormatButton = styled(Button)(({ openVideo }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#FFF",
  color: "#232323",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
  width: "78px",
  padding: "8px 10px",
  whiteSpace: "nowrap",
  textAlign: "center",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    background: "transparent",
    boxShadow: "none",
    color: "#1565C0",
  },
  "&:active": {
    background: "transparent",
    boxShadow: "none",
    color: "#1565C0",
  },
  "&:focus-visible": {
    background: "transparent",
    boxShadow: "none",
    color: "#1565C0",
  },
  "&:disabled": { background: "none" },
}));

const StyledVideoToolbar = styled(Toolbar)(({ selected }) => ({
  borderLeft: "4px solid #1565C0",
  display: "flex",
  justifyContent: "space-evenly",
  minHeight: "40px !important",
  margin: "10px, 7px",
  backgroundColor: "#FFF",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingLeft: "0px!important",
  paddingRight: "0px!important",
  "& .MuiToolbar-gutters": {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({}) => ({
  height: "24px",
  whiteSpace: "nowrap",
  fontFamily: `"Inter", sans-serif`,
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "1.5rem",
  letterSpacing: "0.009375rem",
}));

const ToolBar = ({ disconnect }) => {
  return (
    <Container className="ToolbarDummy-Container" disconnect={disconnect}>
      <StyledAppbar position="static">
        <StyledVideoToolbar
          position="static"
          className="StyledToolbar"
          style={{
            "--width": "8.4375rem",
          }}
        >
          <Button className="SelectButton">
            <Tooltip aria-label="Format" title="Format" placement="top" arrow>
              <StyledFormatButton>Format</StyledFormatButton>
            </Tooltip>
          </Button>
          <Paper>
            <FormGroup sx={{ gap: "14px" }}>
              <FormControl>
                <Tooltip
                  aria-label="Show top headers"
                  title="Show top headers"
                  placement="top"
                  arrow
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  }}
                >
                  <StyledFormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                          "&.Mui-checked": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                        }}
                      />
                    }
                    label="Show top headers"
                    size="small"
                  />
                </Tooltip>
              </FormControl>
              <FormControl>
                <Tooltip
                  aria-label="Show side headers"
                  title="Show side headers"
                  placement="top"
                  arrow
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  }}
                >
                  <StyledFormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                          "&.Mui-checked": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                        }}
                      />
                    }
                    label="Show side headers"
                    size="small"
                  />
                </Tooltip>
              </FormControl>
              <FormControl>
                <Tooltip
                  aria-label="Show zebra stripes"
                  title="Show zebra stripes"
                  placement="top"
                  arrow
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  }}
                >
                  <StyledFormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                          "&.Mui-checked": {
                            bgcolor: "transparent",
                            color: "rgba(21, 101, 192, 1)",
                          },
                        }}
                      />
                    }
                    label="Show zebra stripes"
                    size="small"
                  />
                </Tooltip>
              </FormControl>
            </FormGroup>
          </Paper>

        </StyledVideoToolbar>
      </StyledAppbar>
    </Container>
  );
};

export default React.memo(ToolBar);
