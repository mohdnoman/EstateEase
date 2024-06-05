import express from "express"
import { updateUserInfo, deleteUser, getUserListings, getUser } from "../controllers/user.controller.js"
import { VerifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id",VerifyUser, updateUserInfo)
router.delete("/delete/:id",VerifyUser, deleteUser)
router.get("/listings/:id", VerifyUser, getUserListings)
router.get("/:id", VerifyUser, getUser)
export default router