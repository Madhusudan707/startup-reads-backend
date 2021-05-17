const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UsersActivitySchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    wishlist:[{type:Schema.Types.ObjectId,ref:'Books'}],
    cart:[{count:{type:Number},productId:{type:Schema.Types.ObjectId,ref:'Books'}}]
},{timestamps: true});

const UsersActivity = mongoose.model("UsersActivity",UsersActivitySchema)
module.exports = {UsersActivity}

