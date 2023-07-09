import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
	try {
		const product = await Product.create({ ...req.body, rating: 3.7 });
		res.status(200).json('Success');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.send('deleted');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
