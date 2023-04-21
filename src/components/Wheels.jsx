import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function Wheels({ categories, onHandelWheels }) {
  function onChangeValue(event) {
    onHandelWheels(event.target.value);
  }

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Number of wheels
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        onChange={onChangeValue}
        name="radio-buttons-group"
      >
        {categories.map((category) => (
          <FormControlLabel
            value={category.categoryName}
            control={<Radio />}
            label={category.categoryName}
            key={category._id}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Wheels;
