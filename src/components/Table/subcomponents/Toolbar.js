import React, { useState, useRef, useContext } from "react";
import { LayoutContext } from "../TableContext";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import icons from "../assets/icons";

import {
  Paper,
  AppBar,
  Toolbar,
  MenuItem,
  ClickAwayListener,
  Divider,
  Button,
  IconButton,
  Popper,
  Grow,
  Tooltip,
  Card,
  MenuList,
} from "@mui/material";

import "../../Text/styles/Toolbar.scss";

const ToolBar = ({
  toolbar,
  selectSection,
  setToolbarRef,
  setSelectSection,
  toolbarRef,
  tableId,
}) => {
  const [state, dispatch] = useContext(LayoutContext);
  const [showFormat, setShowFormat] = useState(false);

  // If need state
  const [addRow, setaddRow] = useState(false);
  const [removeRow, setRemoveRow] = useState(false);

  const FormatRef = useRef(null);

  // show Zebra dispatch
  const showZebraStripes = () => {
    dispatch({
      func: "UPDATE_STRIP",
      showStripes: !state.showStripes,
    });
  };
  // show TopHeader dispatch
  const hideTopHeader = () => {
    dispatch({
      func: "UPDATE_TOPHEADER",
      hideTopHeader: !state.hideTopHeader,
    });
  };
  //  show Side Header dispatch
  const hideSideHeader = () => {
    dispatch({
      func: "UPDATE_SIDEHEADER",
      hideSideHeader: !state.hideSideHeader,
    });
  };
  const data = JSON.parse(JSON.stringify(state.data));
  const headers = JSON.parse(JSON.stringify(state.headers));

  const addRowFun = () => {
    const row = {};
    //Create number of rows depending on the number of columns
    [...Array(headers.length)].forEach((_, j) => {
      let type =
        state.headerType === "side-header" && j === 0 ? "title" : "cell";

      row[`column${j + 1}`] = { value: "", type };
    });

    // If null or a string, else push to the end. Need number
    selectSection == null || isNaN(parseFloat(selectSection))
      ? data.push(row)
      : data.splice(+selectSection + 1, 0, row);
    // If selected, splice into the middle.  Else push into the back.
    dispatch({
      func: "ADD_ROW",
      data: data,
    });
  };

  const addColFun = () => {
    // TanStack requires a header for each Column
    headers.push({
      accessorKey: `column${headers.length + 1}`,
      id: `column${headers.length + 1}`,
      header: "",
    });
    // Create number of loops depending on the number of rows
    [...Array(data.length)].forEach((_, j) => {
      let type =
        state.headerType === "top-header" && j === 0 ? "title" : "cell";
      const currentRowLen = Object.keys(data[j]).length; // The length of the current Row

      // If null or a number, else push to the end. Need string (exp column1)
      const lastChar =
        selectSection == null || !isNaN(parseFloat(selectSection))
          ? currentRowLen
          : selectSection.substr(selectSection.length - 1);

      for (let i = currentRowLen + 1; i > lastChar; i--) {
        if (+lastChar + 1 < i) {
          data[j][`column${i}`] = data[j][`column${i - 1}`]; // Move prev column into the back
        } else {
          data[j][`column${i}`] = { value: "", type }; //Add new column into each row
        }
      }
    });

    dispatch({
      func: "ADD_COL",
      headers: headers,
      data: data,
    });
  };

  // Esc key to close dropdown
  const onKeyDropDown = (e, currentRef) => {
    if (e.key === "Escape") {
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      ref={setToolbarRef}
      onBlur={(e) => {
        if (!toolbarRef.contains(e.relatedTarget || document.activeElement)) {
          setSelectSection(null);
        }
      }}
      className="ToolbarContainer"
      style={{
        "--active": toolbar ? "block" : "none",
      }}
      useMemo
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
          "--width": "351px",
        }}
      >
        <Toolbar
          position="static"
          className="StyledToolbar"
          style={{
            "--borderLeft": "4px solid #1565c0",
            "--grid-template-columns":
              "1fr 1fr 9px 1fr 1fr 9px 1fr 1fr 9px 56px 9px 1fr",
            "--justify-items": "center",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
            "--width": "351px",
          }}
        >
          {/* Add  ----  Rows / Columns      2btns*/}
          <Tooltip aria-label="Add row" title="Add Row" placement="top" arrow>
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                setShowFormat(false);
                data.length != 6 && addRowFun();
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`add-row-${tableId}`}
              aria-label="Add row to table"
            >
              {icons["addRow"]}
            </IconButton>
          </Tooltip>
          <Tooltip aria-label="Add column" title="Add Column" placement="top">
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !columnHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                headers.length != 6 && addColFun();
              }}
              // If needed to Add onKeyDown
              onKeyDown={(e) => {}}
              id={`add-column-${tableId}`}
              aria-label="add column to table"
            >
              {icons["addColumn"]}
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <div className="StyledDivider" />

          {/* Move  ----  Rows / Columns      4btns*/}
          {/* Move  ----  Columns      2btns*/}
          <Tooltip
            aria-label="Move column left"
            title="Move column left"
            placement="top"
            arrow
          >
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                console.log("Move column left");
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`left-column-${tableId}`}
              aria-label="Move column left"
            >
              {icons["arrowLeft"]}
            </IconButton>
          </Tooltip>
          <Tooltip
            aria-label="Move column right"
            title="Move column right"
            placement="top"
            arrow
          >
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                console.log("Move column right");
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`Right-column-${tableId}`}
              aria-label="Move column right"
            >
              {icons["arrowRight"]}
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <div className="StyledDivider" />

          {/* Move  ----  Rows      2btns*/}
          <Tooltip
            aria-label="Move row up"
            title="Move row up"
            placement="top"
            arrow
          >
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                console.log("Move row up");
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`up-row-${tableId}`}
              aria-label="Move row up"
            >
              {icons["arrowUp"]}
            </IconButton>
          </Tooltip>
          <Tooltip
            aria-label="Move row down"
            title="Move row down"
            placement="top"
            arrow
          >
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                console.log("Move row down");
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`down-row-${tableId}`}
              aria-label="Move row down"
            >
              {icons["arrowDown"]}
            </IconButton>
          </Tooltip>
          {/* Divider */}
          <div className="StyledDivider" />
          {/* Format */}
          {/* <Tooltip
            aria-label="Add Rows"
            title="Add Rows"
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
                data.length != 6 && addRow();
              }}
              className="SelectButton"
              style={{
                "--width": "100%",
                "--height": "100%",
                "--font-size": "16px",
                "--grid-template-columns": "1fr",
                "--hover-background-color": "transparent",
              }}
            >
              +
            </Button>
          </Tooltip>
          <Tooltip
            aria-label="Add Column"
            title="Add Column"
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
                headers.length != 6 && addColumn();
              }}
              className="SelectButton"
              style={{
                "--width": "100%",
                "--height": "100%",
                "--font-size": "16px",
                "--grid-template-columns": "1fr",
                "--hover-background-color": "transparent",
              }}
            >
              +|
            </Button>
          </Tooltip> */}
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
                "--width": "54px",
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
                      "--padding": "8px 0",
                    }}
                  >
                    <FormGroup
                      sx={{ gap: "14px", margin: "8px 16px !important" }}
                    >
                      {/* Top Header */}
                      {state.headerType == "top-header" && (
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
                                  checked={!state.hideTopHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    hideTopHeader();
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
                      {state.headerType == "side-header" && (
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
                                  checked={!state.hideSideHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    hideSideHeader();
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
                          title="show zebra stripes"
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
          {/* Divider */}
          <div className="StyledDivider" />
          {/* Kebab */}
          <Tooltip aria-label="Add Row" title="Add Row" placement="top" arrow>
            <IconButton
              className="StyledIconButton"
              style={
                {
                  // "--active": "rgba(21, 101, 192, 1)",
                }
              }
              // disabled={
              //   !rowHasFocus
              // }
              disableRipple
              color="inherit"
              onClick={() => {
                setaddRow(!addRow);
                setShowFormat(false);
              }}
              // If needed to add onKeyDown
              onKeyDown={(e) => {}}
              id={`add-row-${tableId}`}
              aria-label="Add row to table"
            >
              {icons["kebab"]}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default React.memo(ToolBar);
