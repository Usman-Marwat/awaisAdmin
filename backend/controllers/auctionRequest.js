import AuctionRequest from '../models/AuctionRequest.js';

export const addAuctionRequest = async (req, res) => {
	try {
		const auction = await AuctionRequest.create({ ...req.body });
		res.status(200).json(auction);
		// res.status(200).json('auction');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getAuctionsRequest = async (req, res) => {
	try {
		const auctions = await AuctionRequest.find({});
		res.status(200).json(auctions);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
