const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "securescan_jwt_secret_key_2026";

/**
 * Middleware to protect routes - verifies JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized - no token provided",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user to request (exclude password)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized - user not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized - invalid token",
        });
    }
};

module.exports = { protect };
