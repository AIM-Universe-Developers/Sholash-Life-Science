import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

<<<<<<< HEAD
export default connectDB;

=======
module.exports = connectDB;
>>>>>>> 4416eeae627f0d7ec79cc34d7cf02495f2fdf674
