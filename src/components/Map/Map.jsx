import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData, cities }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const [icon, setIcon] = useState('');



  useEffect(() => {
    // console.log('I AM RUNNING USEFFECT')
    // console.log('weather data is', weatherData)
    setIcon( weatherData?.current?.weather[0]?.icon );
  });

  return (
    <div className={classes.mapContainer} id="tareget">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDpAI-CLHayhuhG9H94elpplkRoIFfi884' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={10}
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
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}


        {weatherData?.current?.weather[0].icon? (
          <div id='display1'>
            <img  src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          </div>
        ):(
          <div id='display2'>there's no weather image here</div>
        )}


      </GoogleMapReact>
    </div>
  );
};

export default Map;
