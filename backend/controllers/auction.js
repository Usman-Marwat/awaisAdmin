import Auction from '../models/Auction.js';

export const addAuction = async (req, res) => {
	try {
		const auction = await Auction.create({ ...req.body });
		res.status(200).json(auction);
		// res.status(200).json('auction');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getAuctions = async (req, res) => {
	try {
		const auctions = await Auction.find({});
		res.status(200).json(auctions);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
