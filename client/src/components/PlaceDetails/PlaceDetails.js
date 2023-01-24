import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link} from 'react-router-dom';

import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, refProp }) => {
  //changed here
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        // style={{objectFit: "none", overflow: "hidden", width: 200, height: 200}}
        image={place.picture ? `data:image/png;base64, ${place.picture}` : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.jobtitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.jobtitle}</Typography>
        <Typography gutterBottom variant="body1">Company: {place.company}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Wage: ${place.wage}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" component="legend">Required skill/certificate: {place.skill}</Typography>
        </Box>
        {place.location && (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
              <LocationOnIcon />{place.location}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.companyWebsite, '_blank')}>
          Company Website
        </Button>
        <Button size="small" color="primary"  component={Link} to={`/posts/${place.id}`} >
          See Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
