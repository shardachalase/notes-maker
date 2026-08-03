import user from "../models/users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_secret || 'secret', { expiresIn: '10d' });
}

export const registerUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userexist = await user.findOne({ email });
        if (userexist) {
            return res.status(400).json({ message: "user already present" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const users = await user.create({
            name,
            email,
            password: hashedPassword
        });
        if (users) {
            return res.status(201).json({
                id: users.id,
                name: users.name,
                email: users.email,
                token: generateToken(users.id)
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isMatch = await user.findOne({ email });
        if (!isMatch) {
            return res.status(400).json({ message: "invalid email Address" });
        }
        const passmatch = await bcrypt.compare(password, isMatch.password);
        if (!passmatch) {
            return res.status(400).json({ message: "invalid password" });
        }
        return res.status(200).json({
            id: isMatch.id,
            name: isMatch.name,
            email: isMatch.email,
            token: generateToken(isMatch.id)
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
