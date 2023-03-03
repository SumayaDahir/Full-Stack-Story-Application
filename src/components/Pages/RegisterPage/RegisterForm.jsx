import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./Register.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        profile_picture: profile_picture,
        email: email,
        password: password,
      },
    });
  }; // end registerUser

  // const handlePicture = (event) => {
  //   console.log("in event files" , event.target.files)
  //   setProfilePicture(event.target.files[0]);
  // }

  return (
    <div className="form-container">
      <form className="formPanel" onSubmit={registerUser}>
        <Typography className="formtext"
          style={{ color: "#3E2723" }}
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            padding: "15px",
            display: { md: "flex" },
            fontFamily: "Chilanka",
            fontWeight: 600,
            textDecoration: "none",
          }}>
          Register User
        </Typography>

        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
         <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
      
          <TextField
            label="Email"
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}></TextField>
</Grid>
<Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}></TextField>
</Grid>
<Grid item xs={12} >
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}></TextField>
</Grid>
<Grid item xs={12}>
          <TextField
            label="Upload Picture"
            type="text"
            name="profile_picture"
            value={profile_picture}
            required
            onChange={(event) =>
              setProfilePicture(event.target.value)
            }></TextField>
            </Grid>

          <Button sx={{
            borderRadius: 50,
            color: "white",
            margin:"10px"
          }}
             className="btn" type="submit" name="submit" value="Register" >
          Register
          </Button>

       </Grid>
      </form>
    </div>
  );
}

export default RegisterForm;
