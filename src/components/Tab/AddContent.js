import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
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
      <form noValidate autoComplete="off">
        <InputLabel id="select-component">Select Component</InputLabel>
        <Select
          labelId="select-component"
          id="select-component"
          value={dropDownValue}
          onChange={handleChange}
          label="Age"
        >
          <br />
          <MenuItem value="" selected>
            <em>None</em>
          </MenuItem>
          <MenuItem value="formattedText">FormattedText</MenuItem>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="quotebox">Quotebox</MenuItem>
          <MenuItem value="callout">Callout</MenuItem>
        </Select>

        {dropDownValue === "formattedText" && <FormattedText />}
        {dropDownValue === "image" && <Image />}
        {dropDownValue === "callout" && <Callout />}
        {dropDownValue === "quotebox" && <QuoteBox />}
        <br />
      </form>
    </>
  );
};

export default AddContent;
