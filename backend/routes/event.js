import express from 'express';
import { addEvent, getEvents, getEvent } from '../controllers/event.js';

const router = express.Router();

router.route('/').get(getEvents).post(addEvent);
router.route('/:eventId').get(getEvent);

export default router;
