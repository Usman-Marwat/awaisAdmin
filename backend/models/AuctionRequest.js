import mongoose from 'mongoose';

const AuctionRequestSchema = new mongoose.Schema(
	{
		type: String,
		auctioneer: String,
		breed: String,
		color: String,
		sex: String,
		sire: String,
		dam: String,
		dateOfBirth: Object,
		description: String,
		dateOfAuction: Object,
		location: String,
		venue: String,
		startTime: Object,
		images: [],
		endTime: Object,
	},
	{ timestamps: true }
);

const AuctionRequest = mongoose.model('AuctionRequest', AuctionRequestSchema);

export default AuctionRequest;
