import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if all values are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All values are required!!!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create the user
        const newUser = await User.create({ username, email, password: hashedPassword });

        if (!newUser) {
            return res.status(500).json({ message: "Error while creating user!!!" });
        }

        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export {
    signUp
};
