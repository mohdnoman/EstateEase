import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { Listing } from "../models/listing.model.js"

const updateUserInfo = async (req, res, next) => {
    try {
        // Ensure user can only update their own account
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own account."));
        }

        // Hash the password if provided
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update user information
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profile: req.body.profile
            }
        }, { new: true });

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"))
        }

        // Omit password from response
        const { password, ...userWithoutPassword } = updatedUser._doc;

        // Respond with updated user information
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        // Handle errors
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account."));
    }

    try {
        // Delete user from the database
        await User.findByIdAndDelete(req.params.id);

        // Clear cookies
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        // Send response
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        next(error);
    }
}

const getUserListings = async (req, res, next) => {

    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.user.id })

            res.status(200).json(listings)

        } catch (error) {
            next(errorHandler(400, error.message));
        }
    } else {
        next(errorHandler(400, `Error fetching listings: ${error.message}`));
    }
}

const getUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            return next(errorHandler(404, "user not found"));
        }

        const { password: pass, ...rest } = user._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export {
    updateUserInfo,
    deleteUser,
    getUserListings,
    getUser
};
