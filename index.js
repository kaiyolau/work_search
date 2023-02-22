const app = require('./src/app')
const port = process.env.PORT || 3002

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));
}

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    }

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
