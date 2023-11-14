const express = require('express');
const drugController= require('../controller/DrugsContoller');
const router = express.Router();


//api/alldrugs  -> Get all drugs
router.get('/alldrugs',drugController.allDrugs);

//api/singledrug/:id   -> Get only 1 drug
router.get('/singledrug/:id' , drugController.getSingleDrug);

//api/createdrug   ->Create a new drug
router.post('/createdrug', drugController.createDrug);

//api/deletedrug/:id   -> Delete a drug
router.delete('/deletedrug/:id' , drugController.deleteDrug);

//api/updatedrug/:drug_id  -> Update drug
router.put('/updatedrug/:drug_id' ,drugController.updateDrug);

//api/show?name=  -> search based on name 
router.get('/showdrug', drugController.showDrugWithName);

module.exports=router;