import mojoauth from 'mojoauth-sdk';

import Member from '../models/Member.js';

const config = {
	apiKey: 'test-f754a56f-889c-46f4-82df-2e5d2e815880',
};
const ma = mojoauth(config);
let query = {};
query.language = 'Your language';

export const signOtp = async (req, res, next) => {
	const { email } = req.body;
	const members = await Member.find({ email });

	if (members[0])
		return res
			.status(400)
			.send({ error: 'A user with the given email already exists.' });

	const emailOtpResponse = await ma.mojoAPI.signinWithEmailOTP(email, query);
	if (!emailOtpResponse.state_id)
		return res.status(400).send({ error: 'Otp was not signed to this email' });
	req.state_id = emailOtpResponse.state_id;
	next();
};

export const verifyOtp = async (req, res, next) => {
	const { state_id, otp } = req.body;

	const verifyEmail = await ma.mojoAPI.verifyEmailOTP(otp, state_id);
	if (!verifyEmail.authenticated)
		return res.status(400).send({ error: 'The otp you entered was wrong' });
	next();
};
