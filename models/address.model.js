const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    address: [
      {
        label: { type: String, uppercase: true, unique:true },
        name: String,
        address: String,
        country: String,
        pincode: String,
        city: String,
        state: String,
      },
    ],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
module.exports = { Address };
