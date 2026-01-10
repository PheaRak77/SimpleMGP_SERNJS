const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password required !" });
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "invalide credentail ? " });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "invalide credentail ? " });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.role_id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error ?" });
  }
};

module.exports = { login };
