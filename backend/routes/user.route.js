const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const auth = require("../middlewares/auth");


// PUBLIC ROUTES
router.post("/public/register", userController.register);

router.post("/public/login", userController.login);


// PRIVATE ROUTES
router.get(
    "/user/getprofile",
    auth,
    userController.getProfile
);

module.exports = router;