const express = require("express");
const router = express.Router();

/* ---------- AUTH ---------- */
const {
  loginAdmin,
  forgotPassword,
  verifyResetCode,
  resetPassword
} = require("../controllers/admin/authController"); // Assuming authController.js is where these functions reside

router.post("/login", loginAdmin);
// New routes for forgot password functionality
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);


/* ---------- CATEGORY ---------- */
const {
  createCategory,
  getCategories,
} = require("../controllers/admin/categoryController");

router.post("/category", createCategory);
router.get("/category", getCategories);

/* ---------- PRODUCT ---------- */
const {
  createProduct,
  getProducts,
} = require("../controllers/admin/productController");

const upload = require("../middlewares/upload"); // multer middleware

// create product with image
router.post(
  "/product",
  upload.single("photo"), // image field name must be "photo"
  createProduct
);

router.get("/product", getProducts);

/* ---------- ORDERS ---------- */
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/admin/orderController"); // Assuming orderController.js

router.get("/orders", getOrders);
router.put("/orders/:id/status", updateOrderStatus);


module.exports = router;