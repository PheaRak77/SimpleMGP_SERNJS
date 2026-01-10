// server_site/resetPassword.js
const bcrypt = require("bcryptjs");
const pool = require("./config/db");

const resetPassword = async () => {
  const email = "john@gmail.com"; // 👈 Change this to target user
  const newPassword = "user123"; // 👈 Set new password

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.execute(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashed, email]
    );

    if (result.affectedRows === 0) {
      console.log("❌ No user found with that email");
    } else {
      console.log(`✅ Password reset for ${email}`);
      console.log(`New password: ${newPassword}`);
    }
  } catch (err) {
    console.error("💥 Error:", err.message);
  }
  process.exit();
};

resetPassword();
