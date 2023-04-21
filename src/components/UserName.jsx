import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function UserName(props) {
  const [userName, setUserName] = React.useState({
    firstName: "",
    lastName: "",
  });

  function getFirstName(e) {
    setUserName({ ...userName, firstName: e.target.value });
  }
  function getLastName(e) {
    setUserName({ ...userName, lastName: e.target.value });
  }
  function getName() {
    if (userName.firstName.length > 2 && userName.lastName.length > 2) {
      props.onHandelUserName(userName);
    }
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
        What is your name
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="First Name"
          name="firstname"
          autoFocus
          onChange={getFirstName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Last Name"
          name="lastname"
          onChange={getLastName}
          onBlur={getName}
        />
      </Box>
    </Box>
  );
}

export default UserName;
