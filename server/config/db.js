// connect to the MongoDB server with  Mongoose
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database Connected Successfully!!");
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};
