const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Address } = require("../models/address.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await Address.find({});
      res.json({ success: true, data });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to find Address",
          errorMessage: err.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const address = req.body;
      const NewAddress = new Address(address);
      const savedAddress = await NewAddress.save();
      console.log(savedAddress);
      res.json({ success: true, address: savedAddress });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to save address",
          errorMessage: err.message,
        });
    }
  });

router.route("/user-id/label/:id/:label").get(async (req, res) => {
  try {
    const id = req.params.id;
    const label = req.params.label;
    const data = await Address.findById(id);
    const addressData = _.find(
      data.address,
      (item) => item.label === label.toUpperCase()
    );
    if (addressData) {
      res.json({ address: addressData, success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Unable to find Address",
        errorMessage: err.message,
      });
  }
});

router
  .route("/user/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Address.findById(id);
     
      if (data) {
        res.json({ address: data.address, success: true });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to find Address",
          errorMessage: err.message,
        });
    }
  })

  // .post(async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const addressParam = req.body;
  //     const data = await Address.findById(id);
  //     const isPresent=_.some(data.address,item=>item.label.toString().toUpperCase()===addressParam.label.toString().toUpperCase())
  //     let addressData

  //     if(isPresent){
  //      /*TODO */
  //     }else{
  //       addressData = _.extend(data, {
  //           address: _.concat(data.address, addressParam),
  //         });
  //     }
      

  //     await addressData.save();
  //     res.json({ success: true, data: addressData });
  //   } catch (err) {
  //     res
  //       .status(500)
  //       .json({
  //         success: false,
  //         message: "Unable to Save address",
  //         errorMessage: err.message,
  //       });
  //   }
  // });

module.exports = router;
