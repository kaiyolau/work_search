import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Box, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, wage, setWage, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h5">See all jobs that suitable for you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="wage">Wage</InputLabel>
            <Select id="wage" value={wage} onChange={(e) => setWage(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="15">Min wage</MenuItem>
              <MenuItem value="25">under $25</MenuItem>
              <MenuItem value="35">Above 35</MenuItem>
            </Select>
          </FormControl>


            <Grid container spacing={3} className={classes.list}>
              {places?.map((place, i) => (
                  <Grid ref={elRefs[i]} key={i} item xs={12}>
                    <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                  </Grid>
                ))}
            </Grid>

        </>
      )}
    </div>
  );
};

export default List;
