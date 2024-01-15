const mongoose = require('mongoose');
const AuthorsSchema= new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
        minLength:3,
    },
    LastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
        minLength:3,
    },Country:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
        minLength:3,
    },img:{
        type:String,

    }
},{
    timestamps:true
})
const Author = mongoose.model("Author",AuthorsSchema);
module.exports={
    Author
}