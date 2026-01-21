const express = require("express");
const router = express.Router();

/* ---------- AUTH ---------- */
const { loginAdmin } = require("../controllers/admin/authController");
router.post("/login", loginAdmin);

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

const upload = require("../middlewares/upload"); // ✅ multer middleware

// create product with image
router.post(
  "/product",
  upload.single("photo"), // ✅ image field name must be "photo"
  createProduct
);

router.get("/product", getProducts);

/* ---------- ORDERS ---------- */
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/admin/orderController");

router.get("/orders", getOrders);
router.put("/orders/:id", updateOrderStatus);

module.exports = router;
