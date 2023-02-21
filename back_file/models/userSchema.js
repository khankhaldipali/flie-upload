const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:"string",
        require:true
    },
    img:{
        data:Buffer,
        contentType:String
    }
})
var user=mongoose.model("user",userSchema);
module.exports=user;