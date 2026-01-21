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

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("category");
  res.json(products);
};
