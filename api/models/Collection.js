const mongoose = require('mongoose');

const CollectionSchema = ({
    username:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    desc:{type:String},
    objects:{type:Array},
    movieOrTV:{type:String,required:true}
})

module.exports = mongoose.model("Collection",CollectionSchema);