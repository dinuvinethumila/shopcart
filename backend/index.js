const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables at the very beginning

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL; // Changed to MONGO_URl
const FRONTEND_URL = process.env.FRONTEND_URL || "https://lively-tree-01f0fd50f.4.azurestaticapps.net"; // Allow frontend access

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS Configuration: Allows only your frontend app
app.use(cors({
    origin: FRONTEND_URL,
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // Enable if using authentication (JWT, cookies, etc.)
}));

// MongoDB Connection
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ NOT CONNECTED TO NETWORK:", err);
        process.exit(1); // Exit if DB connection fails
    });

// Routes
app.use('/', Routes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
