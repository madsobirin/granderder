import jwt from "jsonwebtoken";

const SECRET_KEY = "ADMIN_SECRET_KEY";

export function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1d",
    });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}