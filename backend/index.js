import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import Stripe from 'stripe';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import productRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import auctionRoutes from './routes/auction.js';
import auctionRequestsRoutes from './routes/auctionRequest.js';
import eventRoutes from './routes/event.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);
app.use('/product', productRoutes);
app.use('/auction', auctionRoutes);
app.use('/auctionRequest', auctionRequestsRoutes);
app.use('/event', eventRoutes);

app.use(express.static('public'));

var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};
app.use(allowCrossDomain);

const stripe = new Stripe(process.env.STRIPE_KEY);

app.post('/checkout', async (req, res) => {
	const items = req.body.items;
	let lineItems = [];
	items.forEach((item) => {
		lineItems.push({
			price: item.id,
			quantity: item.quantity,
		});
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		// success_url: 'http://localhost:5001/success',
		// cancel_url: 'http://localhost:5001/cancel',
		success_url: `https://hussnain-admin.vercel.app/success`,
		cancel_url: `https://hussnain-admin.vercel.app/cancel`,
	});

	res.send(
		JSON.stringify({
			url: session.url,
		})
	);
});

const storeItems = new Map([
	[1, { priceInCents: 10000, name: 'In House Product' }],
	[2, { priceInCents: 20000, name: 'Vendor sale product' }],
]);
app.post('/create-checkout-session', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: req.body.items.map((item) => {
				const storeItem = storeItems.get(item.id);
				return {
					price_data: {
						currency: 'pkr',
						product_data: {
							name: storeItem.name,
						},
						unit_amount: storeItem.priceInCents,
					},
					quantity: item.quantity,
				};
			}),
			success_url: `http://127.0.0.1:5173/success`,
			cancel_url: `http://127.0.0.1:5173/cancel`,
		});
		res.json({ url: session.url });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e.message });
	}
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	})
	.catch((error) => console.log(`${error} did not connect`));
