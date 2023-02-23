import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles';
const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery('(min-width:500px)');
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.jobtitle}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.picture ? `data:image/png;base64,${place.picture}` : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                </Paper>
              )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
