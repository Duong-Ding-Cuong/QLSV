const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Không có token, từ chối truy cập!" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        if (!decoded || !decoded.id) {
            return res.status(400).json({ success: false, message: "Token không hợp lệ!" });
        }
        req.student = decoded;
        console.log("req.student:", req.student);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Token không hợp lệ!" });
    }
};


module.exports = verifyToken;
