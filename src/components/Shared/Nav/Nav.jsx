import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
;

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <Box sx={{flexGrow:1}}>
    <AppBar 
    style={{background: '#795548'}}
     position='static'>
        <Container>
        <Toolbar disableGutters>
          <MenuIcon>Home</MenuIcon>
         <IconButton></IconButton>
        <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Chilanka',
              fontWeight: 700,
              letterSpacing: '.2rem',
              textDecoration: 'none',
             

            }}
          >
            
        
    <div className="nav">
    
      <div>
        <Link to="/home" className='navLink'> Home </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */ }
        
            

        <Link className="navLink" to="/about">
          #Explore
        </Link>
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Account
         
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
    
    </Typography>
    </Toolbar>
    </Container>
    </AppBar>
    </Box>
    
  );
}

export default Nav;
