import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils.js';

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ success: false, message: `User with username ${username} already exists` });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: newUser._id, username: newUser.username }, // Exclude the hashed password from the response
        });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
};

const login = async (req,res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = await generateToken(username,user._id);
        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export {signup,login};