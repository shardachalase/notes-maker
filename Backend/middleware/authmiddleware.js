import jwt from 'jsonwebtoken';
import user from '../models/users.js';

const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: "unauthorised" });
        }
        const decode = jwt.verify(token, process.env.JWT_secret || 'secret');
        req.user = await user.findOne({ _id: decode.id }).select('-password');
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "unauthorised" });
    }
}
export default authMiddleware;