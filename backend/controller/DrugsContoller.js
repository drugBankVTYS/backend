const Drug = require('../models/DrugSchema');


    //get drug with id
    exports.getSingleDrug= async(req,res,next)=>{
        try{    
            const drug = await Drug.findById(req.params.id);
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
        const drug = await Drug.create(req.body);
        
        res.status(201).json({
            drug
        })
    }catch(error){
        next(error);
        console.log(error);

    }
}