const pool = require("../config/db");

// Get all products
const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
         SELECT p.*, u.name AS created_by_name
            FROM controlpro p
            JOIN users u ON p.created_by = u.id`);

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch products ? " });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute(
      `SELECT p.*, u.name AS created_by_name
       FROM controlpro p
       JOIN users u ON p.created_by = u.id
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found ?" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch product ? " });
  }
};
// Post product or create new

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const createdBy = req.user.id;

  if (!name || price == null) {
    return res.status(400).json({ error: "Name and price required ?" });
  }
  try {
    const [result] = await pool.execute(
      "INSERT INTO controlpro (name, description, price, stock, created_by) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, stock || 0, createdBy]
    );

    res
      .status(201)
      .json({ id: result.insertId, name, description, price, stock });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create product ? " });
  }
};

// PUT update products

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const [result] = await pool.execute(
      "UPDATE controlpro SET name = ?  , description = ? , price = ? , stock = ? WHERE id = ?",
      [name, description, price, stock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product Not found ? " });
    }
    res.json({ message: "Product updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update product ? " });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM controlpro WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product Not Found " });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete product ?" });
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
