if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = require('./src/app')
const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
