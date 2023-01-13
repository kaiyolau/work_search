import React from 'react';
import { useDispatch  } from "react-redux";
import {NavLink, Link} from 'react-router-dom';
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
        <Button component={Link} to="/" color="inherit" className={classes.title}>
          Jobs near your home
        </Button>

        {currentUser ? (
          <>
            <Button color="inherit" component={Link} to='/posts/Add' >Create a new post</Button>
            <Button color="inherit" component={Link} to='/users/me' >Profile</Button>
            <span>Welcome back!</span>
            <Button color="inherit" component={Link} to={`/users/:userId/posts`} >Dashboard</Button>
            <Button onClick={handleSignOut} color="inherit">Sign Out</Button>
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
