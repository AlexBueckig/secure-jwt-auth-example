import express from 'express';
import { AuthEndpoints } from './AuthEndpoints';

const router = express.Router();

const authEndpoints = new AuthEndpoints();

router.post('/register', authEndpoints.register);
router.post('/login', authEndpoints.login);
router.post('/logout', authEndpoints.logout);
router.post('/refresh-token', authEndpoints.refreshToken);

export default router;
