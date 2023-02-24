const mongoose = require('mongoose');
const { Faker } = require('@faker-js/faker');

const faker = new Faker({ locales: { en: require('faker/locale/en') } });

const axios = require('axios');

const { connect } = require('./src/db/mongoose'); // import your database connection
const { Post } = require('./src/models/post'); // import your Mongoose models

const { GEOCODE_API_KEY } = require('./config/dev.env'); // import your Google Maps API key


const data = [];

async function getGeocodedAddress(city, province) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${city}, ${province}, Canada`,
        key: GEOCODE_API_KEY,
      },
    });
    console.log(response.data);

    const { formatted_address, geometry: { location } } = response.data.results[0];

    return { formatted_address, latitude: location.lat, longitude: location.lng };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function seed() {
  const addresses = [    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' },    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' },    { city: 'Vancouver', province: 'BC' },    { city: 'Burnaby', province: 'BC' },    { city: 'Richmond', province: 'BC' }  ];

  for (const address of addresses) {
    const { formatted_address, latitude, longitude } = await getGeocodedAddress(address.city, address.province);

    // if (formatted_address) {
      const post = new Post({
        jobtitle: faker.name.jobTitle(),
        company: faker.name.jobArea(),
        location: faker.address.streetAddress(),
        latitude: faker.latitude(),
        longitude: faker.longitude(),
        numberOfRecruiter: faker.random.number(),
        skill: faker.name.jobArea(),
        description: faker.lorem.sentences(3),
        wage: faker.random.number({ min: 1000, max: 5000 }),
        companyWebsite: faker.internet.url(),
        sponsorship: faker.random.boolean(),
        author: "63f6bc02c39b957f1a9e5db9"
      });

      await post.save();
    // }
  }

  console.log('Seed data created successfully!');
}


seed();


