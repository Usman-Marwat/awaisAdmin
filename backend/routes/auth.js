import express from 'express';

import { generateOtp, signUp, signIn } from '../controllers/auth.js';
import { signOtp, verifyOtp } from '../middleware/mojoauth.js';

const router = express.Router();

router.post('/generateOtp', [signOtp], generateOtp);
router.post('/signup', [verifyOtp], signUp);
router.get('/signin', signIn);
// router.post('/logout', logout);

export default router;
