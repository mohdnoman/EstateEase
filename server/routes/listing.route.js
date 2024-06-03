import express from 'express';
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js';
import { VerifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", VerifyUser, createListing)
router.delete("/delete/:id", VerifyUser, deleteListing);
router.post("/update/:id", VerifyUser, updateListing);

export default router