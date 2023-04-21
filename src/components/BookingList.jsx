import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function BookingList({ userData }) {
  return (
    <List>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Booking List
      </Typography>
      {userData.map((u) => (
        <ListItem key={u._id}>
          <ListItemText primary={u.firstName} />
          <ListItemText primary={u.lastName} />
          <ListItemText primary={u.numberOfWheels} />
          <ListItemText primary={u.typeOfVehicle} />
          <ListItemText primary={u.specificModel} />
          <ListItemText primary={new Date(u.startDate).toDateString()} />
          <ListItemText primary={new Date(u.endDate).toDateString()} />
        </ListItem>
      ))}
    </List>
  );
}

export default BookingList;
