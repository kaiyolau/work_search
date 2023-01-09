import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// import PhoneIcon from '@material-ui/icons/Phone';
// import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        //response.image.address
        // image={place.picture ? place.picture : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.jobtitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.jobtitle}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Wage</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.wage}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Required skill/certificate</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.skill}
          </Typography>
        </Box>
        {place.location && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.location}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.companyWebsite, '_blank')}>
          Company Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
