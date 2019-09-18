import dotenv from 'dotenv';
import express from 'express';
import exjwt from 'express-jwt';
import { ProfileEndpoints } from './ProfileEndpoints';

dotenv.config();

const profileEndpoints = new ProfileEndpoints();

const router = express.Router();

const jwtMW = exjwt({
  secret: process.env.JWT_SECRET!
});

router.get('/', jwtMW, profileEndpoints.getProfile);

export default router;
