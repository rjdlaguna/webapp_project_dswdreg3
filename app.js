const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const multer = require("multer")
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs')
require('dotenv').config();
const app = express();
const http = require('http')
const https = require('https')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());
app.use(express.json());

app.use(cors())
app.use(cookieParser());

//Setting up the static directory
app.use('../vue/client/src/assets/images/', express.static('images'))
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

mongoose.connect(db, { useFindAndModify: false });
mongoose.createConnection(db, {useUnifiedTopology: true})
.then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
})

const PORT = process.env.PORT || 9000;

//SSL Configuration
if(process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/dswdregion3centersandinstitutions.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/dswdregion3centersandinstitutions.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/dswdregion3centersandinstitutions.com/chain.pem', 'utf8');
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    https.createServer(credentials, app).listen(443,() => {
        console.log('HTTPS Server running on port 443');
    })
    
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80);
} else if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
} else {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}








