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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function showStep() {
    if (activeStep === 0) {
      return <UserName />;
    }
    if (activeStep === 1) {
      return <Wheels />;
    }
    if (activeStep === 2) {
      return <Vehicle />;
    }
    if (activeStep === 3) {
      return <Model />;
    }
    if (activeStep === 4) {
      return <Picker />;
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
