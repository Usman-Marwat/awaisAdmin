// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

import Member from '../models/Member.js';

const handleMongooseErrors = (err) => {
	let errors = { email: '', password: '' };

	if (err.message === 'Incorrect Email')
		errors.email = 'That email is not registered';
	if (err.message === 'Incorrect Actor')
		errors.email = 'That Email is not registered with that actor';
	if (err.message === 'Incorrect Password')
		errors.password = 'That password is incorrect';

	if (err.code === 11000) {
		errors.email = 'That email is already registered';
		return errors;
	}
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

export const signUp = async (req, res) => {
	try {
		const member = await Member.create(req.body);
		res.status(201).send(member);
	} catch (err) {
		console.log(err);
		const errors = handleMongooseErrors(err);
		console.log(errors);
		res.status(400).send({ error: 'User was not created' });
	}
};

export const signIn = async (req, res) => {
	const { email, password, actor } = req.body;
	try {
		const user = await User.login(actor, email, password);
		let actordb = null;
		const filter = { user_id: user.id };
		if (actor === 'Contractor') actordb = await Contractor.find(filter);
		else if (actor === 'Customer') actordb = await Customer.find(filter);
		else if (actor === 'Employee') actordb = await Employee.find(filter);
		else if (actor === 'Supplier') actordb = await Supplier.find(filter);

		const token = jwt.sign(
			{
				actor_id: actordb[0].id,
				user_id: user.id,
				actor: user.actor,
				name: actordb[0].name,
				email: user.email,
				phone: user.phone,
				image: actordb[0].image,
			},
			'jwtPrivateKey'
		);

		res.status(201).send(token);
	} catch (err) {
		const errors = handleMongooseErrors(err);
		console.log(errors);
		res.status(400).send(errors);
	}
};

export const refreshToken = async (req, res) => {
	const user = await mongoose.model('user').findById(req.params.id);
	const [actordb] = await mongoose
		.model(req.params.actor)
		.find({ user_id: user._id });

	const token = jwt.sign(
		{
			actor_id: actordb.id,
			image: actordb.image,
			name: actordb.name,
			user_id: user.id,
			actor: user.actor,
			email: user.email,
			phone: user.phone,
			expoPushToken: user.expoPushToken,
		},
		'jwtPrivateKey'
	);
	res.status(201).send(token);
};

export const generateOtp = async (req, res) => {
	res.status(201).send({ state_id: req.state_id });
};

// router.get('/profile/:id', async (req, res) => {
// 	const user = await User.find({ user_id: req.params.id });
// 	console.log(user);
// 	res.send('Ok');
// });

// router.put('/profile/:id', async (req, res) => {
// 	const { actor, name, email, phone, image } = req.body;

// 	const user = await mongoose.model('user').findById(req.params.id);
// 	const [actordb] = await mongoose.model(actor).find({ user_id: user._id });

// 	user.email = email;
// 	user.phone = phone;
// 	user.save();

// 	actordb.name = name;
// 	// actordb.image = image;
// 	actordb.save();

// 	res.send('Ok');
// });
