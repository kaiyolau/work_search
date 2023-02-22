const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/work-search-api', {
    useNewUrlParser: true
    // useCreateIndex: true,
    // useFindAndModify: false
})


