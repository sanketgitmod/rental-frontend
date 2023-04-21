import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Typography } from "@mui/material";

function Picker({ onHandelDate, setDisabled }) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [disabled, setButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    setDisabled();
  }, []);
  function getDate() {
    setButtonDisabled(true);
    onHandelDate({
      sDate: new Date(startDate.toString()).toLocaleDateString(),
      eDate: new Date(endDate.toString()).toLocaleDateString(),
    });
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Date range picker
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="start date"
            disabled={disabled}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="end date"
            disabled={disabled}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        variant="contained"
        disabled={!(endDate && startDate) ? true : false}
        sx={{ marginTop: 10 }}
        onClick={getDate}
      >
        Save Date
      </Button>
    </Box>
  );
}

export default Picker;
