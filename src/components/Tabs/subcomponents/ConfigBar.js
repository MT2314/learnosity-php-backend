import React from "react";
import styled from "@emotion/styled";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar as MUIToolbar } from "@material-ui/core/";
import MUIIconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Container = styled("div")({
  display: "absolute",
  width: "184px",
  color: "white",
  margin: "auto",
});

const Toolbar = styled(MUIToolbar)({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  width: "184px",
  height: "40px",
  color: "#000",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderLeft: "4px solid #1565c0",
  backgroundColor: "white",
  borderRadius: "4px",
  padding: "8px,10px",
});

const IconButton = styled(MUIIconButton)({
  width: "30px",
  height: "30px",
  padding: "7px",
  color: "#000",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderLeft: "4px solid #1565c0",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "rgb(226, 236, 245)",
  },
});

const ConfigBar = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <IconButton edge="start" color="inherit">
            <ArrowForwardIcon />
          </IconButton>
          <IconButton edge="start" color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton edge="start" color="inherit">
            <RemoveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default ConfigBar;
