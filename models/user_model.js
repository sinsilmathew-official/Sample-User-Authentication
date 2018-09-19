let mongoose = require('mongoose');
const Schema=mongoose.Schema;
const database=require('../database/index')
const userSchema=new Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String}
},
{ collection: "db_user" }
);

module.exports = mongoose.model("db_user",userSchema);
