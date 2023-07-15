import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		name: String,
		description: String,
	},
	{ timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
