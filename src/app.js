// require('./db/mongoose')
const express = require('express')
const app = express()
const session = require('express-session');
const morgan = require('morgan');
require('./db/mongoose')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(session({
  secret: 'secret',  // This can be any string used to sign the session ID cookie
  resave: false,  // Forces the session to be saved back to the store
  saveUninitialized: false  // Forces a session that is "uninitialized" to be saved to the store
}));

app.use(morgan('combined')); // use Morgan middleware

//------Cookie Parser------>
//req.body.cookie
//install: npm i --save cookie-parser
//require cookie-parser:
const cookieParser = require('cookie-parser')

app.use(cookieParser())

var corsOptions = {
    origin: "http://localhost:5500"
    };

    app.use(cors(corsOptions));

  // parse requests of content-type - application/json
    app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  //Returns middleware that only parses {urlencoded} bodies and only looks at requests where the Content-Type header matches the type option.
  //This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
 //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
 //This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
    app.use(bodyParser.urlencoded({ extended: true }));

  // simple route
    app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
    });

// require('./routers/user')(app);

const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const appRouter = require('./routers/app')

app.use(express.json())
app.use(bodyParser.json());
app.use('/api',userRouter)
app.use('/api',postRouter)
app.use('/api',appRouter)




module.exports = app
