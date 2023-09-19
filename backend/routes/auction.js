import express from 'express';

import {
	addAuction,
	getAuctions,
	addBid,
	getBids,
} from '../controllers/auction.js';

const router = express.Router();

router.post('/', addAuction);
router.get('/', getAuctions);
router.post('/bid', addBid);
router.get('/bid', getBids);

export default router;
