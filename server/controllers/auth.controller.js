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


        const { password: pass, ...userWithoutPassword } = validUser._doc


        res.cookie("access_token", access_token, cookieOptions).cookie("refresh_token", refresh_token, cookieOptions).status(200).json({
            success: true,
            user: userWithoutPassword,
            access_token: access_token
        });
    } catch (error) {
        next(error);
    }
};

const google = async (req, res, next) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            // If user exists, generate tokens and respond
            const access_token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
                expiresIn: "1d"
            });

            const refresh_token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
                expiresIn: "7d"
            });

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            };

            const { password, ...userWithoutPassword } = user._doc;

            res.cookie("access_token", access_token, cookieOptions)
                .cookie("refresh_token", refresh_token, cookieOptions)
                .status(200)
                .json({
                    success: true,
                    user: userWithoutPassword,
                    access_token: access_token
                });
        } else {
            // If user doesn't exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10); // Await bcrypt.hash
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8);

            // Create a new user instance
            const newUser = new User({
                username: username,
                email: req.body.email,
                password: hashedPassword,
                profile: req.body.profile
            });

            // Save the new user to the database
            await newUser.save();

            // Generate tokens and respond
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



            res.cookie("access_token", access_token, cookieOptions)
                .cookie("refresh_token", refresh_token, cookieOptions)
                .status(200)
                .json({
                    success: true,
                    user: newUser,
                    access_token: access_token
                });
        }
    } catch (error) {
        next(error);
    }
}


export {
    signUp,
    signIn,
    google
};
