import mongoose from 'mongoose';

const AuctionSchema = new mongoose.Schema(
	{
		type: String,
		horseTitle: String,
		reservedPrice: String,
		breed: String,
		color: String,
		sex: String,
		sire: String,
		dam: String,
		dateOfBirth: Object,
		description: String,
		dateOfAuction: Object,
		venue: String,
		startTime: Object,
		images: [],
		endTime: Object,
	},
	{ timestamps: true }
);

const Auction = mongoose.model('Auction', AuctionSchema);

export default Auction;
