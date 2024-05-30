import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { VerifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", VerifyUser, createListing)

export default router