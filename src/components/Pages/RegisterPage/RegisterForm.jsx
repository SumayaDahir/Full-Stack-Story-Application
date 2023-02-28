import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardActions, Button} from '@mui/material'
import './Register.css'


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_picture, setProfilePicture] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
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
    
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
<div  >
<div> 
  <label htmlFor="email">
    Email:
    <input type="text" 
    name='email'
    value={email}
    required
    onChange={(event) => setEmail(event.target.value)}/>

</label>
</div>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>


      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="profile_picture">
          Upload Profile Picture:      
         <input
            type="text"
            name="profile_picture"
            value={profile_picture}
            required
            onChange={(event) => setProfilePicture(event.target.value)}
          /> 
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
        </div>
     
      </div>
    </form>
  );
}

export default RegisterForm;
