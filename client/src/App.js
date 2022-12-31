import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch} from "react-redux";

import UserDataService from "./services/UserService";
import { CssBaseline, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { getPlacesData, getWeatherData, getCitiesData } from './api/travelAdvisorAPI';
import Header from './components/Header/Header';
// import List from './components/List/List';
// import Map from './components/Map/Map';
import SignInUser from './components/Users/SignInUser';
import SignUpUser from './components/Users/SignUpUser';
import ReadProfile from "./components/Users/ReadProfile";
import AddPost from "./components/Posts/AddPost";
import Post from "./components/Posts/Post";
import AuthRoute from "./components/AuthRoute";


const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [ user, setUser ] = useState(null)
  const dispatch = useDispatch();

  const getCurrentUser = (userData) => {
    setUser(userData)
  }

  const onSignOut = () => {

    localStorage.removeItem('token')
    setUser( null )
  };


  useEffect(() => {
    getCurrentUser()
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  // useEffect(() => {
  //   const filtered = places.filter((place) => Number(place.rating) > rating);

  //   setFilteredPlaces(filtered);
  // }, [rating]);

  // useEffect(() => {
  //   if (bounds) {
  //     setIsLoading(true);

  //     // getWeatherData(coords.lat, coords.lng)
  //     //   .then((data) => setWeatherData(data));

  //     getPlacesData(type, bounds.sw, bounds.ne)
  //       .then((data) => {
  //         setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
  //         setFilteredPlaces([]);
  //         setRating('');
  //         setIsLoading(false);
  //       });

  //     getCitiesData()
  //       .then((data) => {
  //         setCities(data);
  //         setIsLoading(false);
  //         console.log('the cities data in APP.js is',cities)
  //       });
  //   }
  // }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  // console.log(user)
  return (
    <Router>

      {/* <Grid container spacing={3} style={{ width: '100%' }}>
      <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            cities={cities}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            cities={cities}
            weatherData={weatherData}
          />
        </Grid>
      </Grid> */}
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}  currentUser={user} onSignOut={onSignOut} />
      <Switch>
        <Route exact path='/sign_in' render={(routeProps) => <SignInUser {...routeProps} onSignIn={getCurrentUser} />}></Route>
        <Route exact path='/sign_up' render={(routeProps) => <SignUpUser {...routeProps} onSignIn={getCurrentUser} />}></Route>
        <AuthRoute isAuthenticated={!!user} exact path='/posts/Add' component={AddPost} />
        <AuthRoute exact path='/users/me' component={ReadProfile} isAuthenticated={!!user} onSignOut={onSignOut}/>
        <Route exact path="/posts/:id"  render={(routeProps) => <Post {...routeProps} />}/>
          {/* <Route component={NotFoundPage}></Route> */}
          {/* <Route exact path={["/", "/posts"]} component={PostsList}/> */}
      </Switch>

    </Router>

  );
};

export default App;
