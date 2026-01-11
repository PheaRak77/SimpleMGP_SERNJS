const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", auth, getProductById);
router.post("/", auth, isAdmin, createProduct);
router.put("/:id", auth, isAdmin, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

module.exports = router;
