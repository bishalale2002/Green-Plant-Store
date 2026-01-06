const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/admin/authController");

router.post("/login", loginAdmin);
const {
  createCategory,
  getCategories,
} = require("../controllers/admin/categoryController");

const {
  createProduct,
  getProducts,
} = require("../controllers/admin/productController");

const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/admin/orderController");

// Category
router.post("/category", createCategory);
router.get("/category", getCategories);

// Product
router.post("/product", createProduct);
router.get("/product", getProducts);

// Orders
router.get("/orders", getOrders);
router.put("/orders/:id", updateOrderStatus);

module.exports = router;
