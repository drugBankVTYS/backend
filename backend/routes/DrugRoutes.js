const express = require('express');
const drugController= require('../controller/DrugsContoller');
const router = express.Router();



//api/singledrug/:id
router.get('/singledrug/:id' , drugController.getSingleDrug);
//api/createdrug
router.post('/createdrug', drugController.createDrug);


module.exports=router;