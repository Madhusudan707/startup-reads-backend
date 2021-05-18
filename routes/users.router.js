const express = require("express");
const router = express.Router();
const {Users} =  require("../models/users.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Users.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to find user",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const users = req.body;
        const NewUser = new Users(users)
        const savedUser = await NewUser.save()
        res.json({success:true,users:savedUser})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to register", errorMessage: err.message})
    }
})

router.route("/id/:id")
.get(async(req,res)=>{
    try{
        const id = req.params.id
        const data = await Users.findById(id)
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to find user",errorMessage:err.message})
    }
})

router.route("/authid/:authId")
.get(async(req,res)=>{
   
    try{
        const id = req.params.authId
        const user = await Users.findOne({authId:id})
        res.json({success:true,user })
    }catch(err){
        res.status(500).json({success:false,message:"Unable to get profile data",errorMessage:err.message})
    }
})

module.exports = router