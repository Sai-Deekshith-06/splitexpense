const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

    try {

        const { phone, upi, name, password } = req.body;

        const existing = await User.findOne({
            $or: [{ phone }, { upi }]
        });

        if (existing) {
            return res.status(400).json({
                message: "User already exists",
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            phone,
            upi,
            name,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            status: true
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
            status: false
        });
    }
};


// LOGIN
exports.login = async (req, res) => {

    try {

        const { phone, password } = req.body;

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                status: false
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password",
                status: false
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                upi: user.upi
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            status: true
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
            status: false
        });
    }
};


// GET PROFILE
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json({
            user,
            status: true
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
            status: false
        });
    }
};