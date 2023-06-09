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
import UserList from "./UserList";
import BookingList from "./BookingList";

const steps = [
  "What is your name",
  "Number of wheels",
  "Type of vehicle",
  "Specific Model",
  "Date range picker",
];

function RentalForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [bookingData, setBookingData] = React.useState([]);

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
    setActiveStep(0);
    setUserData({});
  };

  function changeDisabled() {
    setDisabled(true);
  }

  function getName(userName) {
    setUserData((preUserData) => ({ ...preUserData, ...userName }));
    setDisabled(false);
  }
  function getWheels(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ numberOfWheels: data },
    }));
    setDisabled(false);
  }
  function getVehicle(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ typeOfVehicle: data.value },
    }));
    setVehicle(data.vehicle);
    setDisabled(false);
  }
  function getModel(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ specificModel: data.value },
    }));
    setDisabled(false);
  }
  function getDate(data) {
    setUserData((preUserData) => ({
      ...preUserData,
      ...{ startDate: data.sDate, endDate: data.eDate },
    }));
    setDisabled(false);
  }

  React.useEffect(() => {
    async function getCategory() {
      const response = await fetch(`http://localhost:4002/api/category`);
      const data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);
  React.useEffect(() => {
    async function getBookings() {
      const response = await fetch(`http://localhost:4002/api/users`);
      const data = await response.json();
      setBookingData(data);
    }
    getBookings();
  }, [userData.endDate]);
  function showStep() {
    if (activeStep === 0) {
      return <UserName onHandelUserName={getName} />;
    }
    if (activeStep === 1) {
      return (
        <Wheels
          setDisabled={changeDisabled}
          categories={categories}
          onHandelWheels={getWheels}
        />
      );
    }
    if (activeStep === 2) {
      return (
        <Vehicle
          setDisabled={changeDisabled}
          categories={categories}
          numberOfWheels={userData.numberOfWheels}
          onHandelVehicle={getVehicle}
        />
      );
    }
    if (activeStep === 3) {
      return (
        <Model
          setDisabled={changeDisabled}
          vehicle={vehicle}
          typeOfVehicle={userData.typeOfVehicle}
          onHandelModel={getModel}
        />
      );
    }
    if (activeStep === 4) {
      return <Picker setDisabled={changeDisabled} onHandelDate={getDate} />;
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
          <Typography sx={{ mt: 2, mb: 1 }}>Confirm Booking.</Typography>
          <UserList userData={userData} />
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

          {showStep()}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
              marginLeft: 43,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ marginY: 5 }}
              onClick={handleNext}
              disabled={disabled}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
      <BookingList userData={bookingData} />
    </Box>
  );
}

export default RentalForm;
