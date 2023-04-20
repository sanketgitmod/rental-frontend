import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function Vehicle(props) {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Type of vehicle
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="sports"
        name="radio-buttons-group"
      >
        <FormControlLabel value="sports" control={<Radio />} label="sports" />
        <FormControlLabel value="cruiser" control={<Radio />} label="cruiser" />
      </RadioGroup>
    </FormControl>
  );
}

export default Vehicle;
