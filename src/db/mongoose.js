const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true
    // useCreateIndex: true,
    // useFindAndModify: false
})


