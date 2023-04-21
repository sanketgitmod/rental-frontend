import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserName from "./UserName";
import Wheels from "./Wheels";
import Vehicle from "./Vehicle";
import Model from "./Model";
import Picker from "./Picker";

const steps = [
  "What is your name",
  "Number of wheels",
  "Type of vehicle",
  "Specific Model",
  "Date range picker",
];

function RentalForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const [vehicle, setVehicle] = React.useState([]);
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    numberOfWheels: "",
    typeOfVehicle: "",
    specificModel: "",
    startDate: "",
    endDate: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    async function getCategory() {
      const response = await fetch(`http://localhost:4002/api/users`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    }
    getCategory();
  };

  function getName(userName) {
    setUserData((preUserData) => ({ ...preUserData, ...userName }));
  }
  function getWheels(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ numberOfWheels: data },
    }));
  }
  function getVehicle(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ typeOfVehicle: data.value },
    }));
    setVehicle(data.vehicle);
  }
  function getModel(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ specificModel: data.value },
    }));
  }
  function getDate(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ startDate: data.sDate, endDate: data.eDate },
    }));
  }

  React.useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:4002/api/category`);
      const data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);
  function showStep() {
    if (activeStep === 0) {
      return <UserName onHandelUserName={getName} />;
    }
    if (activeStep === 1) {
      return <Wheels categories={categories} onHandelWheels={getWheels} />;
    }
    if (activeStep === 2) {
      return (
        <Vehicle
          categories={categories}
          numberOfWheels={userData.numberOfWheels}
          onHandelVehicle={getVehicle}
        />
      );
    }
    if (activeStep === 3) {
      return (
        <Model
          vehicle={vehicle}
          typeOfVehicle={userData.typeOfVehicle}
          onHandelModel={getModel}
        />
      );
    }
    if (activeStep === 4) {
      return <Picker onHandelDate={getDate} />;
    }
  }

  return (
    <Box sx={{ marginY: 10, width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button
            variant="contained"
            sx={{ marginY: 10 }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          {showStep()}
          <Button
            variant="contained"
            sx={{ marginY: 10, float: "right" }}
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </Box>
  );
}

export default RentalForm;
