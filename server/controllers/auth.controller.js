import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/error.js";

const generateTokens = (userId) => {
    const access_token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: "1d" });
    const refresh_token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: "7d" });
    return { access_token, refresh_token };
};

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All values are required!!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = await User.create({ username, email, password: hashedPassword });
        if (!newUser) {
            throw new Error("Error while creating user");
        }

        const { access_token, refresh_token } = generateTokens(newUser._id);

        const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

        return res
            .cookie("access_token", access_token, cookieOptions)
            .cookie("refresh_token", refresh_token, cookieOptions)
            .status(200)
            .json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return next(errorHandler(401, "Wrong credentials"));
        }

        const { access_token, refresh_token } = generateTokens(user._id);

        const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

        return res
            .cookie("access_token", access_token, cookieOptions)
            .cookie("refresh_token", refresh_token, cookieOptions)
            .status(200)
            .json({ success: true, user: user.toObject(), access_token });
    } catch (error) {
        next(error);
    }
};

const signOut = async (_, res, next) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "User has been signed out" });
    } catch (error) {
        next(error);
    }
};

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const { access_token, refresh_token } = generateTokens(user._id);

            const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

            return res
                .cookie("access_token", access_token, cookieOptions)
                .cookie("refresh_token", refresh_token, cookieOptions)
                .status(200)
                .json({ success: true, user: user.toObject(), access_token });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8);

            const newUser = new User({
                username,
                email: req.body.email,
                password: hashedPassword,
                profile: req.body.profile
            });

            await newUser.save();

            const { access_token, refresh_token } = generateTokens(newUser._id);

            const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production" };

            return res
                .cookie("access_token", access_token, cookieOptions)
                .cookie("refresh_token", refresh_token, cookieOptions)
                .status(200)
                .json({ success: true, user: newUser.toObject(), access_token });
        }
    } catch (error) {
        next(error);
    }
};

export { signUp, signIn, signOut, google };
