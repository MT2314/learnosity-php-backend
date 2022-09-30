import React, { useContext } from "react"
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { tooltipClasses } from "@mui/material/Tooltip";
import { IconButton, Toolbar, AppBar, Tooltip } from "@mui/material";
import { ArrowDownward, ArrowUpward, Add, Remove } from "@mui/icons-material";
import { LayoutContext } from "../../../Context/InteractivesContext";

// * Styled Components
// ? Styled Container for configBar
const Container = styled("div")({
    display: "absolute",
    color: "white",
});


// ? Styled Tooltip, differnet but most compact method for styling tooltip
const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(97, 97, 97, 0.9)",
        border: "4px",
        color: "#fff",
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
const StyledToolbar = styled(Toolbar)({
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
    minHeight: "32px !important",
    "& .MuiToolbar-gutters": {
        paddingLeft: 0,
        paddingRight: 0,
    },
});

const StyledIconButton = styled(IconButton)({
    width: "30px",
    height: "30px",
    padding: "7px",
    color: "#000",
    backgroundColor: "none",
    borderRadius: "4px!important",
    "&:hover": {
        backgroundColor: "rgba(21, 101, 192, 0.12) !important",
    },
    "&:active": {
        cursor: "pointer",
        backgroundColor: "rgba(21, 101, 192, 0.12) !important",
        "> svg": {
            color: "#1565c0 !important",
        },
    },
});


const ConfigBar = ({ paneIndex, setPaneIndex }) => {

    const [state, dispatch] = useContext(LayoutContext)

    const addTab = (state) => {
        dispatch({
            func: "ADD_LAYER",
            id: uuidv4(),
            title: `Pane ${state.length + 1}`,
            expanded: false
        });
    };

    const moveAccordionDown = () => {
        dispatch({
            func: "MOVE_PANE_DOWN",
            title: `Pane at position ${paneIndex} is now at position ${paneIndex + 1}`,
            paneIndex: paneIndex,
            nextPane: paneIndex + 1,
        });
        setPaneIndex(paneIndex + 1)
    }

    const moveAccordionUp = () => {
        dispatch({
            func: "MOVE_PANE_UP",
            title: `Pane at position ${paneIndex} is now at position ${paneIndex + 1}`,
            paneIndex: paneIndex,
            nextPane: paneIndex + 1,
        });
        setPaneIndex(paneIndex - 1)
    }

    return (
        <Container>
            <AppBar position="static">
                <StyledToolbar variant="dense" disableGutters test-id="accordion-toolbar">
                    <StyledTooltip title="move pane down" arrow placement="top">
                        <StyledIconButton
                            disableRipple
                            color="inherit"
                            onClick={() => moveAccordionDown(state)}
                            disabled={paneIndex === state.length - 1}
                        >
                            <ArrowDownward />
                        </StyledIconButton>
                    </StyledTooltip>
                    <StyledTooltip title="move pane up" arrow placement="top">
                        <StyledIconButton
                            disableRipple
                            color="inherit"
                            onClick={() => moveAccordionUp(state)}
                            disabled={paneIndex === 0}
                        >
                            <ArrowUpward />
                        </StyledIconButton>
                    </StyledTooltip>
                    <StyledTooltip title="add pane" arrow placement="top">
                        <StyledIconButton
                            disableRipple
                            color="inherit"
                            onClick={() => {
                                addTab(state);
                            }}
                        >
                            <Add />
                        </StyledIconButton>
                    </StyledTooltip>
                    <StyledTooltip title="remove current pane" arrow placement="top">
                        <StyledIconButton
                            disableRipple
                            color="inherit"
                        >
                            <Remove />
                        </StyledIconButton>
                    </StyledTooltip>
                </StyledToolbar>
            </AppBar>
        </Container>
    );
}

export default ConfigBar