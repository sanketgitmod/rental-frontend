import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function Model({ vehicle, typeOfVehicle, onHandelModel }) {
  const [mastspecId, setMastspecId] = React.useState([]);
  const [masterSpec, setMasterSpec] = React.useState([]);

  React.useEffect(() => {
    async function getMasterSpec() {
      const response = await fetch(
        `http://localhost:4002/api/master-specification/${mastspecId}`
      );
      const data = await response.json();
      setMasterSpec(data);
    }
    getMasterSpec();
  }, [mastspecId]);
  React.useEffect(() => {
    function getMasterSpecId() {
      const subCat = vehicle.find((v) => v.subCategoryName === typeOfVehicle);
      setMastspecId(subCat?._id.toString());
    }
    getMasterSpecId();
  }, []);
  function onChangeValue(event) {
    onHandelModel({ value: event.target.value, masterSpec });
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
        Specific Model
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        onChange={onChangeValue}
        name="radio-buttons-group"
      >
        {masterSpec.map((m) => (
          <FormControlLabel
            value={m.masterSpecificationName}
            control={<Radio />}
            label={m.masterSpecificationName}
            key={m.masterSpecificationName}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Model;
