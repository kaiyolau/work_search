const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. See .env.example')
}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set. See .env.example')
}

mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true
    // useCreateIndex: true,
    // useFindAndModify: false
})



// mongoose.set('strictQuery', true);
// async function connect() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//     useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error(error);
//   }
// }

// module.exports = { connect };

