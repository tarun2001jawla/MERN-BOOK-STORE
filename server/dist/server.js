"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Database connection
mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore", {})
    .then(() => console.log("MongoDB connection established"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
