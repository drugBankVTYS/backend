const express= require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors= require('cors');


const app=express();


//Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

//Port
const port = process.env.PORT || 9000;


//Launch App
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
