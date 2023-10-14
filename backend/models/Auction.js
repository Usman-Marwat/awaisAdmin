import mongoose from 'mongoose';

const AuctionSchema = new mongoose.Schema(
	{
		eventId: { type: mongoose.Types.ObjectId, ref: 'Event' },
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
		bids: {
			type: [
				{
					member: {
						memberId: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'Member',
							required: true,
						},
						firstName: { type: String, required: true },
						lastName: { type: String, required: true },
						email: { type: String, required: true },
					},
					amount: { type: String, required: true },
				},
			],
			default: undefined,
		},
	},
	{ timestamps: true }
);

const Auction = mongoose.model('Auction', AuctionSchema);

export default Auction;
