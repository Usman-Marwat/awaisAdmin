import express from 'express';

import {
	addCategory,
	addProduct,
	deleteCategory,
	deleteProduct,
	editCategory,
	editProduct,
	getCategory,
} from '../controllers/product.js';

const router = express.Router();

router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.post('/edit', editProduct);
router.post('/category', addCategory);
router.get('/category', getCategory);
router.delete('/category/:id', deleteCategory);
router.post('/category/edit', editCategory);

export default router;
