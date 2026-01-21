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
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};