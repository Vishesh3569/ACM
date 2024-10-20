const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, searchProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');

// ROUTE FOR searching product
router.get('/search',searchProducts);

// Get all products
router.get('/', getProducts);

// POST /api/products - Add a new product (protected route)
router.post('/', protect, upload.single('image'),addProduct);

// GET /api/products/:id - Get a single product by ID
router.get('/:id', getProductById);



module.exports = router;