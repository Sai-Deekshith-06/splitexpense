const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getNameByUpi,
    getByPhone,
} = require("../controllers/user.controller");

// Register a User
router.post("/register", register);
// Login a User
router.post("/login", login);
// Get User Name by UPI
router.get("/:upi/name", getNameByUpi);
// Get User Info by Phone
router.get("/:phone", getByPhone);

module.exports = router;