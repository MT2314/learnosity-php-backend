import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import FormattedText from "../FormattedText";

const AddComponentTabs = () => {
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
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>

      {dropDownValue === "formattedText" && <FormattedText />}
    </>
  );
};

export default AddComponentTabs;
