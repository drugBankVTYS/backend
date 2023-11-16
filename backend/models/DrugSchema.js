const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const jwt = require("jsonwebtoken");


const drugSchema = new mongoose.Schema({
        drug_id: {
            type:String,
            trim:true
        },
        drug_name:{
            type:String,
            trim:true
        },
        drug_state :{
            type:String,
            trim:true
        },
        drug_kingdom: {
            type:String,
            trim:true
        },
        drug_superclass : {
            type:String,
            trim : true
        },
        drug_interactions:{
            type:Array,
            items :{
                type:String
            }
        },
        drug_pathways :{
            type:Array,
            items :{
                type:String
            }
        },
        drug_toxicity :{
            type:Array,
            items: {
                type:String
            }
        },
        drug_food_interactions :{
            type:Array,
            items: {
                type:String
            }
        },
        target_name : {
            type:String,
            trim : true
        },
        target_uniprot : {
            type:String,
            trim:true
        },
        target_gene_name:{
            type:String,
            trim:true
        },
        action:{
            type:String,
            trim:true
        },
        cell_loc:{
            type:String,
            trim:true
        }


},{timestamps:true})


// return a JWT token
drugSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("drug", drugSchema);