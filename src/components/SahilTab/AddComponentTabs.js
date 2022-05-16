import React, { useState } from "react";
import { InputLabel, MenuItem, Select, Button } from "@mui/material";
import FormattedText from "../FormattedText";

const AddComponentTabs = ({ data, setProp, tabTitle, tabTitleNew, newTab }) => {
  const [dropDownValue, setDropDownValue] = useState("");
  const handleChange = (event) => {
    setDropDownValue(event.target.value);
  };

  const addTab = (content = "formattedText", tabLabel) => {
    if (content === "formattedText") {
      setProp({
        tabs: [...data, { tabLabel, components: [<FormattedText />] }],
      });
    } else {
      //TO DO: add options for other components
      setProp({
        tabs: [
          ...data,
          {
            tabLabel,
            components: ["The component you chose is not yet an option"],
          },
        ],
      });
    }
  };

  const handleSubmit = () => {
    if(newTab) {
        tabTitle = tabTitleNew
    }
    addTab(dropDownValue, tabTitle);
    setDropDownValue("");
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
          <MenuItem value="video">Video</MenuItem>
        </Select>

        <br />
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      </form>
      {/* {dropDownValue === "formattedText" && <FormattedText />} */}
      <hr />
    </>
  );
};

export default AddComponentTabs;
