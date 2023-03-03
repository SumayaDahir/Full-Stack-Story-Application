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
  
    <AppBar 
    style={{background: '#795548'}}
     position='static'>
        <Container maxWidth="xl">
        <Toolbar disableGutters
         sx={{ 
          display: {xs: "flex"},
          flexDirection: "row",
           justifyContent: 'space-between',
            }}
            >
         <IconButton edge="start">  
         <MenuIcon></MenuIcon>
         </IconButton>
        <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { mr: 2, xs: 'none', md: 'flex' },
              fontFamily: 'Chilanka',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
      <nav sx={{
                display: { xs: 'none', md: 'flex' },
             
                }}
                >
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}
        {/* If a user is logged in, show these links */ }
            <Link  className="navLink" to="/randomstory">
            Daily Story
            </Link>
        <Link 
        className="navLink" to="/about">
          #Explore
        </Link>
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            
            <LogOutButton className="navLink" />
          </>
        )}
      </nav>
    
    </Typography>
    </Toolbar>
    </Container>
    </AppBar>
 
    
  );
}

export default Nav;
