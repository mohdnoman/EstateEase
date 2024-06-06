import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { VerifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", VerifyUser, createListing)
router.delete("/delete/:id", VerifyUser, deleteListing);
router.post("/update/:id", VerifyUser, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router