import jwt from "jsonwebtoken";
import Users from "../models/UserModels.js";

export const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            req.user = null; // User not authenticated
            return next();   // Allow guest access
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await Users.findOne({
            where: {
                user_id: decoded.user_id
            }
        });

        if (!user) {
            req.user = null; // User not found
            return next();   // Allow guest access
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        req.user = null; // Error in token validation
        next();         // Allow guest access
    }
};

// Middleware untuk memeriksa peran admin
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Akses terlarang, hanya admin yang bisa mengakses.' });
    }
    next();
};

// Middleware untuk memeriksa peran author
export const isAuthor = (req, res, next) => {
    if (!req.user || req.user.role !== 'author') {
        return res.status(403).json({ msg: 'Akses terlarang, hanya author yang bisa mengakses.' });
    }
    next();
};

// Middleware untuk memeriksa peran user
export const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'user') {
        return res.status(403).json({ msg: 'Akses terlarang, hanya user yang bisa mengakses.' });
    }
    next();
};
