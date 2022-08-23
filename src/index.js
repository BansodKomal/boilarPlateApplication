require("dotenv").config()
const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose')



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb+srv://KomalBansod:3DK49mFSm2FA717W@cluster0.zvwlork.mongodb.net/boilerPlate", {useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});