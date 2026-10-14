import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({
            succes: false,
            message: "invalid credential"
        })
    }
    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next()
    } catch (error) {
        res.status(401).json({
            succes: false,
            message: "invalid credential",
            error: error.message,
        })
    }
}