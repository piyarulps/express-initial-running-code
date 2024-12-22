const express = require('express');
const { Property } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
// Middleware to authenticate the user
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Add a property
router.post('/add', authenticate, async (req, res) => {
    const { property, description, price } = req.body;

    try {
        const newProperty = new Property({ property, description, price });
        await newProperty.save();

        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
