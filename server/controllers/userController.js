const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registration
exports.register = async (req, res) => {
    const { fName, lName, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ where: { email } });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            return res.status(400).json({
                message: "User already created.",
            });
        }

        const newUser = await User.create({
            fName, 
            lName, 
            email, 
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Successful registration.",
            user: {
                id: newUser.id,
                fName: newUser.fName,
                lName: newUser.lName,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Authentication
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });
        const isMatch = await bcrypt.compare(password, user.password)

        if (!user || !isMatch) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            token, 
            user: {
                id: user.id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};