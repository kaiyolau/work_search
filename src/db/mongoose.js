const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
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

