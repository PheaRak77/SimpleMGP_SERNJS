const express = require("express");
const { getUsers } = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", auth, isAdmin, getUsers);

module.exports = router;
