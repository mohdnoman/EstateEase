import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { VerifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", VerifyUser, createListing)
router.delete("/delete/:id", VerifyUser, deleteListing);

export default router