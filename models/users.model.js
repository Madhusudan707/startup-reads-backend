const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   authId:{type:String,unique:true},
   name:String,
   email:{type:String,unique:true},
   password:String

},{timestamps: true});

const Users = mongoose.model("Users",UserSchema)
module.exports = {Users}

