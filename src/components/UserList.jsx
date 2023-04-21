import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
function UserList({ userData }) {
  return (
    <List>
      <ListItem>
        <ListItemText primary={userData.firstName} />
        <ListItemText primary={userData.lastName} />
        <ListItemText primary={userData.numberOfWheels} />
        <ListItemText primary={userData.typeOfVehicle} />
        <ListItemText primary={userData.specificModel} />
        <ListItemText primary={userData.startDate} />
        <ListItemText primary={userData.endDate} />
      </ListItem>
    </List>
  );
}

export default UserList;
