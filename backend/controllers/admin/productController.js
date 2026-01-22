const Product = require("../../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      quantity,
      photo: req.file ? req.file.filename : null,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// backend/controllers/admin/productController.js


exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.status(200).json({
      products,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};