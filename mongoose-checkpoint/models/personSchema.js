const mongoose = require ("mongoose");

const PersonSchema = mongoose.Schema(
    {
        name:{type:String , required:true},
        age:Number,
        favouriteFoods:[String]
    }
)

const Person = mongoose.model('person', PersonSchema)
module.exports=Person