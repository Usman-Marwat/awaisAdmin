import express from 'express';

import {
	addAuctionRequest,
	getAuctionsRequest,
} from '../controllers/auctionRequest.js';

const router = express.Router();

router.route('/').get(getAuctionsRequest).post(addAuctionRequest);

export default router;
