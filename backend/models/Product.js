const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: Number,
    photo: String, // image URL for now
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
