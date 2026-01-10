const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRouters = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

//Router

app.use("/api/auth", authRouters);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

///testing Route

app.get("/", (req, res) => {
  res.json({ message: "Product Management API Running  " });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
