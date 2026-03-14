const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4, // Force IPv4 to avoid potential IPv6 DNS resolution issues
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error("Full Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
