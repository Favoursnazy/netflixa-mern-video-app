// Note: open the credentials.js file
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/users.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import uploadRouter from "./controllers/UploadFile.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//connect DB
connectDB();

//Main route
app.get("/", (req, res) => {
  res.send("NetFlixa Api is Running!!!");
});

//Other Routes
app.use("/api/user", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/upload", uploadRouter);

//eror handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
