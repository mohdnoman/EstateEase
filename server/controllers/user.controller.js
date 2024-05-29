import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

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

export {
    updateUserInfo
};
