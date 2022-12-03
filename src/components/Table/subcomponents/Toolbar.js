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

const ToolBar = ({ setColumnOrder, toolbar, selectedRow, selectedColumn }) => {
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

  const addRow = () => {
    const row = {};
    //Create number of rows depending on the number of columns
    [...Array(headers.length)].forEach((_, j) => {
      let type =
        state.headerType === "side-header" && j === 0 ? "title" : "cell";

      row[`column${j + 1}`] = { value: "", type };
    });

    console.log(data);

    selectedRow ? data.splice(+selectedRow.id + 1, 0, row) : data.push(row);
    dispatch({
      func: "ADD_ROW",
      data: data,
    });
  };

  const addColumn = () => {
    console.log(selectedColumn);
    const lastChar = selectedColumn.id.substr(selectedColumn.id.length - 1);

    // TanStack requires a header for each Column
    headers.push({
      accessorKey: `column${headers.length + 1}`,
      id: `column${headers.length + 1}`,
      header: "",
    });
    // Create number of columns depending on the number of rows
    [...Array(data.length)].forEach((_, j) => {
      let type =
        state.headerType === "top-header" && j === 0 ? "title" : "cell";
      // Columns inserted to each row.
      const currentRow = Object.keys(data[j]);
      for (let i = currentRow.length + 1; i > lastChar; i--) {
        if (+lastChar + 1 < i) {
          data[j][`column${i}`] = data[j][`column${i - 1}`];
        } else {
          data[j][`column${i}`] = { value: "", type };
        }
      }

      // data[j][`column${currentRow.length + 1}`] = {
      //   value: "",
      //   type,
      // };

      // [data[j][`column${currentRow.length + 1}`], data[j][`column${selectedColumn.index + 2}`]] = [
      //   data[j][`column${selectedColumn.index + 2}`],
      //   data[j][`column${currentRow.length + 1}`],
      // ];
    });

    const newOrder = Object.keys(data[0]);

    // Array.prototype.move = function (from, to) {
    //   this.splice(to, 0, this.splice(from, 1)[0]);
    // };

    // console.log(newOrder);
    // newOrder.move(newOrder.length - 1, lastChar)
    console.log(newOrder);

    setColumnOrder(newOrder);
    console.log(newOrder);
    // console.log(data)
    // console.log(headers)

    console.log(data);

    dispatch({
      func: "ADD_COL",
      headers: headers,
      data: data,
    });

    // console.log(headers[lastChar].id);
    // console.log(headers[newOrder.length - 1].id);
    // dispatch({
    //   func: "UPDATE_COLUMN_ORDER",
    //   draggedColumn: headers[lastChar].id,
    //   targetColumn: headers[newOrder.length - 1].id,
    // });
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
            "--grid-template-columns": "1fr 1fr 1fr",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
            "--width": "154px",
          }}
        >
          <Tooltip
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
          </Tooltip>
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
