import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

const signUp = async (req, res, next) => {
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

        // generate access and refresh token
        const access_token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });

        const refresh_token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        return res.cookie("access_token", access_token, cookieOptions).cookie("refresh_token", refresh_token, cookieOptions).status(200).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const validUser = await User.findOne({ username });

        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = await bcrypt.compare(password, validUser?.password);


        if (!validPassword) {
            return next(errorHandler(401, "Wrong credentials"));
        }

        const access_token = jwt.sign({ id: validUser._id }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });

        const refresh_token = jwt.sign({ id: validUser._id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };


        const { password: pass, userWithoutPassword } = validUser


        res.cookie("access_token", access_token, cookieOptions).cookie("refresh_token", refresh_token, cookieOptions).status(200).json({
            success: true,
            user: userWithoutPassword,
            access_token: access_token
        });
    } catch (error) {
        next(error);
    }
};


export {
    signUp,
    signIn
};
