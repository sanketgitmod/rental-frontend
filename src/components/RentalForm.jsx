import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
      return <h1>0</h1>;
    }
    if (activeStep === 1) {
      return <h1>1</h1>;
    }
    if (activeStep === 2) {
      return <h1>2</h1>;
    }
    if (activeStep === 3) {
      return <h1>3</h1>;
    }
    if (activeStep === 4) {
      return <h1>4</h1>;
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

            {showStep()}
          </Box>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </Box>
  );
}

export default RentalForm;
