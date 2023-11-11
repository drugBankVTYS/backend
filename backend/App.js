const express= require('express');
const mongoose = require('./database/database');
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors= require('cors');

const app=express();




//Port
const port = process.env.PORT || 9000;


//Launch App
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
