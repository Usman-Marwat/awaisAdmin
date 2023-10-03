import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const memberSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		legalName: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		mobileNumber: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		idCardNo: {
			type: String,
			required: true,
		},
		idCardImages: [],
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

memberSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

memberSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) return user;
		throw Error('Incorrect Password');
	}
	throw Error('Incorrect Email');
};

const Member = mongoose.model('Member', memberSchema);

export default Member;
