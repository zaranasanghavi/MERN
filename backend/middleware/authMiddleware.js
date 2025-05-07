import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";


const authMiddleware = async (req, res, next) => {
    try {
        console.log("🛠️ Middleware triggered"); 

        const authHeader = req.header("Authorization");
        console.log("🔑 Received Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No or invalid token in header");
            return res.status(401).json({ msg: "Access Denied: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("🛡️ Extracted Token:", token);

        if (!process.env.JWT_SECRET) {
            console.error("🚨 JWT_SECRET is missing in environment variables!");
            return res.status(500).json({ msg: "Server Configuration Error" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Decoded:", decoded);

        req.user = decoded;

        // Fetch user from DB
        const user = await User.findById(req.user.userId).select("-password");
        console.log("🔍 Fetched User from the DB successfully!");
        if (!user) {
            console.log("❌ User not found in DB");
            return res.status(404).json({ msg: "User not found" });
        }

        console.log("🔥 Authenticated User:", user);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);
        res.status(401).json({ msg: "Access Denied: Invalid token" });
    }
};

export default authMiddleware;
