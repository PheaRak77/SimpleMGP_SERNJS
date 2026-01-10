const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
        SELECT u.id, u.name, u.email, r.name AS role
        FROM users u
        JOIN role r ON u.role_id = r.id
      `);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fretch users " });
  }
};

module.exports = { getUsers };
