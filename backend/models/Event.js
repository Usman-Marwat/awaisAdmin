import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
	{
		eventTitle: String,
		dateOfEvent: Object,
		description: String,
		venue: String,
		startTime: Object,
		images: [],
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);

export default Event;
