const express= require('express');
 require('./database/database');
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors= require('cors');


//Router
const drugRoutes = require('./routes/DrugRoutes');

const app=express();


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());

app.use('/api',drugRoutes);

module.exports = app;
