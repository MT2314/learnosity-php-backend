import React, { useState, useRef } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

import {
  Paper,
  Button,
  Popper,
  Grow,
  AppBar,
  Toolbar,
  MenuItem,
  MenuList,
  IconButton,
  Tooltip,
} from "@mui/material";

import "../../Text/styles/Toolbar.scss";

// // ? Styled Container
// const Container = styled("div")(({}) => ({
//   position: "fixed !important",
//   top: "100px !important",
//   // left: "36% !important",
//   left: "50%",
//   transform: "translateX(-50%) !important",
//   zIndex: 1000,
//   gap: "10px",
//   "& .MuiPaper-root": {
//     backgroundColor: "transparent",
//   },
//   "& .StyledCard .MuiPaper-root": {
//     backgroundColor: "#fff",
//   },
// }));

// const StyledAppbar = styled(AppBar)({
//   display: "flex",
//   flexDirection: "row",
//   minHeight: "40px !important",
//   gap: "10px",
//   boxShadow: "none !important",
//   "& .MuiPaper-root": {
//     backgroundColor: "#fff",
//   },
// });

// const StyledFormatButton = styled(Button)({
//   display: "flex",
//   flexDirection: "row",
//   backgroundColor: "#FFF",
//   color: "#232323",
//   fontFamily: `"Inter", sans-serif`,
//   fontSize: "1rem",
//   fontWeight: "400",
//   lineHeight: "1.5rem",
//   letterSpacing: "0.009375rem",
//   width: "78px",
//   padding: "8px 10px",
//   whiteSpace: "nowrap",
//   textAlign: "center",
//   textTransform: "none",
//   boxShadow: "none",
//   "&:hover": {
//     background: "transparent",
//     boxShadow: "none",
//     color: "#1565C0",
//   },
//   "&:active": {
//     background: "transparent",
//     boxShadow: "none",
//     color: "#1565C0",
//   },
//   "&:focus-visible": {
//     background: "transparent",
//     boxShadow: "none",
//     color: "#1565C0",
//   },
//   "&:disabled": { background: "none" },
// });

// const StyledTableToolbar = styled(Toolbar)({
//   borderLeft: "4px solid #1565C0",
//   display: "flex",
//   justifyContent: "space-evenly",
//   minHeight: "40px !important",
//   margin: "10px, 7px",
//   backgroundColor: "#FFF",
//   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//   borderRadius: "4px",
//   paddingLeft: "0px",
//   paddingRight: "0px",
//   paddingLeft: "0px!important",
//   paddingRight: "0px!important",
//   "& .MuiToolbar-gutters": {
//     paddingLeft: "0px",
//     paddingRight: "0px",
//   },
// });

// const StyledFormControlLabel = styled(FormControlLabel)({
//   height: "24px",
//   whiteSpace: "nowrap",
//   fontFamily: `"Inter", sans-serif`,
//   fontSize: "1rem",
//   fontWeight: "400",
//   lineHeight: "1.5rem",
//   letterSpacing: "0.009375rem",
// });

const ToolBar = ({
  toolbar,
  setZebraStripes,
  zebraStripes,
  showTopHeader,
  showSideHeader,
  setShowTopHeader,
  setShowSideHeader,
  headerType,
}) => {
  const [showFormat, setShowFormat] = useState(false);

  const FormatRef = useRef(null);

  return (
    // <Container
    //   onClick={(e) => e.stopPropagation()}
    //   onFocus={(e) => e.stopPropagation()}
    //   className="ToolbarContainer"
    //   style={{
    //     "--active": toolbar ? "block" : "none",
    //   }}
    // >
    //   <StyledAppbar position="static">
    //     <StyledTableToolbar
    //       position="static"
    //       className="StyledToolbar"
    //       style={{
    //         "--width": "8.4375rem",
    //       }}
    //     >
    //       <Button className="SelectButton">
    //         <Tooltip aria-label="Format" title="Format" placement="top" arrow>
    //           <StyledFormatButton onClick={(e) => {setShowFormat(!showFormat)}}
    //           >Format
    //           </StyledFormatButton>
    //         </Tooltip>
    //       </Button>
    //       <Paper style={{
    //         "display": showFormat ? "block" :"none",
    //         "padding": "23px 26px",
    //         "width": "220px",
    //         "position": "absolute",
    //         "top": "41px",
    //         "left": "0px",
    //         "boxShadow": "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    //         "borderRadius": "4px",
    //         }}>
    //         <FormGroup sx={{ gap: "14px" }}>
    //           {headerType == "top-header" && (
    //             <FormControl>
    //               <Tooltip
    //                 aria-label="Show top headers"
    //                 title="Show top headers"
    //                 placement="top"
    //                 arrow
    //                 PopperProps={{
    //                   modifiers: [
    //                     {
    //                       name: "offset",
    //                       options: {
    //                         offset: [0, -7],
    //                       },
    //                     },
    //                   ],
    //                 }}
    //               >
    //                 <StyledFormControlLabel
    //                   control={
    //                     <Checkbox
    //                       onChange={() => setShowTopHeader(!showTopHeader)}
    //                       checked={!showTopHeader}
    //                       sx={{
    //                         "&:hover": {
    //                           bgcolor: "transparent",
    //                           color: "rgba(21, 101, 192, 1)",
    //                         },
    //                         "&.Mui-checked": {
    //                           bgcolor: "transparent",
    //                           color: "rgba(21, 101, 192, 1)",
    //                         },
    //                       }}
    //                     />
    //                   }
    //                   label="Show top headers"
    //                   size="small"
    //                 />
    //               </Tooltip>
    //             </FormControl>
    //           )}
    //           {headerType == "side-header" && (
    //             <FormControl>
    //               <Tooltip
    //                 aria-label="Show side headers"
    //                 title="Show side headers"
    //                 placement="top"
    //                 arrow
    //                 PopperProps={{
    //                   modifiers: [
    //                     {
    //                       name: "offset",
    //                       options: {
    //                         offset: [0, -7],
    //                       },
    //                     },
    //                   ],
    //                 }}
    //               >
    //                 <StyledFormControlLabel
    //                   control={
    //                     <Checkbox
    //                       onChange={() => setShowSideHeader(!showSideHeader)}
    //                       checked={!showSideHeader}
    //                       sx={{
    //                         "&:hover": {
    //                           bgcolor: "transparent",
    //                           color: "rgba(21, 101, 192, 1)",
    //                         },
    //                         "&.Mui-checked": {
    //                           bgcolor: "transparent",
    //                           color: "rgba(21, 101, 192, 1)",
    //                         },
    //                       }}
    //                     />
    //                   }
    //                   label="Show side headers"
    //                   size="small"
    //                 />
    //               </Tooltip>
    //             </FormControl>
    //           )}

    //           <FormControl>
    //             <Tooltip
    //               aria-label="Show zebra stripes"
    //               title="Show zebra stripes"
    //               placement="top"
    //               arrow
    //               PopperProps={{
    //                 modifiers: [
    //                   {
    //                     name: "offset",
    //                     options: {
    //                       offset: [0, -7],
    //                     },
    //                   },
    //                 ],
    //               }}
    //             >
    //               <StyledFormControlLabel
    //                 control={
    //                   <Checkbox
    //                     onChange={() => setZebraStripes(!zebraStripes)}
    //                     sx={{
    //                       "&:hover": {
    //                         bgcolor: "transparent",
    //                         color: "rgba(21, 101, 192, 1)",
    //                       },
    //                       "&.Mui-checked": {
    //                         bgcolor: "transparent",
    //                         color: "rgba(21, 101, 192, 1)",
    //                       },
    //                     }}
    //                   />
    //                 }
    //                 label="Show zebra stripes"
    //                 size="small"
    //               />
    //             </Tooltip>
    //           </FormControl>
    //         </FormGroup>
    //       </Paper>
    //     </StyledTableToolbar>
    //   </StyledAppbar>
    // </Container>
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
                              className="StyledFormConrolLabel"
                              control={
                                <Checkbox
                                  checked={!showTopHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTopHeader(!showTopHeader);
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
                              className="StyledFormConrolLabel"
                              control={
                                <Checkbox
                                  checked={!showSideHeader}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowSideHeader(!showSideHeader);
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
                            className="StyledFormConrolLabel"
                            control={
                              <Checkbox
                                checked={zebraStripes}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setZebraStripes(!zebraStripes);
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
