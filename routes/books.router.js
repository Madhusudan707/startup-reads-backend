const express = require("express");
const { extend } = require("lodash")
const router = express.Router();
const {Books} =  require("../models/books.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Books.find({})
        res.json({success:true,data})
        console.log(data)

    }catch(err){
        res.status(500).json({success:false,message:"Unable to load books",errorMessage:err.message})
    }
})

.post(async(req,res)=>{
    try{
        const book = req.body;
        const NewBook = new Books(book)
        const savedBook = await NewBook.save()
        res.json({success:true,book:savedBook})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to add book", errorMessage: err.message}) 
    }
})








module.exports = router