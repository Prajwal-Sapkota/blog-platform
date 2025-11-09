const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getStats} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/stats",authMiddleware, getStats);
module.exports = router;
