const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    photo: {
      type: String, // filename only
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
