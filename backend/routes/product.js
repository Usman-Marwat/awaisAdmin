import express from 'express';

import {
	addCategory,
	addProduct,
	deleteProduct,
	editProduct,
} from '../controllers/product.js';

const router = express.Router();

router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.post('/edit', editProduct);
router.post('/category', addCategory);

export default router;
