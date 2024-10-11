import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("Error during authentication", error);
        return res.status(401).json({
            message: "Invalid token",
            success: false,
        });
    }
};

export default isAuthenticated;
