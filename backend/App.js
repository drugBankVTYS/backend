const express= require('express');
 require('./database/database');
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors= require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 


//Router
const drugRoutes = require('./routes/DrugRoutes');

const app=express();
const swaggerDocument = YAML.load('./Documentation.yaml'); 


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());

app.use('/api',drugRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
