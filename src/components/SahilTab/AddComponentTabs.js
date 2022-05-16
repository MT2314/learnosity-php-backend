import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import FormattedText from "../FormattedText";
import { TextField } from "@material-ui/core";

const AddComponentTabs = ({ data, setProp }) => {
  console.log("data:", data);
  const [dropDownValue, setDropDownValue] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setDropDownValue(event.target.value);
  };

  const addTab = (content = "formattedText", tabLabel) => {
    setProp({ tabs: [...data, { tabLabel, components: [<FormattedText/>] }] });
  };

  const handleSubmit = () => {
    addTab(dropDownValue, title);
  };
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Tab Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr />

        <InputLabel id="select-component">Select Component</InputLabel>
        <Select
          labelId="select-component"
          id="select-component"
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

        <Button onClick={handleSubmit} variant="outlined">
          Add Tab
        </Button>
      </form>
      {dropDownValue === "formattedText" && <FormattedText />}
    </>
  );
};

export default AddComponentTabs;
