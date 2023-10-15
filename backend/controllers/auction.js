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
		const filter = {};
		filter.eventId = req.query.eventId;
		if (req.query.type) filter.type = req.query.type;

		const auctions = await Auction.find(filter);
		res.status(200).json(auctions);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addBid = async (req, res) => {
	try {
		const { auctionId, bid } = req.body;
		const auction = await Auction.findById(auctionId);
		const bidGiven = {
			member: {
				memberId: bid.member.memberId,
				firstName: bid.member.firstName,
				lastName: bid.member.lastName,
				email: bid.member.email,
			},
			amount: bid.amount,
		};

		if (!auction.bids) auction.bids = [bidGiven];

		const bidAlready = auction.bids.find(
			(b) => b.member.memberId == bidGiven.member.memberId
		);
		if (bidAlready) bidAlready.amount = bidGiven.amount;
		else auction.bids.push(bidGiven);

		auction.save();

		setTimeout(() => {
			res.status(200).json('bid');
		}, 1000);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getBids = async (req, res) => {
	try {
		const auction = await Auction.findById(req.query.auctionId);
		if (auction.bids) return res.status(200).json(auction.bids);

		res.status(200).json([]);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
