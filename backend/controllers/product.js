import Category from '../models/Category.js';
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

export const editProduct = async (req, res) => {
	try {
		const { id, name, price, description, category, supply } = req.body;
		const product = await Product.findById(id);
		product.name = name;
		product.price = price;
		product.description = description;
		product.category = category;
		product.supply = supply;
		product.save();
		res.status(200).json('Success');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const addCategory = async (req, res) => {
	try {
		const category = await Category.create({ ...req.body });
		console.log('sucess');
		res.status(200).json('Success');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getCategory = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.status(200).json(categories);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		res.status(200).json('Success');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const editCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await Category.findById(req.body._id);
		category.name = name;
		category.save();
		res.status(200).json('Success');
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
