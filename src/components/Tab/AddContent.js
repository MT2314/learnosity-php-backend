import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import FormattedText from "../FormattedText";
import Image from "../Image/Image";
import QuoteBox from "../QuoteBox/QuoteBox";
import Callout from "../Callout/Callout";

const AddContent = () => {
  const [dropDownValue, setDropDownValue] = useState("");
  const handleChange = (event) => {
    setDropDownValue(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Select Component
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={dropDownValue}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="formattedText">FormattedText</MenuItem>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="quotebox">Quotebox</MenuItem>
          <MenuItem value="callout">Callout</MenuItem>
        </Select>
      </FormControl>

      {dropDownValue === "formattedText" && <FormattedText />}
      {dropDownValue === "image" && <Image />}
      {dropDownValue === "callout" && <Callout />}
      {dropDownValue === "quotebox" && <QuoteBox />}
      <br />
    </>
  );
};

export default AddContent;
