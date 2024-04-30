const jwt = require('jsonwebtoken');
const ms = require('ms');
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const key = process.env.JWT_SECRET_KEY;

function setUser(user) {
    try {
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role, // Include user's role in the token
        }, key, {
            expiresIn: ms('1h'),
        });
        console.log('Token generated:', token);
        return token;
    } catch (error) {
        console.error("Error signing token:", error);
        throw new Error("Failed to sign token");
    }
}

function getUser(token) {
    if (!token) return null;
    try {
        const decodedToken = jwt.verify(token, key);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Invalid token");
    }
}

module.exports = {
    setUser,
    getUser,
};
