import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, TextField, Typography } from "@mui/material";

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
      <Typography sx={{ marginY: 2 }} component="h1" variant="h5">
        Date range picker
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="start date"
          disabled={disabled}
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <hr />
        <DatePicker
          label="end date"
          disabled={disabled}
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
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
