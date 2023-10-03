import express from 'express';

import {
	addAuction,
	getAuctions,
	addBid,
	getBids,
} from '../controllers/auction.js';

const router = express.Router();

router.route('/').get(getAuctions).post(addAuction);
router.route('/bid').get(getBids).post(addBid);

// router.post('/', addAuction);
// router.get('/', getAuctions);
// router.post('/bid', addBid);
// router.get('/bid', getBids);

export default router;

/*
fs.promises contains a subset of the interface for what's on fs, 
but with promise-based interfaces instead of plain callback-style interfaces.
Some things which don't translate well to promises or don't have a natural 
promise-based interface such as fs.createReadStream() are only available on fs.
Note that fs.createReadStream() returns a stream and uses events on the stream, 
not plain callbacks (which don't translate well to promises).
As such, it's interface remains the same on fs and is not duplicated on fs.promises.
*/
