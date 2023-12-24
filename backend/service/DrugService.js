const Drug = require('../models/DrugSchema');


class DrugService{
    //pipeline -> We are dividing request into some peaces to run it faster with processes
    //get all drugs
    async getAllDrugs(req, res, next) {
        // Enable pagination
        // http://localhost:3001/api/alldrugs?pageNumber=2
        const pageSize = 9;
        const page = Number(req.query.pageNumber) || 1;
    
        try {
            // Aggregation pipeline -> Reduce code request traffic
            const pipeline = [
                // Group stage to get unique drug names
                {
                    $group: {
                        _id: '$drug_name', // Group by drug_name
                        firstDoc: { $first: '$$ROOT' }, 
                    },
                },
    
                // ReplaceRoot stage to replace the root with the first document
                {
                    $replaceRoot: { newRoot: '$firstDoc' },
                },
    
                // Sort stage (assuming createdAt field for sorting)
                { $sort: { createdAt: 1 } },
    
                // Skip and limit stages for pagination
                { $skip: pageSize * (page - 1) },
                { $limit: pageSize }
            ];
    
            const countPipeline = [{ $count: 'count' }];
    
            // Execute aggregation pipeline for drugs
            const drugs = await Drug.aggregate(pipeline);
    
            // Execute aggregation pipeline for count
            const countResult = await Drug.aggregate(countPipeline);
    
            // Extract count from countResult (if countResult is not empty)
            const count = countResult.length > 0 ? countResult[0].count : 0;
    
            // Respond with the result
            res.status(200).json({
                success: true,
                page,
                pages: Math.ceil(count / pageSize),
                count,
                drugs
            });
        } catch (error) {
            next(error);
        }
    }
    
    


    //get drug with id
    async getSingleDrug (req,res,next){
        try{    
            //Get drug data with ID
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
        //Create a new drug with data comes from body
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

// Update the drug(FOR ONLY ADMIN)
 async updateDrug (req,res,next) {
    try{
        //find and update drug
        const updatedDrug = await Drug.findByIdAndUpdate(req.params.drug_id, req.body, {new : true});
        res.status(200).json({
            success:1,
            updatedDrug
        })
        next();
    }catch(error) {
        next(error);
    }
}


async showDrugWithName(req, res, next) {
    const partialDrugName = new RegExp(req.query.name, 'i');
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const pipeline = [
            { $match: { drug_name: partialDrugName } },
            { $group: { _id: '$drug_id', drug: { $first: '$$ROOT' } } }, // Group by drug_id and select the first document in each group
            { $skip: pageSize * (page - 1) },
            { $limit: pageSize }
        ];

        const countPipeline = [
            { $match: { drug_name: partialDrugName } },
            { $group: { _id: '$drug_id' } },
            { $count: 'count' }
        ];

        const results = await Drug.aggregate([
            { $facet: { drugs: pipeline, count: countPipeline } }
        ]);

        const count = results[0].count.length > 0 ? results[0].count[0].count : 0;

        res.status(200).json({
            success: true,
            drugs: results[0].drugs.map(group => group.drug), // Extract the drug document from each group
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (error) {
        next(error);
    }
}



}

  

    


module.exports = new DrugService();