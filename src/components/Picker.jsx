import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Typography } from "@mui/material";

function Picker({ onHandelDate }) {
  const [startDate, setStartDate] = React.useState([]);
  const [endDate, setEndDate] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);

  function getDate() {
    setDisabled(true);
    onHandelDate({
      sDate: `${startDate.$y}-${startDate.$M}-${startDate.$D}`,
      eDate: `${endDate.$y}-${endDate.$M}-${endDate.$D}`,
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
      <Button variant="contained" sx={{ marginTop: 10 }} onClick={getDate}>
        Done
      </Button>
    </Box>
  );
}

export default Picker;
