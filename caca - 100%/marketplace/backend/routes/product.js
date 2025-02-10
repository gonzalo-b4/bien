const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post('/', [auth, upload.array('images', 10)], createProduct);

module.exports = router;
