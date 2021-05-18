const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { UsersActivity } = require("../models/usersActivity.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await UsersActivity.find({});
      res.json({ success: true, data });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to find user activity",
          errorMessage: err.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const usersActivity = req.body;
      const NewUserActivity = new UsersActivity(usersActivity);
      const savedUserActivity = await NewUserActivity.save();
      res.json({ success: true, UsersActivity: savedUserActivity });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to register",
          errorMessage: err.message,
        });
    }
  });

router.route("/wish").post(async (req, res) => {
  try {
    const usersActivity = req.body;
    const NewUserActivity = new UsersActivity(usersActivity);
    const savedUserActivity = await NewUserActivity.save();
    res.json({ success: true, UsersActivity: savedUserActivity });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "unable to register",
        errorMessage: err.message,
      });
  }
});

router.route("/user/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UsersActivity.findById(id);
    // .populate("wishlist")
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to populate user activity",
      errorMessage: err.message,
    });
  }
});

/* check if wishlist id is present or not */
router.route("/user/:id/wish/:wid").get(async (req, res) => {
  try {
    const { id, wid } = req.params;
    const data = await UsersActivity.findOne({ _id: id });
    const wishlistData = _.some(
      data.wishlist,
      (wish) => wish.toString() === wid
    );
    if (wishlistData) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find wish activity",
      errorMessage: err.message,
    });
  }
});

//update wish
router.route("/user/:id/wish/update/:wid").post(async (req, res) => {
  try {
    const id = req.params.id;
    const wid = [req.params.wid];
    const data = await UsersActivity.findOne({ _id: id });
    const wishlistData = _.extend(data, {
      wishlist: _.union(data.wishlist, wid),
    });
    await wishlistData.save();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find wish activity",
      errorMessage: err.message,
    });
  }
});

/* check if wishlist id is present remove it */
router.route("/user/:id/wish/:wid").delete(async (req, res) => {
  try {
    const { id, wid } = req.params;
    const data = await UsersActivity.findById(id);
    const wishlistData = _.extend(data, {
      wishlist: _.filter(data.wishlist, (wish) => wish.toString() !== wid),
    });
    await wishlistData.save();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find wish activity",
      errorMessage: err.message,
    });
  }
});


router.route("/cart").post(async (req, res) => {
  try {
    const usersActivity = req.body;
    const NewUserActivity = new UsersActivity(usersActivity);
    const savedUserActivity = await NewUserActivity.save();
    res.json({ success: true, UsersActivity: savedUserActivity });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "unable to register",
        errorMessage: err.message,
      });
  }
});

/* check if cart id is present or not */
router.route("/user/:id/cart/:pid").get(async (req, res) => {
  try {
    const { id, pid } = req.params;
    const data = await UsersActivity.findOne({ _id: id });
   
    const cartData = _.some(data.cart,(cart) => cart.productId.toString() === pid);
    if (cartData) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find cart activity",
      errorMessage: err.message,
    });
  }
});

//update cart 1. if there is no item, 2. if  item exist, it will update the count, 
// 3. if item is there and new item is coming it will append
//4. update : count increment and decrement
router.route("/user/:id/cart/update/:action/:pid").post(async (req, res) => {
  try {
    const id = req.params.id;
    const pid = req.params.pid
    const action =req.params.action
    const data = await UsersActivity.findById(id);
      const isPresent=_.some(data.cart,item=>item.productId.toString()===pid)
      let cartData
      if(isPresent){
        cartData = _.extend(data, {
          cart: _.map(data.cart,item=>{
            if(action==="-"){
              if(item.productId.toString()===pid){
                return _.extend(item,{count:item.count-1})
              }return item
            }else{
              if(item.productId.toString()===pid){
                return _.extend(item,{count:item.count+1})
              }return item
            }
           
          })
        });
      }else{
        cartData = _.extend(data,{cart:_.concat(data.cart,{count:1,productId:pid})})
      }
      await cartData.save();
      res.json({success:true})
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find cart activity",
      errorMessage: err.message,
    });
  }
});

//Delete cart item
router.route("/user/:id/cart/:pid").delete(async (req, res) => {
  try {
    const { id, pid } = req.params;
    const data = await UsersActivity.findById(id);
    const cartData = _.extend(data, {
      cart: _.filter(data.cart,item=>item.productId.toString()!==pid),
    });   
    await cartData.save();

    res.json({success:true})
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to Remove Cart Item",
      errorMessage: err.message,
    });
  }
});



module.exports = router;
