const DrugService=require('../service/DrugService');
const Drug = require('../models/DrugSchema');


    //get all drugs
    exports.allDrugs = async(req,res,next)=>{
    

    try {
        //find all drugs but do not show in one single page. Show it with pagination
        const drugs = await DrugService.getAllDrugs(req,res,next);
        res.status(200).json({
            success: true,
            drugs
            
        })
     } catch (error) {
        next(error);
     }
    }

    //get drug with id
    exports.getSingleDrug= async(req,res,next)=>{
        try{    
            const drug = await DrugService.getSingleDrug(req,res,next);
            res.status(200).json({
                success:true,
                drug
            })
            next();
        }catch(error){
            next(error);
        }
    }


  //create a new drug
  exports.createDrug= async (req,res,next)=>{
    try{
        const drug = await DrugService.createDrug(req,res,next);
        
        res.status(201).json({
            drug
        })
    }catch(error){
        next(error);
        console.log(error);

    }
}


    //delete drugs ( FOR ONLY ADMIN)
exports.deleteDrug= async (req,res,next) =>{
    try{
        //find drug and delete 
        const deletedDrug = await DrugService.deleteDrug(req,res,next);
        res.status(200).json({
            success:1,
            deletedDrug
        })
    
    }catch(error){
            next(error);
    }
}

// Update the drug
exports.updateDrug = async(req,res,next) =>{
    try{
        const updatedDrug = await DrugService.updateDrug(req,res,next);
        res.status(200).json({
            success:1,
            updatedDrug
        })
    }catch(error) {
        next(error);
    }
}

//Find the drug with partial drug_name match   
//Code revides to reduce runtime -> From 2 second to range in 500ms to 1.5sec  
//Review -> Last performance was 1001 ms
exports.showDrugWithName = async (req, res, next) => {
   
    try {
        const drugs = await DrugService.showDrugWithName(req,res,next);

        res.status(200).json({
            success: true,
            drugs,
            
        });
    } catch (error) {
        next(error);
    }
};


