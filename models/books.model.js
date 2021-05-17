const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {type:String,required:[true,'Title is Mandatory']},
  isbn:String,
  category:String ,
  imageUrl: String ,
  price:Number,
  stock:Boolean,
  fastDelivery:Boolean
},{timestamps: true});

const Books = mongoose.model("Books",BooksSchema)
module.exports = {Books}
