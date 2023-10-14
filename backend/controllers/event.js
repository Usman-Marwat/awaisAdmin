import Event from '../models/Event.js';

export const addEvent = async (req, res) => {
	try {
		const event = await Event.create({ ...req.body });
		res.status(200).json(event);
		// res.status(200).json('event');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getEvents = async (req, res) => {
	try {
		const events = await Event.find({});
		res.status(200).json(events);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId);
		res.status(200).json(event);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
