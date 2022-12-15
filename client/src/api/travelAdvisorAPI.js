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
  } catch (error) {
    console.log(error);
  }
};

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://indeed-indeed.p.rapidapi.com/apisearch',
  params: {
    publisher: 'Kyle',
    v: '2',
    format: 'json',
    callback: 'Callback',
    q: 'java',
    l: 'austin, tx',
    sort: 'relevance',
    radius: '25',
    st: 'jobsite',
    jt: 'fulltime',
    start: '1',
    limit: '10',
    fromage: '30',
    highlight: '0',
    filter: '1',
    latlong: '1',
    co: 'ca',
    chnl: 'channel_1',
    userip: '192.168.0.63.',
    useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
  },
  headers: {
    'X-RapidAPI-Key': 'c6ed571729msh5b74fe34598d884p17ee0djsn1d7d631547b6',
    'X-RapidAPI-Host': 'indeed-indeed.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});




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


