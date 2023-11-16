const Drug = require('../models/DrugSchema');


class DrugService{

    //get all drugs
    async getAllDrugs(req,res,next){
    //enable pagination
         //http://localhost:3000/api/alldrugs?pageNumber=2 
         const pageSize = 5;
         const page = Number(req.query.pageNumber) || 1;
         const count = await Drug.find().countDocuments();

    try {
        //find all drugs but do not show in one single page. Show it with pagination
        const drugs = await Drug.find().skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            drugs
            
        })
     } catch (error) {
        next(error);
     }
    }


    //get drug with id
    async getSingleDrug (req,res,next){
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
  async createDrug (req,res,next){
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


    //delete drugs ( FOR ONLY ADMIN)
    async deleteDrug (req,res,next) {
    try{
        //find drug and delete 
        const deletedDrug = await Drug.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:1,
            deletedDrug
        })
    
    }catch(error){
            next(error);
    }
}

// Update the drug
 async updateDrug (req,res,next) {
    try{
        const updatedDrug = await Drug.findByIdAndUpdate(req.params.drug_id, req.body, {new : true});
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
 async showDrugWithName  (req, res, next) {
    const partialDrugName = new RegExp(req.query.name, 'i'); // i provide not case sensivity
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    try {
        // Get drugs with Promise functionality
        const [count, drugs] = await Promise.all([
            Drug.countDocuments({ drug_name: partialDrugName }),
            Drug.find({ drug_name: partialDrugName }).skip(pageSize * (page - 1)).limit(pageSize)
        ]);

        res.status(200).json({
            success: true,
            drugs,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
};
}

  

    


module.exports = new DrugService();