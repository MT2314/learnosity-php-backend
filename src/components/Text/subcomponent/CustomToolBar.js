import React, { useState, createContext } from "react";
import { Divider } from "@mui/material/";
import BoldDropdownButton from "./popupToolBar/BoldDropdownButton";
import ListDropdownButton from "./popupToolBar/ListDropdownButton";
import AlignDropdownButton from "./popupToolBar/AlignDropdownButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/CustomToolBar.scss";

//context to save state of active drop down items
export const ToolBarDropDowns = createContext();

const CustomToolBar = ({ toolbarId }) => {
  const [boldVisibility, setBoldVisibility] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [alignVisibility, setAlignVisibility] = useState(false);

  const [activeDropDownItem, setActiveDropDownItem] = useState("");
  const [activeTopMenu, setActiveTopMenu] = useState("");

  var icons = ReactQuill.Quill.import("ui/icons");
  icons["formula"] = (
    <img
      src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/pi.svg"
      alt="mathematical pi button for inserting equation"
    />
  );
  // below actually target the icons we want (don't use the classname, use actual name)
  // icons["formula"] =
  //   '<i class="fa-regular fa-pi fa-9x" style="color:#9b479f"></i>';
  // icons["italic"] = '<i class="fa-solid fa-italic"></i>';

  console.log(`====>`, activeDropDownItem);

  return (
    <ToolBarDropDowns.Provider
      value={[activeDropDownItem, setActiveDropDownItem]}
    >
      <div id={toolbarId} className="toolbarContainer">
        {/* bold dropdown starts */}
        <button
          onClick={() => {
            setBoldVisibility(!boldVisibility);
            setAlignVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "bold") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("bold");
            }
            setActiveDropDownItem("");
          }}
          aria-label="formatting button dropdown"
          className={
            activeTopMenu === "bold"
              ? "bold-dropdown-button ql-selected ql-active"
              : "bold-dropdown-button toolbar-button"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.2 10.2637C16.2377 9.54698 16.9651 8.37023 16.9651 7.27907C16.9651 4.8614 15.093 3 12.686 3H6V17.9767H13.5312C15.767 17.9767 17.5 16.1581 17.5 13.9223C17.5 12.2963 16.58 10.9056 15.2 10.2637ZM9.2093 5.67442H12.4186C13.3065 5.67442 14.0233 6.39116 14.0233 7.27907C14.0233 8.16698 13.3065 8.88372 12.4186 8.88372H9.2093V5.67442ZM12.9535 15.3023H9.2093V12.093H12.9535C13.8414 12.093 14.5581 12.8098 14.5581 13.6977C14.5581 14.5856 13.8414 15.3023 12.9535 15.3023Z"
              fill={activeTopMenu === "bold" ? "#1565c0" : "#232323"}
            />
            <rect
              x="6"
              y="19"
              width="11"
              height="2"
              fill={activeTopMenu === "bold" ? "#1565c0" : "#232323"}
            />
          </svg>
        </button>
        <BoldDropdownButton
          show={boldVisibility}
          aria-label="formatting options select dropdown"
          className="dropdown-content"
        ></BoldDropdownButton>

        {/* formula btn */}
        <button
          className={
            activeTopMenu === "math"
              ? "ql-formula ql-selected ql-active"
              : "ql-formula toolbar-button"
          }
          aria-label="math equation button"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "math") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("math");
            }
            setActiveDropDownItem("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="ql-formula"
          >
            <path
              d="M0.321167 5.7144L0.953631 5.76125C1.60952 5.01947 1.86719 2.82537 5.73225 3.25482C5.5917 12.6559 1.46897 13.6475 1.72664 15.5762C1.82034 16.6693 2.68705 17.3408 3.62403 17.3798C6.58334 17.2783 6.4506 13.2884 7.37197 3.2314H11.1902C10.9872 6.77632 10.4328 10.3212 10.3703 13.7959C10.4172 16.1071 11.8226 17.3408 13.6732 17.3564C16.7184 17.4579 17.6788 13.9052 17.6788 12.3904H17.0229C16.9604 13.6397 16.3592 14.5377 15.0787 14.5923C11.5884 14.6392 13.5092 8.45508 13.5326 3.27825L17.6788 3.30167L17.6554 0.654692C0.422354 0.571215 2.60971 0.233369 0.321167 5.7144Z"
              fill={activeTopMenu === "math" ? "#1565c0" : "#232323"}
            />
          </svg>
        </button>

        {/* alignment dropdown */}
        <button
          onClick={() => {
            setAlignVisibility(!alignVisibility);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "align") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("align");
            }
            setActiveDropDownItem("");
          }}
          className={
            activeTopMenu === "align"
              ? "ql-align ql-selected ql-active"
              : "toolbar-button"
          }
          aria-label="alignment buttons dropdown"
          value={activeDropDownItem}
          id="alignment-dropdown"
        >
          {activeDropDownItem === "left" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "left" ? "#1565c0" : "#232323"}
              />
            </svg>
          ) : activeDropDownItem === "center" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.55556 10.6667V12.4444H12.4444V10.6667H3.55556ZM0 16H16V14.2222H0V16ZM0 8.88889H16V7.11111H0V8.88889ZM3.55556 3.55556V5.33333H12.4444V3.55556H3.55556ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "center" ? "#1565c0" : "#232323"}
              />
            </svg>
          ) : activeDropDownItem === "right" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M0 16H16V14.2222H0V16ZM5.33333 12.4444H16V10.6667H5.33333V12.4444ZM0 8.88889H16V7.11111H0V8.88889ZM5.33333 5.33333H16V3.55556H5.33333V5.33333ZM0 0V1.77778H16V0H0Z"
                fill={activeDropDownItem === "right" ? "#1565c0" : "#232323"}
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.6667 10.6667H0V12.4444H10.6667V10.6667ZM10.6667 3.55556H0V5.33333H10.6667V3.55556ZM0 8.88889H16V7.11111H0V8.88889ZM0 16H16V14.2222H0V16ZM0 0V1.77778H16V0H0Z"
                fill="#232323"
              />
            </svg>
          )}
        </button>
        <AlignDropdownButton
          show={alignVisibility}
          className="dropdown-content"
          aria-label="alignment buttons options"
        />

        {/* bullets drowdown starts */}
        <button
          onClick={() => {
            setListVisibility(!listVisibility);
            setAlignVisibility(false);
            setBoldVisibility(false);
            if (activeTopMenu === "lists") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("lists");
            }
            setActiveDropDownItem("");
          }}
          className={
            activeTopMenu === "lists"
              ? "ql-selected ql-active toolbar-button"
              : "toolbar-button"
          }
          value="bullet"
          aria-label="list options select group"
        >
          <img
            src="https://content-solutions.s3.ca-central-1.amazonaws.com/karen/bullet_list.svg"
            alt="bullet list dropdown button"
          />
        </button>
        <ListDropdownButton
          show={listVisibility}
          className="dropdown-content"
          aria-label="list buttons dropdown"
        ></ListDropdownButton>

        {/* link btn and divider */}
        <Divider orientation="vertical" />
        <button
          aria-label="add link button"
          className="ql-link toolbar-button"
          onClick={() => {
            setAlignVisibility(false);
            setBoldVisibility(false);
            setListVisibility(false);
            if (activeTopMenu === "link") {
              setActiveTopMenu("");
            } else {
              setActiveTopMenu("link");
            }
            setActiveDropDownItem("");
          }}
          style={{
            backgroundColor:
              activeTopMenu === "link" ? "rgb(226, 236, 245)" : "",
          }}
        />
      </div>
    </ToolBarDropDowns.Provider>
  );
};

export default CustomToolBar;
