import React, { useState, useRef, useContext } from "react";
import { LayoutContext } from "../TableContext";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  Paper,
  Button,
  Popper,
  Grow,
  AppBar,
  Toolbar,
  MenuList,
  Tooltip,
} from "@mui/material";

import "../../Text/styles/Toolbar.scss";

const ToolBar = ({ toolbar, headerType }) => {
  const [state, dispatch] = useContext(LayoutContext);
  const [showFormat, setShowFormat] = useState(false);
  const FormatRef = useRef(null);

  // show Zebra dispatch
  const showZebraStripes = () => {
    dispatch({
      func: "UPDATE_STRIP",
      showStripes: !state.showStripes,
    });
  };
  // show TopHeader dispatch
  const showTopHeader = () => {
    dispatch({
      func: "UPDATE_TOPHEADER",
      showTopHeader: !state.showTopHeader,
    });
  };
  //  show Side Header dispatch
  const showSideHeader = () => {
    dispatch({
      func: "UPDATE_SIDEHEADER",
      showSideHeader: !state.showSideHeader,
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      className="ToolbarContainer"
      style={{
        "--active": toolbar ? "block" : "none",
      }}
    >
      <AppBar
        position="static"
        className="StyledAppbar"
        elevation={0}
        style={{
          "--display": "flex",
          "--direction": "row",
          "--gap": "10px",
          "--boxShadow": "none !important",
          "--width": "154px",
        }}
      >
        <Toolbar
          position="static"
          className="StyledToolbar"
          style={{
            "--borderLeft": "4px solid #1565c0",
            "--grid-template-columns": "1fr",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
            "--width": "154px",
          }}
        >
          <Tooltip
            aria-label="Format"
            title="Format"
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
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button
              onClick={(e) => {
                setShowFormat(!showFormat);
              }}
              ref={FormatRef}
              className="SelectButton"
              style={{
                "--width": "100%",
                "--height": "100%",
                "--font-size": "16px",
                "--grid-template-columns": "1fr",
                "--hover-background-color": "transparent",
              }}
            >
              Format
            </Button>
          </Tooltip>
          <Popper
            open={showFormat}
            anchorEl={FormatRef.current}
            placement="bottom-start"
            transition
            disablePortal
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [-5, -5],
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper>
                  <MenuList
                    data-testid="format-settings-dropdown"
                    aria-labelledby="Format Settings"
                    className="StyledCheckboxMenu"
                    style={{
                      "--width": "220px",
                      "--height": "auto",
                    }}
                  >
                    <FormGroup sx={{ gap: "14px" }}>
                      {/* Top Header */}
                      {headerType == "top-header" && (
                        <FormControl>
                          <Tooltip
                            aria-label="show top header"
                            title="show top header"
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
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <FormControlLabel
                              className="StyledFormControlLabel"
                              control={
                                <Checkbox
                                  checked={!state.showTopHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    showTopHeader();
                                  }}
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
                              label="Show top header"
                              size="small"
                            />
                          </Tooltip>
                        </FormControl>
                      )}
                      {/* Side Header */}
                      {headerType == "side-header" && (
                        <FormControl>
                          <Tooltip
                            aria-label="show side header"
                            title="show side header"
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
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <FormControlLabel
                              className="StyledFormControlLabel"
                              control={
                                <Checkbox
                                  checked={!state.showSideHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    showSideHeader();
                                  }}
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
                              label="Show side header"
                              size="small"
                            />
                          </Tooltip>
                        </FormControl>
                      )}
                      {/* Zebra Stripes */}
                      <FormControl>
                        <Tooltip
                          aria-label="show zebra stripes"
                          title="show zebra stripesr"
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <FormControlLabel
                            className="StyledFormControlLabel"
                            control={
                              <Checkbox
                                checked={state.showStripes}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showZebraStripes();
                                }}
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
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default React.memo(ToolBar);
