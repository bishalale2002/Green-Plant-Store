const Order = require("../../models/Order");

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("products.product");
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(order);
};
