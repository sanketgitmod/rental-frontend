import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function Vehicle({ categories, setDisabled, numberOfWheels, onHandelVehicle }) {
  const [categoryId, setCategoryId] = React.useState("");
  const [vehicle, setVehicle] = React.useState([]);

  React.useEffect(() => {
    setDisabled();
  }, []);
  React.useEffect(() => {
    function getSubCatId() {
      const subCat = categories.find(
        (cat) => cat.categoryName === numberOfWheels
      );
      setCategoryId(subCat?._id.toString());
    }
    getSubCatId();
  }, []);
  React.useEffect(() => {
    async function getSubCategory() {
      const response = await fetch(
        `http://localhost:4002/api/sub-category/${categoryId}`
      );
      const data = await response.json();
      setVehicle(data);
    }
    getSubCategory();
  }, [categoryId]);
  function onChangeValue(event) {
    onHandelVehicle({ value: event.target.value, vehicle });
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
        Type of vehicle
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        onChange={onChangeValue}
        name="radio-buttons-group"
      >
        {vehicle.map((v) => (
          <FormControlLabel
            value={v.subCategoryName}
            control={<Radio />}
            label={v.subCategoryName}
            key={v._id}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Vehicle;
