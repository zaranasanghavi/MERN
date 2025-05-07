import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import lostItemRoutes from "./routes/lostRoutes.js";
import foundItemRoutes from "./routes/foundRoutes.js"; 
import authRoutes from "./routes/auth.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import connectDB from "./config/db.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory
app.use(express.urlencoded({ extended: true })); // Allow form data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lost", lostItemRoutes);
app.use("/api/found", foundItemRoutes);
app.use("/api/notifications", notificationRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



//MONGO_URI=mongodb+srv://tithisolanki43:Kclz446mj5VqVaRB@cluster0.eknoxpw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
//JWT_SECRET=620c2cd58697035f6f54a7bc0350166cb8f9be2cd35a1ed19eb064bf88785123ba9a3f8aff9a0092dbc43739c5a73b0ce61a1b135d7505adec1b5da78b819b61