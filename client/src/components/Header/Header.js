import React from 'react';
import { useDispatch  } from "react-redux";
import {NavLink} from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@material-ui/core';
import { Nav, Navbar } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import {
  logoutAllUser
} from "../../actions/users";
import useStyles from './styles.js';

const Header = ({ onPlaceChanged, onLoad, currentUser, onSignOut }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logoutAllUser())
    .then(response => {
        console.log("user:",response);
    })
    .catch(e => {
        console.log(e);
    })

    onSignOut();
  }

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Search job that you like to work
        </Typography>
        {currentUser ? (
          <>
            <NavLink to='/posts/Add'>Create a new post</NavLink>
            <NavLink to='/users/me'>Profile</NavLink>
            <span>Welcome, { currentUser.name }</span>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Button color="inherit" href="/sign_in">Sign In</Button>
            <Button color="inherit" href="/sign_up">Sign Up</Button>
          </>
        )}
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
