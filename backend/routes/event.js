import express from 'express';
import { addEvent, getEvents } from '../controllers/event.js';

const router = express.Router();

router.route('/').get(getEvents).post(addEvent);

export default router;
