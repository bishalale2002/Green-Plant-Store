const Order = require("../../models/Order");
const sendOrderEmail = require("../../utils/sendOrderEmail");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      phone,
      email,
      address,
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      products,
      totalAmount,
      customerName,
      phone,
      email,
      address,
    });

    await order.save();

    // 📧 Send emails (admin + customer)
    await sendOrderEmail(order);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// ✅ GET ALL ORDERS (ADMIN)
exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("products.product");
  res.json(orders);
};

// ✅ UPDATE STATUS
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
};
