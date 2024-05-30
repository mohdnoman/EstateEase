import express from "express"
import { updateUserInfo, deleteUser } from "../controllers/user.controller.js"
import { VerifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id",VerifyUser, updateUserInfo)
router.delete("/delete/:id",VerifyUser, deleteUser)


export default router