import React, { useState, useRef, useContext, useEffect } from "react";
import { LayoutContext } from "../TableContext";
// Icons
import icons from "../assets/icons";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  Paper,
  AppBar,
  Card,
  Toolbar,
  MenuItem,
  ClickAwayListener,
  Button,
  IconButton,
  Popper,
  Grow,
  Tooltip,
  MenuList,
} from "@mui/material";

import "../../Text/styles/Toolbar.scss";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const ToolBar = ({
  toolbar,
  selectSection,
  setToolbarRef,
  setSelectSection,
  setSelectedCell,
  selectedCell,
  toolbarRef,
  tableId,
}) => {
  const [state, dispatch] = useContext(LayoutContext);

  // Format Popper State
  const [showFormat, setShowFormat] = useState(false);

  // Kebab Popper State
  const [openKebab, setOpenKebab] = useState(false);

  // ? Alignment Dropdown Open/Close State
  const [activeTopMenu, setActiveTopMenu] = useState(false);
  //  ? Alignment Dropdown Selection State
  const [activeHorizontalAlignment, setActiveHorizontalAlignment] = useState();
  const [activeVerticalAlignment, setActiveVerticalAlignment] = useState();

  // Refs
  const AlignRef = useRef(null);
  const FormatRef = useRef(null);
  const KebabRef = useRef(null);

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

  // Data = Array of objects representing each row, object keys are column1, column2, etc. properties are value and type
  // { column1: {value: "", type: "cell"}, column2: {value: "", type: "cell"} }
  const data = JSON.parse(JSON.stringify(state.data));

  // Header = Array of objects defining each Column (column1, column2, etc., no information)
  // { accessorKey: "column1", id: "column1", header: "" }
  const headers = JSON.parse(JSON.stringify(state.headers));

  // Add Row Function
  const addRowFun = () => {
    const row = {};
    //Loop through columns and define row object at each index
    [...Array(headers.length)].forEach((_, j) => {
      // If side header, make column1 type a title else all cells
      let type =
        state.headerType === "side-header" && j === 0 ? "title" : "cell";

      // Added row object at current column index if side-header {column1: {value: "", type: "title"}
      row[`column${j + 1}`] = { value: "", type };
    });
    // Example of row object
    // row = {column1: {value: "", type: "title"}

    // If no section is selected, push into the back.  Else splice below selectedSection
    // selectedSection = is the index of the selected row
    selectSection == null || isNaN(parseFloat(selectSection))
      ? data.push(row)
      : data.splice(+selectSection + 1, 0, row);

    setSelectSection(`${parseFloat(selectSection) + 1}`);

    // Dispatch the new data to the table
    dispatch({
      func: "ADD_ROW",
      data: data,
    });
  };

  // Add Column Function
  const addColFun = () => {
    // Define new column name (column1, column2, etc.)
    const newColName = `column${headers.length + 1}`;

    // Add new column to the headers object  (headers object is an array of objects defining columns)
    headers.push({
      accessorKey: newColName,
      id: newColName,
      header: "",
    });

    // Loop through rows and define new row properties { column1: {value: "", type: "cell" }
    [...Array(data.length)].forEach((_, j) => {
      // If top header, the firt row has each column type as a title
      let type =
        state.headerType === "top-header" && j === 0 ? "title" : "cell";

      // The length of the current Row (number of columns in the row)
      const currentRowLen = Object.keys(data[j]).length;

      // Index of new column,  if no column selected last column otherwise after selected column
      const addedColumnIndex =
        selectSection == null || !isNaN(parseFloat(selectSection))
          ? currentRowLen
          : selectSection.substr(selectSection.length - 1);

      // Highlight Added Column
      setSelectSection(`column${+addedColumnIndex + 1}`);
      // Set loop pointer on last column in row and move backward until you hit index of new column
      for (let i = currentRowLen + 1; i > addedColumnIndex; i--) {
        // If selected column is before current pointer, make current pointer equal to the previous column
        if (+addedColumnIndex + 1 < i) {
          data[j][`column${i}`] = data[j][`column${i - 1}`]; // Move prev column into the back
        }
        // if current column is selected column, add new column into the row
        else {
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

  // Delete Column
  const deleteColumn = () => {
    // Filter out the selected column from the headers
    const filteredHeaders = headers.filter(
      (el) => el.accessorKey != selectSection
    );

    // Filter out the selected column from the data
    data.forEach((element) => {
      delete element[selectSection];
    });

    // Iterate data and reassign column names
    data.forEach((row, j) => {
      Object.keys(row).forEach((column, index) => {
        let currentIndex = `${column.replace(/[^0-9]/g, "")}`;
        let newKey = `column${index + 1}`;

        if (index + 1 < +currentIndex) {
          data[j][newKey] = data[j][column];
          delete data[j][column];
        }
      });
    });

    // Iterate headers and reassign column names
    filteredHeaders.forEach((column, j) => {
      if (column.accessorKey !== `column${j + 1}`) {
        filteredHeaders[j].accessorKey = `column${j + 1}`;
        filteredHeaders[j].id = `column${j + 1}`;
      }
    });

    // If selected column is the last column, select the previous column after deleting
    parseFloat(selectSection.replace(/[^0-9]/g, "")) == headers.length &&
      setSelectSection(`column${filteredHeaders.length}`);

    dispatch({
      func: "DELETE_COLUMN",
      headers: filteredHeaders,
      data: data,
    });
  };

  // Delete Row
  const deleteRow = () => {
    let int = parseInt(selectSection, 10);
    // // Filter out the selected row from the data

    const newData = data.filter((el, i) => i !== int);

    // If selected column is the last column, select the previous column after deleting
    int == data.length - 1 && setSelectSection(`${newData.length - 1}`);

    dispatch({
      func: "DELETE_ROW",
      headers: headers,
      data: newData,
    });
  };

  // Esc key to close dropdown
  const onKeyDropDown = (e, currentRef) => {
    if (e.key === "Escape") {
    }
  };

  // Close dropdown when click outside
  const closeDropDown = (e) => {
    setOpenKebab(false);
    setShowFormat(false);
  };

  // Handle Toolbar Alignment State Change
  const handleAlignmentChange = () => {
    selectedCell &&
      console.log(
        "draft",
        state.data[selectedCell.row][`column${selectedCell.col}`]
      );
    // let currentAlignment;

    // if (activeHorizontalAlignment) {
    //   currentAlignment = activeHorizontalAlignment;
    // } else {
    //   currentAlignment = state.alignment;
    //   setActiveHorizontalAlignment(state.alignment);
    // }
    selectedCell &&
      dispatch({
        func: "CHANGE_ALIGNMENT",
        selectedCell: selectedCell,
        activeHorizontalAlignment: activeHorizontalAlignment,
        activeVerticalAlignment: activeVerticalAlignment,
      });
  };
  useEffect(() => {
    handleAlignmentChange(activeHorizontalAlignment, activeVerticalAlignment);
  }, [activeHorizontalAlignment, activeVerticalAlignment]);

  // Kebab Menu
  const KebabActions = [
    {
      name: "Duplicate Row",
      key: "1",
      func: () => console.log("Duplicate Row"),
      disabled: true,
    },
    {
      name: "Duplicate Column",
      key: "2",
      func: () => console.log("Duplicate Column"),
      disabled: true,
    },
    {
      name: "Delete Row",
      key: "3",
      func: deleteRow,
      disabled:
        data.length <= 2 ||
        selectSection === null ||
        selectSection.toString().startsWith("column") ||
        (selectSection === "0" && data[0].column2.type === "title"),
    },
    {
      name: "Delete Column",
      key: "4",
      func: deleteColumn,
      disabled:
        headers.length <= 2 ||
        selectSection?.replace(/[^0-9]/g, "") === "0" ||
        (selectSection !== null &&
          !selectSection.toString().startsWith("column")) ||
        selectSection == null ||
        (selectSection === "column1" && data[0].column2.type === "cell"),
    },
  ];

  const switchAlignment = (e) => {
    switch (
      state.data[selectedCell.row][`column${selectedCell.col + 1}`]
        .activeHorizontalAlignment
    ) {
      case "left-align":
        return icons["align"];
      case "right-align":
        return icons["right"];
      case "center-align":
        return icons["center"];
      default:
        return icons["align"];
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
          "--width": selectSection ? "351px" : "117px",
        }}
      >
        <Toolbar
          position="static"
          className="StyledToolbar"
          style={{
            "--borderLeft": "4px solid #1565c0",
            "--grid-template-columns": selectSection
              ? "1fr 1fr 9px 1fr 1fr 9px 1fr 1fr 9px 56px 9px 1fr"
              : "1fr 9px 69px ",
            "--justify-items": "center",
            "--boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
            "--width": selectSection ? "351px" : "117px",
          }}
        >
          {/* Add  ----  Rows / Columns      2btns*/}
          {selectSection !== null && (
            <>
              <Tooltip
                aria-label="Add row"
                title="Add Row"
                placement="top"
                arrow
              >
                <IconButton
                  className="StyledIconButton"
                  style={{
                    "--disabled": "rgba(0, 0, 0, 0.38)",
                  }}
                  disabled={
                    data.length >= 6 ||
                    selectSection === null ||
                    selectSection?.toString().startsWith("column")
                  }
                  disableRipple
                  color="inherit"
                  onClick={() => {
                    closeDropDown();
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
              <Tooltip
                aria-label="Add column"
                title="Add Column"
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
                  disabled={
                    headers.length >= 6 ||
                    selectSection === null ||
                    !selectSection.toString().startsWith("column")
                  }
                  disableRipple
                  color="inherit"
                  onClick={() => {
                    closeDropDown();
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
                  disableRipple
                  color="inherit"
                  onClick={() => {
                    closeDropDown();
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
                    closeDropDown();
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
                    closeDropDown();
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
                    closeDropDown();
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
            </>
          )}

          {/* Align Text */}
          {selectedCell &&
            console.log(
              state.data[selectedCell.row][`column${selectedCell.col + 1}`]
            )}
          {selectSection === null && (
            <>
              <Tooltip
                aria-label="alignment"
                title="alignment"
                placement="top"
                arrow
              >
                <IconButton
                  ref={AlignRef}
                  disableRipple
                  color="inherit"
                  onClick={() => {
                    if (activeTopMenu) {
                      setActiveTopMenu(false);
                    } else {
                      setActiveTopMenu(true);
                    }
                    setShowFormat(false);
                  }}
                  className={"StyledIconButton"}
                  style={{
                    "--active": activeTopMenu
                      ? "rgba(21, 101, 192, 1)"
                      : "#000",
                    "--background": activeTopMenu
                      ? "rgba(21, 101, 192, 0.12)"
                      : "#fff",
                  }}
                  aria-label="alignment buttons dropdown"
                >
                  {selectedCell
                    ? icons[
                        state.data[selectedCell.row][
                          `column${selectedCell.col + 1}`
                        ].horizontalAlignment
                      ]
                    : icons["left-align"]}
                </IconButton>
              </Tooltip>
              <AlignDropdownButton
                aria-label="alignment buttons options"
                activeTopMenu={activeTopMenu}
                setActiveHorizontalAlignment={setActiveHorizontalAlignment}
                setActiveVerticalAlignment={setActiveVerticalAlignment}
                activeHorizontalAlignment={activeHorizontalAlignment}
                activeVerticalAlignment={activeVerticalAlignment}
              />
              {/* Divider */}
              <div className="StyledDivider" />
            </>
          )}
          {/* Format */}
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
                setOpenKebab(false);
                setActiveTopMenu(false);
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
                  <ClickAwayListener onClickAway={() => setShowFormat(false)}>
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
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          {selectSection !== null && (
            <>
              {/* Divider */}
              <div className="StyledDivider" />
              {/* Kebab */}
              <Tooltip
                aria-label="Table control options"
                title="Table control options"
                placement="top"
                arrow
              >
                <IconButton
                  className="StyledIconButton"
                  ref={KebabRef}
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
                    setOpenKebab(!openKebab);
                    setShowFormat(false);
                  }}
                  // If needed to add onKeyDown
                  onKeyDown={(e) => {}}
                  id={`table-control-${tableId}`}
                  aria-label="Table control options"
                >
                  {icons["kebab"]}
                </IconButton>
              </Tooltip>
              <Popper
                open={openKebab}
                anchorEl={KebabRef.current}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper
                      elevation={0}
                      className="StyledSelectPaper"
                      style={{
                        "--width": "165px",
                        "--height": "160px",
                        "--margin-left": "0px",
                        "--margin-top": "7px",
                      }}
                    >
                      <ClickAwayListener
                        onClickAway={() => setOpenKebab(false)}
                      >
                        <MenuList
                          // autoFocusItem={openKebab}
                          data-testid="table-kebab-dropdown"
                          onKeyDown={onKeyDropDown}
                          className="StyledMenu"
                          style={{
                            "--gridTemplateRows": "1fr 1fr 1fr 1fr",
                            "--padding": "8px 0px",
                            "--justifyItems": "start",
                            "--width": "165px",
                          }}
                        >
                          {KebabActions.map((action, index) => {
                            return (
                              <MenuItem
                                key={action.key}
                                value={action.name}
                                onClick={() => action.func()}
                                className="StyledMenuItem"
                                data-testid={`${action.name} option`}
                                style={{
                                  "--height": "36px",
                                  "--width": "165px",
                                }}
                                disabled={action.disabled}
                              >
                                {action.name}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default React.memo(ToolBar);

const AlignDropdownButton = ({
  activeTopMenu,
  activeHorizontalAlignment,
  setActiveHorizontalAlignment,
  activeVerticalAlignment,
  setActiveVerticalAlignment,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        display: activeTopMenu ? "flex" : "none",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        bottom: "-84px",
        borderRadius: "4px",
        flexDirection: "column",
        backgroundColor: "#fff",
        width: "112px",
        height: "80px",
      }}
    >
      {/* Horizontal Align */}
      <Card
        elevation={0}
        className="StyledCard"
        style={{
          "--card-display": activeTopMenu ? "flex" : "none",
          bottom: "42px",
          "--box-shadow": "none",
          "--width": "112px",
        }}
      >
        <Tooltip
          aria-label="align left"
          title="align left"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            value="left-align"
            color="inherit"
            aria-label="left align"
            onClick={() => {
              setActiveHorizontalAlignment("left-align");
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeHorizontalAlignment === "left-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeHorizontalAlignment == "left-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["align"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="align center"
          title="align center"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="align center"
            value="center-align"
            onClick={() => {
              if (activeHorizontalAlignment === "center-align") {
                setActiveHorizontalAlignment("left-align");
              } else {
                setActiveHorizontalAlignment("center-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeHorizontalAlignment === "center-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeHorizontalAlignment == "center-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["center"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="align right"
          title="align right"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="right align"
            value="right-align"
            onClick={() => {
              if (activeHorizontalAlignment === "right-align") {
                setActiveHorizontalAlignment("left-align");
              } else {
                setActiveHorizontalAlignment("right-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeHorizontalAlignment === "right-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeHorizontalAlignment == "right-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["right"]}
          </IconButton>
        </Tooltip>
      </Card>
      <div className="StyledDividerHorizontal" />
      {/* Vertical Align */}
      <Card
        elevation={0}
        className="StyledCard"
        style={{
          "--card-display": activeTopMenu ? "flex" : "none",
          "--box-shadow": "none !important",
          "--width": "112px",
          bottom: "0px",
        }}
      >
        <Tooltip aria-label="align top" title="align top" placement="top" arrow>
          <IconButton
            disableRipple
            value="top-align"
            color="inherit"
            aria-label="top align"
            onClick={() => {
              if (setActiveVerticalAlignment === "top-align") {
                setActiveVerticalAlignment("middle-align");
              } else {
                setActiveVerticalAlignment("top-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeVerticalAlignment === "top-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeVerticalAlignment == "top-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["top-align"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="align middle"
          title="align middle"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="align middle"
            value="middle-align"
            onClick={() => {
              if (setActiveVerticalAlignment === "middle-align") {
                setActiveVerticalAlignment("middle-align");
              } else {
                setActiveVerticalAlignment("middle-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeVerticalAlignment === "middle-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeVerticalAlignment == "middle-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["middle-align"]}
          </IconButton>
        </Tooltip>
        <Tooltip
          aria-label="align bottom"
          title="align bottom"
          placement="top"
          arrow
        >
          <IconButton
            disableRipple
            aria-label="bottom align"
            value="bottom-align"
            onClick={() => {
              if (setActiveVerticalAlignment === "bottom-align") {
                setActiveVerticalAlignment("left-align");
              } else {
                setActiveVerticalAlignment("bottom-align");
              }
            }}
            className={"StyledIconButton"}
            style={{
              "--active":
                activeVerticalAlignment === "bottom-align"
                  ? "rgba(21, 101, 192, 1)"
                  : "#000",
              "--background":
                activeVerticalAlignment === "bottom-align"
                  ? "rgba(21, 101, 192, 0.12)"
                  : "#fff",
            }}
          >
            {icons["bottom-align"]}
          </IconButton>
        </Tooltip>
      </Card>
    </div>
  );
};
