const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
require('dotenv').config(); // Load environment variables from .env file

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure secret key

router.use("/", (req, res, next) => {
    console.log(`Log 19: Middleware hit for route ${req.url} with method ${req.method}`);
    next();
});

// Sign-Up API
router.post('/signup', async (req, res) => {
    console.log('Log 20: Sign-up request received',req.body);
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Log 21: User already exists');
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        console.log('Log 22: Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        console.log('Log 23: Saving new user...');
        await newUser.save();
        
        console.log('Log 24: User created successfully');
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(`Log 25: Error during sign-up: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

// Login API
router.post('/login', async (req, res) => {
    console.log('Log 26: Login request received');
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Log 27: User not found');
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Log 28: Invalid credentials');
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        console.log('Log 29: Login successful, token generated');
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(`Log 30: Error during login: ${error.message}`);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
