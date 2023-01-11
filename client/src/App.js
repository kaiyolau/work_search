import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch} from "react-redux";
import { retrievePosts } from "./actions/posts";
import UserDataService from "./services/UserService";
import { CssBaseline, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { getPlacesData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import SignInUser from './components/Users/SignInUser';
import SignUpUser from './components/Users/SignUpUser';
import ReadProfile from "./components/Users/ReadProfile";
import AddPost from "./components/Posts/AddPost";
import UpdatePost from "./components/Posts/UpdatePost";
import Post from "./components/Posts/Post";
import CreateApp from "./components/Apps/CreateApp";
// import HomePage from "./components/HomePage";
import AuthRoute from "./components/AuthRoute";


const App = () => {
  const [wage, setWage] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [ user, setUser ] = useState(null)
  const dispatch = useDispatch();

  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    setUser(token)
  }

  const onSignOut = () => {
    localStorage.removeItem('token')
    setUser( null )
  };


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    })
    getCurrentUser()
    // dispatch(retrievePosts())
    // .then(response => {
    //     // console.log(response)
    //     setPlaces(response)
    //   //     setFilteredPlaces([]);
    //   //     setWage('');
    //   //     setIsLoading(false);

    // })
    // .catch(e => { console.log(e) });
    // navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    //   setCoords({ lat: latitude, lng: longitude });
    // });
  }, []);
  console.log('places:',places)
  console.log('coords:',coords)

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.wage) > wage);
    setFilteredPlaces(filtered);
  }, [wage]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      dispatch(retrievePosts())
      .then(response => {
          console.log(response)
          setPlaces(response)
            setFilteredPlaces([]);
            setWage('');
            setIsLoading(false);

      })
    .catch(e => { console.log(e) });
      // getPlacesData(bounds.sw, bounds.ne)
      //   .then((data) => {
      //     setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      //     setFilteredPlaces([]);
      //     setWage('');
      //     setIsLoading(false);
      //   });
    }
  }, [bounds]);
  console.log('bounds', bounds)

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };


  return (
    <Router>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}  currentUser={user} onSignOut={onSignOut} />
      {/* <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              // places={filteredPlaces.length ? filteredPlaces : places}
              places={places}
              wage={wage}
              setWage={setWage}
            />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid> */}


      <Switch>
        <Route exact path='/' render={(routeProps) =>
          <Grid container spacing={3} style={{ width: '100%' }}>
            <Grid item xs={12} md={4}>
                <List
                  isLoading={isLoading}
                  childClicked={childClicked}
                  // places={filteredPlaces.length ? filteredPlaces : places}
                  places={places}
                  wage={wage}
                  setWage={setWage}
                />
            </Grid>
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Map
                setChildClicked={setChildClicked}
                setBounds={setBounds}
                setCoords={setCoords}
                coords={coords}
                places={filteredPlaces.length ? filteredPlaces : places}
              />
            </Grid>
          </Grid>}
        ></Route>
        <Route exact path='/sign_in' render={(routeProps) => <SignInUser {...routeProps} onSignIn={getCurrentUser} />}></Route>
        <Route exact path='/sign_up' render={(routeProps) => <SignUpUser {...routeProps} onSignIn={getCurrentUser} />}></Route>
        <AuthRoute isAuthenticated={!!user}  exact path='/posts/Add' component={AddPost} />
        <Route exact path="/posts/:id" render={(routeProps) => <Post {...routeProps} />}/>
        <Route exact path="/posts/:id/update" render={(routeProps) => <UpdatePost {...routeProps} />}/>
        <AuthRoute exact path='/users/me' component={ReadProfile} isAuthenticated={!!user} onSignOut={onSignOut}/>
        <Route exact path="/posts/:postingId/apps" render={(routeProps) => <CreateApp {...routeProps} />}/>
        {/* <Route exact path={["/", "/posts"]} component={HomePage}/> */}
      </Switch>
    </Router>

  );
};

export default App;
