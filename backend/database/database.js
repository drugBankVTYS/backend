const mongoose = require('mongoose');
require("dotenv").config();


//Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

exports.module=mongoose;