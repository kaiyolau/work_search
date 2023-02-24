// const mongoose = require('mongoose');
// const { faker } = require('@faker-js/faker');

// const axios = require('axios');

// const { connect } = require('./src/db/mongoose'); // import your database connection
// const { Post } = require('./src/models/post'); // import your Mongoose models

// const { GEOCODE_API_KEY } = require('./config/dev.env'); // import your Google Maps API key


// const data = [];

// async function getGeocodedAddress(city, province) {
//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//       params: {
//         address: `${city}, ${province}, Canada`,
//         key: "AIzaSyDYRXEWOptz56bZaQcaBlFp_oCmM87kEZo",
//       },
//     });
//     console.log(response.data);
//     // console.log(GEOCODE_API_KEY);

//     const { formatted_address, geometry: { location } } = response.data.results[0];

//     return { formatted_address, latitude: location.lat, longitude: location.lng };
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// async function seed() {
//   const addresses = [    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' },    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' },    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' }  ];

//   for (const address of addresses) {
//     const { formatted_address, latitude, longitude } = await getGeocodedAddress(address.city, address.province);

//     if (formatted_address) {
//       const post = new Post({
//         jobtitle: faker.name.jobTitle(),
//         company: faker.name.jobArea(),
//         //hardcoding in location
//         location: faker.address.streetAddress(),
//         latitude,
//         longitude,
//         numberOfRecruiter: 2,
//         skill: faker.name.jobArea(),
//         description: faker.lorem.sentences(3),
//         wage: 15,
//         companyWebsite: faker.internet.url(),
//         sponsorship: true,
//         author: "63f6bc02c39b957f1a9e5db9"
//       });

//       await post.save();
//     }
//   }

//   console.log('Seed data created successfully!');
// }


// seed();


