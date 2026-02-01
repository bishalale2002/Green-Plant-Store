const express = require("express");
const router = express.Router();

const {
  createOrder,
} = require("../controllers/admin/orderController");

// Public – customer places order
router.post("/", createOrder);

module.exports = router;
