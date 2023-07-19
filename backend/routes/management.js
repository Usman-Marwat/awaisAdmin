import express from 'express';

import {
	deleteAdmin,
	getAdmins,
	getUserPerformance,
} from '../controllers/management.js';

const router = express.Router();

router.get('/admins', getAdmins);
router.delete('/admins/:id', deleteAdmin);
router.get('/performance/:id', getUserPerformance);

export default router;
