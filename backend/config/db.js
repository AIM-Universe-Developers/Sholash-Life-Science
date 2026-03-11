const mongoose = require("mongoose");

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
>>>>>>> 943b4de0f677c4f5f8037496dd60afdc9ce80b6e
