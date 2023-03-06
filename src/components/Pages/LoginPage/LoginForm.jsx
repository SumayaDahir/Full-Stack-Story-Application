import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { TextField, Typography , Button} from '@mui/material';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      
      <Typography   
          style={{ color: "#fff" }}
          variant="h5"
          noWrap
          sx={{
            mr: 2,
            padding: "25px",
            display: { md: "flex" },
            fontFamily: "Chilanka",
            fontWeight: 600,
            textDecoration: "none",
          }}>
         MyStory
      
</Typography>
    
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <TextField 
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}>
      
      </TextField>
      <br />
      <br />
      <TextField
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          >
       </TextField>
<br />
<br/>
       <Button sx={{
        backgroundColor:"#FFECB3",
       
            color: "#3E2723",
            margin:"10px",
            padding:"5px"
          }}
          className="btn" type="submit" name="submit" value="Log In" >
          Login
          </Button>
      
    </form>
  );
}

export default LoginForm;
