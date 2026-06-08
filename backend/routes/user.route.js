const express = require("express");
const router = express.Router();

const {
    profile,
    updateProfile,
    getGroups,
    changePassword
} = require("../controllers/user.controller");

// Get User Profile
router.get("/profile", profile);
// Update User Profile
router.put("/profile", updateProfile);
// Get User Groups
router.get("/group/getall", getGroups);
// Change Password
router.post("/change-password", changePassword);

module.exports = router;