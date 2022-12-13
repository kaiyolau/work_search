import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Box, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading, cities }) => {
  // const [cities, setCities] = useState([]);
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h5">You can display different cities, weather, restaurants, hotel and restaurants right here!</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="cities">Cities</MenuItem>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>

          {type==='cities'? (cities.map((city) => (
            <Card>
              <CardContent>
                  <Typography gutterBottom variant="h4">{city.name}</Typography>
                  <Typography gutterBottom variant="h5">{city.country}</Typography>
                  <Typography gutterBottom variant="h5">Population:{city.population}</Typography>
                  <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                    <img src='https://cdn.countryflags.com/thumbs/cuba/flag-square-250.png' />
                  </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(city.wikiDataId, '_blank')}>
                  National Website
                </Button>
              </CardActions>
            </Card>
          ) )) : (
            <Grid container spacing={3} className={classes.list}>
              {places?.map((place, i) => (
                <Grid ref={elRefs[i]} key={i} item xs={12}>
                  <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                </Grid>
              ))}
            </Grid>
          ) }




        </>
      )}
    </div>
  );
};

export default List;
