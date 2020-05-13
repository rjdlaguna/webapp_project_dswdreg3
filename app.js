const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const multer = require("multer")
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.use(cors())
app.use(cookieParser());

//Setting up the static directory
app.use('../webappdswd2/client/src/assets/images/', express.static('images'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize());
app.use(passport.session());

//Bring in Passport Strategy
require('./config/passport')(passport);

const users = require("./routes/api/users")
const citizenreports = require("./routes/api/citizenreports")

app.use("/api/users", users)
app.use("/api/citizenreports",citizenreports)

// mongoose.createConnection(uri, { useNewUrlParser: true });
const db = require('./config/keys').mongoURI;
//mongoose.connect(db, {
//useNewUrlParser: true
mongoose.connect(db, { useFindAndModify: false });
mongoose.createConnection(db, {useNewUrlParser: true})
.then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
})

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})