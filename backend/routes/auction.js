import express from 'express';

import { addAuction, getAuctions, addBid } from '../controllers/auction.js';

const router = express.Router();

router.post('/', addAuction);
router.get('/', getAuctions);
router.post('/bid', addBid);

export default router;
