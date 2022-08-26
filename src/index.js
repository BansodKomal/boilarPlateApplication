require("dotenv").config()
const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose')



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect(process.env.db, {useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.port, function() {
	console.log('Express app running on port ' + (process.env.port))
});