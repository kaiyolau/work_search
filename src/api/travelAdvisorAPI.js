/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });
    return data
    // const geoData = await getLatAndLonFromCity(cityName);
    // lat = geoData.lat;
    // lon = geoData.lon;
    // weatherData = await getWeatherData(lat, lon);
    // return weatherData;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=alert,daily&appid=892dc0db073cb03b5b98f0e737fddab7`, {
        params: { lat, lon: lng }
      });
      return data;
    }
  } catch (error) {
    console.log('error is', error);
  }
};




export const getCitiesData = async () => {
  try {
    const { data: { data } } = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/Q24639/nearbyCities`, {
      params: {radius: '100'},
      headers: {
        'X-RapidAPI-Key': 'c6ed571729msh5b74fe34598d884p17ee0djsn1d7d631547b6',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });
    console.log('the cities data is', data)
    return data

  } catch (error) {
    console.log("the api error is",error);
  }
};


