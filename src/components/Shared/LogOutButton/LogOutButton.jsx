import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      sx={{
        borderRadius: 50,
        color: "white",
        margin:"10px"
      }}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
