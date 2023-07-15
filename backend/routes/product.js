import express from 'express';

import {
	addCategory,
	addProduct,
	deleteProduct,
	editProduct,
	getCategory,
} from '../controllers/product.js';

const router = express.Router();

router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.post('/edit', editProduct);
router.post('/category', addCategory);
router.get('/category', getCategory);

export default router;
